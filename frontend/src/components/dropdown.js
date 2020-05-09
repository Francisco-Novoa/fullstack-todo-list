import React, { useContext } from "react"
import { apiContext } from "../store/app.Context"

export default function Dropdown() {
    const { store, actions } = useContext(apiContext)

    return (
        <div class="btn-group" role="group" aria-label="Basic example">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
             </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                        !!store.nombres ?
                            store.nombres.map((nombre, i) => {
                                return (
                                    <button className="dropdown-item" key={i}
                                        onClick={() => { actions.getCurrent("http://localhost:5000/api/todos/", nombre) }}
                                    >
                                        {nombre}
                                    </button>
                                )
                            }
                            ) : "cargando!"
                    }
                </div>
            </div>
            <button type="button" class="btn btn-secondary"
                onClick={() => { actions.saveTodos("http://localhost:5000/api/todos/", store.current.name, store.current.tareas) }}>
                Save</button>
            <button type="button" class="btn btn-secondary"
                onClick={() => { actions.deleteTodos("http://localhost:5000/api/todos/", store.current.name, store.nombres) }}>
                Delete</button>
            <div className="form-group">
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="add name of list"
                onChange={(e)=>{actions.handleInputNombre(e.target.value)}} />
            </div>
            <button type="button" class="btn btn-secondary"
                onClick={() => { actions.newList("http://localhost:5000/api/todos/", store.inputNombre,store.nombres) }}>
                New List</button>
        </div>

    )
}