/* 
SOURCES: 
- https://www.geeksforgeeks.org/create-todo-app-using-reactjs/
- https://www.codingdeft.com/posts/react-to-do-list/

*/

import './App.css';

// App.js File 
import { useState } from "react"
import useLocalStorage from "./useLocalStorage"
import "./index.css"

/* 
import React, { Component } from "react"; 
import "bootstrap/dist/css/bootstrap.css"; 
import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import FormControl from "react-bootstrap/FormControl"; 
import ListGroup from "react-bootstrap/ListGroup"; 
import Checkbox from "react-bootstrap/FormCheck"; */ 

function App() {
  const [userInput, setUserInput] = useState("")

  const [todoList, setTodoList] = useLocalStorage("todo-items", [])

  const addItem = e => {
    e.preventDefault()
    const trimmedUserInput = userInput.trim();
    if (trimmedUserInput) {
      setTodoList(existingItems => [
        ...existingItems,
        { name: trimmedUserInput, finished: false },
      ])
      setUserInput("")
    }
  }

  const toggleTask = index => {
    setTodoList(existingItems =>
      existingItems.map((item, i) =>
        index === i ? { ...item, finished: !item.finished } : item
      )
    )
  }

  const deleteTask = index => {
    setTodoList(existingItems => existingItems.filter((item, i) => index !== i))
  }

  
  /* 

  TO-DO: Update the existing to-do item using index 
  
  const editTask = index => { 
    const editedTodo = prompt('Edit the to-do item:'); 

    if (editedTodo !== null && editedTodo.trim() !== '') { 
      editedTodo = editedTodo.trim(); 

      setTodoList(existingItems => 
        [
          ...existingItems, 
        ])

      updatedTodos[index].value = editedTodo 
      this.setState({ 
        list: updatedTodos, 
    }); 
    } 

  }

  */

  return (
    <div className="App">
      <div className="card">
        <h2 className="heading">To-Do List</h2>

        <form onSubmit={addItem}>
          <div className="input-wrapper">
            <input
              className="input"
              placeholder="Add a task..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
            />
            <button type="submit" className="add-btn">
              Add
            </button>
          </div>
        </form>

        <div className="items-list">
          {todoList.map((item, index) => (
            <label
              className="tag"
              key={index + item.name}
              htmlFor={`checkbox-${index + item.name}`}
            >
              <input
                id={`checkbox-${index + item.name}`}
                type="checkbox"
                checked={item.finished}
                style={{cursor: "pointer"}}
                onChange={() => toggleTask(index)}
              />
              <span className={`label ${item.finished ? "finished" : ""}`}>
                {item.name}
              </span>
              <button className="btn" style={{marginRight: "10px"}} onClick={() => deleteTask(index)}>
                <span> Delete </span>
              </button>
              <button className="btn" onClick={() => deleteTask(index)}> 
                <span> Edit </span>
              </button>
            </label>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default App