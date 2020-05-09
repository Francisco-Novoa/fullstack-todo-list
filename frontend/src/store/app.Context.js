import React, { useState, useEffect} from "react"
import getState from "./flux"

export const apiContext = React.createContext()

const injectContext = PassedComponent =>{
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: ()=>state.store,
                getActions : ()=> state.actions,
                setStore: updateStore => setState({
                    store: Object.assign(state.store, updateStore),
                    actions: {...state.actions}
                })
            })
        )
        useEffect(()=>{
            state.actions.getAll("http://localhost:5000/api/todos")
            state.actions.getNames("http://localhost:5000/api/todos/names")
            
        },[])
        return (
            <apiContext.Provider value={state}>
                <PassedComponent {...props}/>
            </apiContext.Provider>
        )
    }
    return StoreWrapper
}

export default injectContext