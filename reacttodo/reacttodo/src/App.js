import './App.css';
import React, {useState, useEffect, useRef} from 'react';
function App() {

  const [tasks,setTask] = useState([])

  useEffect(() => {
    fetchTasks();
  });

  function fetchTasks(){
    console.log("Fetching List of Tasks...")

    fetch('http://127.0.0.1:8000/api/task-list/')
    .then(response => response.json())
    .then(data => console.log(data));
  }
  return (
    <div className="App">
      <div className="form-wrapper">
        <form className='todo-form'>
          <input
            type='text'
            placeholder='Add a task'
            // value={input}
            name='text'
            className='todo-input'
            // onChange={viewChange}
            // ref={focusOnInput}
          />
          <button className='todo-button'> Add Task</button>
        </form>
      </div>
      <div className="list-wrapper">

      </div>
    </div>
  );
}

export default App;
