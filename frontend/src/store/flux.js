
export default function getState({ getStore, getActions, setStore }) {
    return {
        store: {
            all: null,
            current: null,
            nombres: null,
            inputNombre:null,
            inputNewTask:null
        },
        actions: {
            getAll: async url => {
                try {
                    const all = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "aplication/json" }
                    })
                    const data = await all.json()
                    setStore({
                        all: data
                    })
                }
                catch (error) {
                    console.log(error)
                }
            },
            getCurrent: async (url, name) => {
                try {
                    const all = await fetch(url + name, {
                        method: "GET",
                        headers: { "Content-Type": "aplication/json" }
                    })
                    const data = await all.json()
                    if (data.tareas!==""){
                    data.tareas = JSON.parse(data.tareas)
                    }
                    setStore({ current: data })
                }
                catch (error) {
                    console.log(error)
                }
            },
            getNames: async (url) => {
                try {
                    const names = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "aplication/json" }
                    })
                    const data = await names.json()
                    setStore({ nombres: data })
                }
                catch (error) {
                    console.log(error)
                }
            },
            saveTodos: async (url, name, body)=>{
                try{
                    const change = await fetch(url+name,{
                        method:"PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    })
                    const result= await change.json()
                    console.log(result)
                }
                catch (error){
                    console.log(error)
                }
            },
            deleteTodos: async(url, name, reload)=>{
                try{
                    const message = await fetch (url+name,{
                        method: "DELETE",
                        headers:{"Content-Type":"application/json"}
                    })
                    const responce =await message.json()
                    if (responce.msg==="ok"){
                        let aux= [...reload]
                    let index = aux.findIndex((element) => element == name)
                    aux.splice(index,index+1)
                    setStore({nombres:aux})
                    setStore({current:null})
                    console.log(responce)
                    }
                    
                    
                }
                catch (error){
                    console.log(error)
                }
            },
            newList: async(url,name,nombres)=>{
                try{
                    const message = await fetch (url+name,{
                        method: "POST",
                        headers:{"Content-Type":"application/json"}
                    })
                    const responce =await message.json()
                    if (responce.result==="ok"){
                        try {
                            const all = await fetch("http://localhost:5000/api/todos/" + name, {
                                method: "GET",
                                headers: { "Content-Type": "aplication/json" }
                            })
                            const data = await all.json()
                            if (data.tareas!==""){
                            data.tareas = JSON.parse(data.tareas)
                            }
                            setStore({ current: data })
                        }
                        catch (error) {
                            console.log(error)
                        }
                        let aux= [...nombres]
                        aux.push(name)
                        console.log(name)
                        setStore({nombres:aux})
                    } 
                }
                catch (error){
                    console.log(error)
                }
            },
            checkTodos: (number, store) => {
                let newcurr = { ...store.current }
                newcurr.tareas[number].done=!store.current.tareas[number].done;
                setStore({ current: newcurr })
            },
            handleTrashCan: (number, store) =>{
                let newcurr = {...store.current}
                newcurr.tareas.splice(number,number+1)
                setStore({current:newcurr})
            },
            handleNewTask:(texto,store)=>{
                let newcurr = {...store}
                if (newcurr.tareas===""){
                    newcurr.tareas=[{done:false,label:texto}]
                }
                else{
                    newcurr.tareas.push({done:false,label:texto})
                }
                setStore({current:newcurr})
            },
            handleInputNombre:(input)=>{
                setStore({inputNombre:input})
            },
            handleInputNewTask:(input)=>{
                setStore({inputNewTask:input})
            },

        }
    }
}