
export default function getState({ getStore, getActions, setStore }) {
    return {
        store: {
            all: null,
            name:null,
            current:null,
            currentList:null,
        },
        actions: {
            GET: async url => {
                try {
                    const all = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
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
            GETNAME: async url => {
                try {
                    const all = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    })
                    const data = await all.json()
                    setStore({
                        name: data
                    })
                }
                catch (error) {
                    console.log(error)
                }
            },
            GETCURRLIST: async url => {
                try {
                    const all = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    })
                    const data = await all.json()
                    setStore({
                        currentList: data
                    })
                }
                catch (error) {
                    console.log(error)
                }
            },
            PUTCURRLIST:async url => {
                try {
                    const all = await fetch(url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" }
                    })
                    const data = await all.json()
                    setStore({
                        currentList: data
                    })
                }
                catch (error) {
                    console.log(error)
                }
            },
            MODIFYCURRLIST:async (url,body) => {
                try {
                    const all = await fetch(url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body:JSON.stringify(body)
                    })
                    const data = await all.json()
                    setStore({
                        currentList: data
                    })
                }
                catch (error) {
                    console.log(error)
                }
            },
            DELETE: async url => {
                try {
                    const all = await fetch(url, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" }
                    })
                    const data = await all.json()
                    setStore({
                        all: data,
                        current:null,
                        currentList:null
                    })
                    let actions=getActions()
                    actions.GETNAME("http://localhost:5000/api/todos/names")
                }
                catch (error) {
                    console.log(error)
                }
            },
            DELETECURRLIST:async url => {
                try {
                    const all = await fetch(url, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" }
                    })
                    const data = await all.json()
                    setStore({
                        currentList: data
                    })
                }
                catch (error) {
                    console.log(error)
                }
            },
            POST: async (url,nombre) =>{
                try {
                    const all = await fetch(url,{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                    })
                    const data = await all.json()
                    setStore({
                        ALL: data,
                        current:nombre
                    })
                    let actions=getActions()
                    actions.GETNAME("http://localhost:5000/api/todos/names")
                } catch (error) {
                    console.log(error)
                }
            },
            POSTNEWTASK: async (url,body) =>{
                try {
                    const all = await fetch(url,{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(body)
                    })
                    const data = await all.json()
                    setStore({
                        currentList: data
                    })
                } catch (error) {
                    console.log(error)
                }
            },
            setCurrent:(input)=>{
               setStore({current:input})
            },
        }
    }
}
