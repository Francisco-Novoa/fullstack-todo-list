import React, { useState, useRef, useEffect, useContext } from 'react';
import './App.css';
import Row from './row';
import injectContext, { apiContext } from "./store/app.Context"
import Dropdown_element from './dropdown_element';

function App() {
  const { store, actions } = useContext(apiContext)
  const input = useRef(null)
  const input2 = useRef(null)
  const [focus, loadFocus] = useState(null)
  const [text, setText] = useState({ name: "", tarea: "" })
  const [nuevaLista, setNuevaLista] = useState(false)
  const [alert, setAlert] = useState(null)

  const handleNewTask = () => {
    actions.POSTNEWTASK("http://localhost:5000/api/todos/newtask/" + store.currentList.id, { "task": text.name })
    setText({ ...text, name: "" })
    input.current.focus()
  }
  const handleNewList = () => {
    if (!store.name.includes(text.tarea)) {
      actions.POST("http://localhost:5000/api/todos/" + text.tarea, text.tarea)
      setText({ ...text, tarea: "" })
      setNuevaLista(false)
      setAlert(null)
    }
    else {
      setText({ ...text, tarea: "" })
      setAlert(false)
    }
  }
  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value })
  }
  const handleCancelar = () => {
    setNuevaLista(false)
    setText({ ...text, tarea: "" })
    setAlert(null)
  }
  const handleDeleteTarea = () => {
    actions.DELETE("http://localhost:5000/api/todos/" + store.current)
  }

  useEffect(() => {
    if (store.current !== null) {
      actions.GETCURRLIST("http://localhost:5000/api/todos/" + store.current)
    }
  }, [store.current])
  useEffect(() => {
    if (focus !== null) { input.current.focus() }
  }, [focus])
  useEffect(() => {
    if (input2.current !== null) {
      input2.current.focus()
    }
  }, [nuevaLista])

  return (
    <div className="wrapper container-fluid">
      <div className="row d-flex justify-content-center" > {/* Titulo */}
        <div className="col-4 "><h1 className="text-primary bolder underscore" >Listas de Tareas</h1> </div>
      </div>
      <div className="row mb-2" style={{ height: "50px" }}> {/* Alertas y Mensajes */}
        <div className="col-4">
          {!!store.name &&
            store.name.length > 0 ?
            "Hay " + store.name.length + " listas de tareas almacenadas, selecciona una!"
            :
            "No hay listas de tareas almacenadas, Haz una!"
          }
        </div>
        <div className="col-4">
          {
            alert === false ?
              <div class="alert alert-danger" role="alert">
                Ese nombre ya existe, elige otro.
                  </div>
              : alert === true ?
                <div class="alert alert-info" role="alert">
                  Añade aca el nombre de la lista
                </div>
                : ""
          }
        </div>
      </div>
      <div className="row d-flex justify-content-center mb-2"> {/*Dropdown y Botones */}
        <div className="col-4">
          <div class="dropdown">
            <button class="btn btn-primary btn-block " type="button" id="dropdownMenuButton" data-toggle="dropdown">
              Listas <i className="fas fa-arrow-down"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {
                !!store.name &&
                store.name.map((elem, i) => {
                  return (
                    <Dropdown_element elem={elem} key={i} loadFocus={loadFocus} focus={focus} />
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="col-4">
          {!nuevaLista ?
            <button className="btn btn-block btn-primary" onClick={() => { setNuevaLista(!nuevaLista); setAlert(true) }}>
              <span>Nueva Lista </span>
            </button>
            :
            <>
              <div className="row">
                <div className="col-9 ml-0">
                  <input
                    className="form-control"
                    ref={input2}
                    value={text.tarea}
                    name="tarea"
                    onChange={(e) => { handleChange(e) }}
                    onKeyUp={(e) => { if (e.key == "Enter") { handleNewList() } }}
                    placeholder="¡¡Añade una nueva Lista!!"
                    type="text" />
                </div>
                <div className=" col-3 btn-group" role="toolbar">
                  <i className="fas fa-check btn btn-outline-success" onClick={() => { handleNewList() }} ></i>
                  <i className="fas fa-minus-circle btn btn-outline-warning" onClick={() => { handleCancelar() }}></i>
                </div>
              </div>
            </>
          }
        </div>
        <div className="col-4">
          {store.currentList !== null?
            <button className="btn btn-block btn-danger" data-toggle="modal" data-target="#borrarTareas">
            <span>Borrar Lista Actual </span>
          </button>
          :
          <button className="btn btn-block btn-danger disabled">
            <span>Borrar Lista Actual </span>
          </button>
          }
        </div>
      </div>
      <div className="row "> {/* Titulo de la Lista */}
        <div className="col d-flex justify-content-center" style={{height: "60px"}}>
          {
            store.current != null ?
              <h1 className="text-primary bolder"> Lista de Tareas: {store.current}</h1>
              :
              ""
          }
        </div>
      </div>
      <div className="row d-flex justify-content-center mb-2"> {/* Input de Tareas*/}
        <div className="col-8">
          <input
            className="form-control"
            ref={input}
            value={text.name}
            name="name"
            onChange={(e) => { handleChange(e) }}
            onKeyUp={(e) => { if (e.key == "Enter") { handleNewTask() } }}
            placeholder={store.currentList !== null ? "¡¡Añade una nueva Tarea!!" : "¡¡Crea una Lista de Tareas!!"}
            type="text" />
        </div>
        <div className="col-4">
          {
            store.currentList !== null ?
              <button
                className="btn btn-block btn-primary"
                onClick={() => { handleNewTask() }}
              >Nueva Tarea
              </button>
              :
              <button
                className="btn btn-block btn-primary disabled"
              > ¡Necesitas una Lista de Tareas!
              </button>
          }
        </div>
      </div>
      <div className="row d-flex justify-content-center px-5">{/* Lista de Tareas */}
        <div className="col">
          <ul className="list-group">
            {

              store.currentList !== undefined && store.currentList !== null ?
                store.currentList.tareas.map((tarea, i) => {
                  return (
                    <Row task={tarea.task} done={tarea.done} id={tarea.id} key={tarea.id} />
                  )
                })
                :
                ""
            }

          </ul>
        </div>
      </div>
      <div className="row d-flex justify-content-center"> {/* Pequeña Guia */}
        <div className="alert alert-light" role="alert">
          <p>Los imputs detectan "Enter" para enviar automaticamente. </p>
          <p>Cada cambio que sea confirmado apretando "check" verde; "Enter" o "Seguro?" se envia automaticamente a la base de datos</p>

        </div>
      </div>
      <div className="modal" id="borrarTareas" tabIndex="-1" role="dialog"> {/* Modal */}
        <div class="modal-dialog" role="document">
          <div class="modal-content ">
            <div class="modal-header">
              <h5 class="modal-title">Confirmacion de Borrado</h5>
              <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="row d-flex justify-content-center m-3">
              <div className="col-5">
                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  data-dismiss="modal"
                  onClick={() => { handleDeleteTarea() }} >
                  Seguro?
                </button>
              </div>
              <div className="col-5">
                <button type="button"
                  className="btn btn-secondary btn-block"
                  data-dismiss="modal">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default injectContext(App);
