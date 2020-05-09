import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css'
import injectContext, { apiContext } from './store/app.Context';

// Add css files
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'font-awesome/css/font-awesome.min.css'; // 4.x
import '@fortawesome/fontawesome-free/css/all.css'; // 5.x

// Add js files
import 'jquery';
import 'popper.js';
import 'bootstrap';

import ToDoElement from "./components/todoelement"
import Navbar from './components/navbar';
import TodoList from './components/todolist';
import Dropdown from "./components/dropdown"

function App() {
  const { store } = useContext(apiContext)
  return (
    <>
      <BrowserRouter>
        <Dropdown />
        "pancho"
        <TodoList />
      </BrowserRouter>
    </>
  );
}

export default injectContext(App);
