from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Todos(db.Model):
    __tablename__ = "todos"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    tareas = db.relationship("Tarea", backref="tareas", cascade="delete")   

    def serialize(self):
        tareas = []
        tareas = list(map(lambda tarea: tarea.serialize(), self.tareas))
        return{
            "id": self.id,
            "name": self.name,
            "tareas": tareas
        }

class Tarea(db.Model):
    __tablename__ = 'tareas'
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(100), nullable=False)
    done = db.Column(db.Boolean, default=False)
    todos_id = db.Column(db.Integer, db.ForeignKey("todos.id"))               
    def serialize(self):
        return {
            "id": self.id,
            "task": self.task,
            "done":self.done

        }


"""
class Tramite(db.Model):
    __tablename__ = 'tramites'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    infointro = db.Column(db.String(1000), nullable=False)
    infocorps = db.Column(db.String(1000), nullable=False)
    infofoot = db.Column(db.String(1000), nullable=False)
    tareas = db.relationship("Tarea", backref="tareas", cascade="delete")       #    
    def serialize(self):
        tareas = []
        tareas = list(map(lambda tarea: tarea.serialize(), self.tareas))
        return {
            "id": self.id,
            "titulo": self.titulo,
            "infointro": self.infointro,
            "infocorps": self.infocorps,
            "infofoot": self.infofoot,
            "tareas": tareas
        }

class Tarea(db.Model):
    __tablename__ = 'tareas'
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(100), nullable=False)
    tramite_id = db.Column(db.Integer, db.ForeignKey("tramites.id"))            #    
    def serialize(self):
        return {
            "id": self.id,
            "task": self.task
        }
"""