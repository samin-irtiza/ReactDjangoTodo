import './App.css';
import React, {useState, useEffect, useRef, useCallback} from 'react';
// import {SlClose} from "react-icons/sl"

import {FiXCircle} from "react-icons/fi"
import {FiEdit} from "react-icons/fi"
import {FiCheckCircle} from "react-icons/fi"
function App() {

  const [tasks,setTasks] = useState({
    todoList:[],
    activeItem:{id: null,
      title: '',
      completed: false,
    },
    editing: false,
  })

  const focusOnInput = useRef(null);

  useEffect(fetchTasks,[])
  
  useEffect(()=>{
    focusOnInput.current.focus();
  },[])


  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  
  }

  function fetchTasks (){
    console.log("Fetching List of Tasks...")
    
    fetch('http://127.0.0.1:8000/task-list/')
    .then(response => response.json())
    .then(data => setTasks(t=>t={...t,todoList:data}))
    // .then(()=>console.log(tasks.todoList))
  }

  function handleChange(e){
    setTasks({...tasks, 
      activeItem:{
      ...tasks.activeItem,
      title:e.target.value}
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    
    const csrftoken = getCookie('csrftoken');

    let url = 'http://127.0.0.1:8000/task-create/'

    if (tasks.editing){
      url = `http://127.0.0.1:8000/task-update/${tasks.activeItem.id}/`
      setTasks({...tasks,editing:false})
    }

    fetch(url,{
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrftoken,
      },
      body:JSON.stringify(tasks.activeItem)
    }).then((response) => {
      fetchTasks()
      setTasks({
        ...tasks,
        activeItem:{
          id: null,
          title: '',
          completed: false,
        },
      })
    }).catch((error) => console.error('Error',error))
  }
  function EditRender(editprops){
    const todo = editprops.todo
    if (editprops.editing && todo.id===tasks.activeItem.id){
        return (
        <form className='edit-form' onSubmit={handleSubmit}>
          <input
            type='text'
            value={tasks.activeItem.title}
            name='text'
            onChange = {handleChange}
            autoFocus = {true}
          />
        </form>
        )
    }
    return(
        <div className='todo-text'>
          {todo.title}
        </div>
    )

  }

  function StartEdit(item){
    setTasks({
      ...tasks,
      activeItem:item,
      editing: true,
    })
  }
  return (
    <div className="App">
      <div className="form-wrapper">
        <form className='todo-form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Add a task'
            value={tasks.activeItem.title}
            name='text'
            className='todo-input'
            onChange={handleChange}
            ref={focusOnInput}
          />
          <button className='todo-button'> Add Task</button>
        </form>
      </div>
      <div className="list-wrapper">
          {tasks.todoList.map((todo,index) => (
              <div className={todo.completed? 'todo-row complete' : 'todo-row'} key={index}>
                <EditRender todo={todo} editing={tasks.editing}/>
                <div className='icons'>
                  <FiXCircle className='remove-icon' color='red'/>
                  {tasks.editing && todo.id=== tasks.activeItem.id
                  ?<FiCheckCircle className='edit-icon' color='blue' onClick={handleSubmit}/>
                  :<FiEdit className='edit-icon' style={{color:'aqua'}} onClick={()=>StartEdit(todo)}/>}
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default App;
