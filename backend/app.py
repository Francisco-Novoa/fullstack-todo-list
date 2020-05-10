import json
import os
# imports of flask libraries used here

from flask import Flask, request, jsonify, render_template
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# imports of the sql tables
from models import db
from models import Todos, Tarea

# app inits and coginfs
app = Flask(__name__)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.url_map.strict_slashes = False
app.config["DEBUG"] = True
app.config["ENV"] = "development"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] =  'sqlite:///' + os.path.join(BASE_DIR, 'db.db')

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
        if input1 is not None:
            todos = Todos.query.filter_by(name=input1).first()
            if todos:
                return jsonify(todos.serialize()), 200
            else:
                return jsonify({"msg": "Not Found"}), 404
        else:
            todos = Todos.query.all()
            todos = list(map(lambda todos: todos.serialize(), todos))
            return jsonify(todos), 200

    if request.method == "POST":
        if not input1 or input1 == "":  # si no llego un nombre o el nombre esta vacio
            return {"msg": "Field name is required"}, 400  # 422
        todo = Todos()
        todo.name=input1
        db.session.add(todo)
        db.session.commit()
        todos = Todos.query.all()
        todos = list(map(lambda todos: todos.serialize(), todos))
        return jsonify(todos), 200

    if request.method=="PUT":
        if not input1 or input1 == "":  # si no llego un nombre o el nombre esta vacio
            return {"msg": "Field name is required"}, 400  # 422
        todos = Todos.query.filter_by(name=input1).first()
        newName=request.json.get("newName")
        if not newName or newName == "":
            return {"msg":"newName missing"}, 400
        todo.name=newName
        db.session.commit()
        return jsonify(todo.serialize()), 200  # 422

    if request.method == "DELETE":
        if not input1 or input1 == "":  # si no llego un nombre o el nombre esta vacio
            return {"msg": "Field name is required"}, 400  # 422
        todos = Todos.query.filter_by(name=input1).first()
        if not todos:
            return {"msg": "Not Found"}, 400
        db.session.delete(todos)
        db.session.commit()
        todos = Todos.query.all()
        todos = list(map(lambda todos: todos.serialize(), todos))
        return jsonify(todos), 200

@app.route("/api/todos/names", methods=["GET"])
def namegiver():
    users = Todos.query.all()
    users = list(map(lambda user: user.name, users))
    return jsonify(users), 200

@app.route("/api/todos/newtask/<int:id>", methods=["POST"])
def newtask(id=None):
    todo = Todos.query.filter_by(id=id).first()
    if not todo:
        return {"msg":"there is no todo with that name"}, 404
    task=request.json.get("task")
    if not task or task == "":
        return {"msg":"task missing"}, 400
    tarea = Tarea()
    tarea.task=task
    tarea.todos_id=todo.id
    db.session.add(tarea)
    db.session.commit()
    return jsonify(todo.serialize()), 200 

@app.route("/api/todos/deletetask/<int:id>", methods=["DELETE"])
def deletetask(id=None):
    tarea = Tarea.query.filter_by(id=id).first()
    todo = Todos.query.filter_by(id=tarea.todos_id).first()
    db.session.delete(tarea)
    db.session.commit()
    return jsonify(todo.serialize()), 200 

@app.route("/api/todos/edittask/<int:id>", methods=["PUT"])
def edittask(id=None):
    tarea = Tarea.query.filter_by(id=id).first()
    todo = Todos.query.filter_by(id=tarea.todos_id).first()
    task=request.json.get("task")
    if not task or task == "":
        return {"msg":"task missing"}, 400
    tarea.task=task
    db.session.commit()
    return jsonify(todo.serialize()), 200 

@app.route("/api/todos/completetask/<int:id>", methods=["PUT"])
def completetask(id=None):
    tarea = Tarea.query.filter_by(id=id).first()
    todo = Todos.query.filter_by(id=tarea.todos_id).first()
    tarea.done=not tarea.done
    db.session.commit()
    return jsonify(todo.serialize()), 200 

if __name__ == "__main__":
    manager.run()
