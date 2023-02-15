import { useState } from "react"
import TextareaAutosize from 'react-textarea-autosize'
import {FiXCircle} from "react-icons/fi"
import {FiEdit} from "react-icons/fi"
import {FiCheckCircle} from "react-icons/fi"

export default function Task({todos,handleEdit,StartEdit,completeToggle,deleteTask}){
    const [edit,setEdit] = useState({
        id:null,
        title:'',
        complete:false
    })
    function handleChange(e){
        setEdit({
        ...edit,
        title:e.target.value
        })
      }

      const caretPositionFix = (e) => {
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
      }

    return(
       todos.map((todo,index)=>(
        <div className={todo.complete? 'todo-row complete' : 'todo-row'} key={index}>
            {edit.id===todo.id?
            <form className='edit-form' key={index} onKeyDown={(e)=>{
              if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleEdit(edit);
                  setEdit({
                    id:null,
                    title:'',
                    complete:false})
            }}}>
              <TextareaAutosize
                // ref={textAreaRef}
                type='text'
                value={edit.title}
                name='text'
                onChange = {handleChange}
                autoFocus = {true}
                onFocus = {caretPositionFix}
              />
            </form>
            : <div className='todo-text' key={index} onClick={()=>completeToggle(todo.id)}>
              {todo.title}
            </div>
            }
            <div className='icons'>
            <FiXCircle className='remove-icon' color='red' onClick={()=>deleteTask(todo)}/>
            {edit.id && edit.id===todo.id?
            <FiCheckCircle className='edit-icon' color='lime' onClick={()=>{handleEdit(edit);setEdit({
                id:null,
                title:'',
                complete:false
            })}}/>
            :<FiEdit className='edit-icon' color='aqua' onClick={()=>{StartEdit(todo)
            setEdit(todo)}}/>}
            </div>
        </div>
        )
       )
    )
}