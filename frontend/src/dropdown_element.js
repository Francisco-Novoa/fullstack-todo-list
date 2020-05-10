import React, { useContext } from "react"
import injectContext, { apiContext } from "./store/app.Context"

export default function Dropdown_element(props) {
    const { store, actions } = useContext(apiContext)
    const handleClick=()=>{
        actions.setCurrent(props.elem)
        if(props.focus===null){
            props.loadFocus(true)
        }
        else{
            props.loadFocus(!props.focus)
        }
        
    }
    return(
    <button class=" btn btn-primary dropdown-item" onClick={()=>{handleClick()}}>{ props.elem }</button>
    )
}