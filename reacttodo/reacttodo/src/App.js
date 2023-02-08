import './App.css';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {SlClose} from "react-icons/sl"
import {TiEdit} from "react-icons/ti"
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

    const url = 'http://127.0.0.1:8000/task-create/'

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
    }).catch((error) => console.log('Error',error))
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
              <div className={todo.isComplete? 'todo-row complete' : 'todo-row'} key={index}>
                <div className='todo-text' key={todo.id}>
                  {todo.title}
                </div>
                <div className='icons'>
                  <SlClose className='remove-icon'/>
                  <TiEdit className='edit-icon'/>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default App;
