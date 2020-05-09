import json
# imports of flask libraries used here

from flask import Flask, request, jsonify, render_template
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# imports of the sql tables
from models import db
from models import Todos

# app inits and coginfs
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["DEBUG"] = True
app.config["ENV"] = "development"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:occam463871@localhost/mytodoapi"

db.init_app(app)
Migrate(app, db)
bcrypt = Bcrypt(app)
manager = Manager(app)
manager.add_command("db", MigrateCommand)

CORS(app)

# begining of routes
@app.route("/")
def main():
    return render_template("index.html")

@app.route("/api/todos")
@app.route("/api/todos/<input1>", methods=["GET", "POST", "PUT", "DELETE"])
def handler(input1=None):
    if request.method == "GET":
        # if the api received a name, get the column with the name.
        if input1 is not None:
            todos = Todos.query.filter_by(name=input1).first()
            if todos:
                return jsonify(todos.serialize()), 200
            else:
                return jsonify({"msg": "Not Found"}), 404
        else:
            # else the api did not get a name, get all columns
            todos = Todos.query.all()
            # create the array contacts, containing an array of the serialization of all the elements in the table Todos
            # using the function lambda and the map method
            todos = list(map(lambda todos: todos.serialize(), todos))
            # jsonify it and returns it to the request
            return jsonify(todos), 200

    if request.method == "POST":

        if not input1 or input1 == "":  # si no llego un nombre o el nombre esta vacio
            return {"msg": "Field name is required"}, 400  # 422
        # todo =  object Todos,
        todo = Todos()
        todo.name = input1
        todo.tareas = ""
        db.session.add(todo)
        db.session.commit()
        return {"result": "ok"}, 200  # 422

    if request.method == "PUT":
        # revisa la request y captura el elemento name, idem para phone
        tareas = request.json

        if not tareas or tareas == "":  # si no llego una tarea o las tareas estan vacias
            return {"msg": "Field tareas is required"}, 400  # 422

        todos = Todos.query.filter_by(name=input1).first()

        if not todos:
            return {"msg": "user not found"}, 404
        
        jsonify(tareas)
        print(tareas)
        todos.tareas = json.dumps(tareas)
        db.session.commit()

        # CREATED
        return {"result": "A list with " + str(len(tareas))+" todos was succesfully saved"}, 200

    if request.method == "DELETE":

        todos = Todos.query.filter_by(name=input1).first()

        if not todos:
            return {"msg": "Not Found"}, 400

        db.session.delete(todos)
        db.session.commit()
        return {"msg": "ok"}, 200

@app.route("/api/todos/names", methods=["GET"])
def namegiver():
    users = Todos.query.all()
    users = list(map(lambda user: user.name, users))
    return jsonify(users), 200

if __name__ == "__main__":
    manager.run()
