import './App.css';
import React, {useState, useEffect, useRef} from 'react';
function App() {

  const [tasks,setTask] = useState([])
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
