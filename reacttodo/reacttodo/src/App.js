import './App.css';
import React, {useState, useEffect, useRef} from 'react';
// import {SlClose} from "react-icons/sl"
import Task from './components/Task';


function App() {

  const [tasks,setTasks] = useState({
    todoList:[],
    activeItem:{id: null,
      title: '',
      complete: false,
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
    
    fetch('api/task-list/')
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

    let url = 'api/task-create/'

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
          complete: false,
        },
      editing:false})
    }).catch((error) => console.error('Error',error))
  }
  
  function handleEdit(task){
    const csrftoken = getCookie('csrftoken');
    
    let url = `api/task-update/${task.id}/`

    fetch(url,{
      method:'POST',
      headers:{
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrftoken,
      },
      body:JSON.stringify(task)
    }).then((response) => {
      // fetchTasks()
      setTasks({
        ...tasks,
        activeItem : {
          id: null,
          title: '',
          complete: false,
        },
      editing:false})
    }).catch((error) => console.error('Error',error))
  }

  const completeToggle = (op) =>{
    tasks.todoList.map(t =>{
      if (t.id===op){
        t.complete=!t.complete
        handleEdit(t)
      }
      return t
    })
    setTasks({...tasks})
  }

  function StartEdit(item){
    setTasks({
      ...tasks,
      editing: true,
    })
  }

  function deleteTask(task){
    const csrftoken = getCookie('csrftoken')

    fetch(`api/task-delete/${task.id}/`,{
      method:'DELETE',
      headers:{
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrftoken,
      },
    }).then(response =>{
      fetchTasks()
    })
  }
  return (
    <div className="App todo-app">
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
        <Task todos={tasks.todoList} completeToggle={completeToggle} deleteTask={deleteTask} StartEdit={StartEdit} handleEdit={handleEdit} />
      </div>
    </div>
  )
}

export default App;
