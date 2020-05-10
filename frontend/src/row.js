import React, { useState, useContext } from "react"
import injectContext, { apiContext } from "./store/app.Context"

export default function Row(props) {
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(props.task)
    const { actions } = useContext(apiContext)
    const handleComplete = () => {
        actions.PUTCURRLIST("http://localhost:5000/api/todos/completetask/" + props.id)
    }
    const handleDelete = () => {
        actions.DELETECURRLIST("http://localhost:5000/api/todos/deletetask/" + props.id)
    }
    const handleCancel = () => {
        setEdit(false)
        setText(props.task)
    }
    const handleModifyTask = () => {
        actions.MODIFYCURRLIST("http://localhost:5000/api/todos/edittask/" + props.id, { "task": text })
        setEdit(false)
    }

    return (
        <>
            {props.done === true ?
                edit === true ?
                    <li type="button" className="list-group-item list-group-item-action">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <input
                                        type="text"
                                        onChange={(e) => { setText(e.target.value) }}
                                        value={text}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-4">
                                    <span className="badge badge-success" onClick={() => { handleComplete() }} >
                                        Hecho
                                    </span>

                                    <span className="right">
                                        <i className="fas fa-trash btn btn-outline-danger" data-toggle="modal" data-target={"#deleteModal" + props.id}></i>
                                    </span>
                                    <span className="right" onClick={() => { handleCancel() }}>
                                        <i className="fas fa-minus-circle btn btn-outline-warning mx-2"></i>
                                    </span>
                                    <span className="check" onClick={() => { handleModifyTask() }}>
                                        <i className="fas fa-check btn btn-outline-success" ></i>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </li>
                    :
                    <li type="button" className="list-group-item list-group-item-action">
                        <span onClick={() => { handleComplete() }}>
                            {props.task}
                        </span>
                        <span className="badge badge-success ml-2" onClick={() => { handleComplete() }} >
                            Hecho
                                </span>
                        <span className="right">
                            <i className="fas fa-trash btn btn-outline-danger" data-toggle="modal" data-target={"#deleteModal" + props.id}></i>
                        </span>
                        <span className="right" onClick={() => { setEdit(!edit) }}>
                            <i className="fas fa-edit btn btn-outline-info mx-2" ></i>
                        </span>
                    </li>

                : props.done === false && edit === true ?
                    <li type="button" className="list-group-item list-group-item-action">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <input
                                        type="text"
                                        onChange={(e) => { setText(e.target.value) }}
                                        value={text}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-4">
                                    <span className="badge badge-warning ml-2" onClick={() => { handleComplete() }}>
                                        por Hacer
                                    </span>
                                    <span className="right">
                                        <i className="fas fa-trash btn btn-outline-danger" data-toggle="modal" data-target={"#deleteModal" + props.id}></i>
                                    </span>
                                    <span className="right" onClick={() => { handleCancel() }} >
                                        <i className="fas fa-minus-circle btn btn-outline-warning mx-2"></i>
                                    </span>
                                    <span className="check" onClick={() => { handleModifyTask() }}>
                                        <i className="fas fa-check btn btn-outline-success" ></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    :
                    <li type="button" className="list-group-item list-group-item-action">
                        <span onClick={() => { handleComplete() }}>
                            {props.task}
                        </span>
                        <span className="badge badge-warning ml-2" onClick={() => { handleComplete() }}>
                            por Hacer
                        </span>
                        <span className="right">
                            <i className="fas fa-trash btn btn-outline-danger" data-toggle="modal" data-target={"#deleteModal" + props.id}></i>
                        </span>
                        <span className="right mx-2" onClick={() => { setEdit(!edit) }}>
                            <i className="fas fa-edit btn btn-outline-info"></i>
                        </span>
                    </li>
            }
            <div className="modal" id={"deleteModal" + props.id} tabIndex="-1" role="dialog">
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
                                    onClick={() => { handleDelete() }} >Seguro?</button>
                            </div>
                            <div className="col-5">
                                <button type="button" className="btn btn-secondary btn-block" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}