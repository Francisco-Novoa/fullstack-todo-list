import React, { useContext } from "react"
import { apiContext } from "../store/app.Context"
import ToDoElement from "./todoelement"


export default function TodoList() {
  const { store, actions } = useContext(apiContext)
  return (
    <>
      {!!store.current ?
        store.current.name !== "" ?
          <div>
            <h3>Lista de tareas: {store.current.name}</h3>
            <div class="btn-group" role="group" aria-label="Basic example">
              <div className="form-group">
                <input type="text" className="form-control" id="newTask" placeholder="add New Tasks"
                  onChange={(e) => { actions.handleInputNewTask(e.target.value) }} />
              </div>
              <button type="button" class="btn btn-secondary"
                onClick={() => { actions.handleNewTask( store.inputNewTask,store.current) }}>
                  Commit new task
                </button>
            </div>
          </div>

          : ""
        : ""
      }
      {!!store.current ?
        store.current.tareas !== "" ?
          store.current.tareas.map((tarea, i) => {
            return (
              <ToDoElement todo={tarea} key={i} pos={i} />
            )
          })
          : <h1>There are no Todos!</h1>
        : <h1>Choose which To Do List to display</h1>
      }
    </>
  )
}