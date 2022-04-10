import React from 'react';
import clsx from 'clsx';
import {GrFormClose,GrFormEdit,GrFormCheckmark} from 'react-icons/gr';
import {useTodoLayerValue} from '../context/TodoContext';
import { useState } from 'react';
function Todo({todo}) {
  const [{},dispatch]=useTodoLayerValue();
  const [editTable,setEditTable]=useState(false);
  const [content,setContent]=useState(todo.content);
  const removeTodo=todoId=>{
    dispatch({
      type:"REMOVE_TODO",
      payload:todoId,
    });
  }
  const completeTodo=todoId=>{
    dispatch({
      type:"COMPLETE_TODO",
      payload:todoId,
    });
  }
  const updateTodo=({todoId,newValue})=>{
    dispatch({
      type:"UPDATE_TODO",
      payload:{
        todoId,
        newValue
      }
    });
  }
  const todoStyle =clsx({
   ["todo-row"]:true,
   ["completed"]:todo.isCompleted,

  });
  return (
    <div className={todoStyle}>
      <div onClick={()=>editTable ? '' : completeTodo(todo.id)}>
        {
          editTable ? 
          (<input type="text" value={content} onChange={event=>setContent(event.target.value)} className='todo-input-edit'/>)
          :
          (todo.content)
        }
      </div>
      <div className='todo-icons'>
        <GrFormClose className='todo-icon' onClick={()=>removeTodo(todo.id)}/>
        {
          editTable ? (<GrFormCheckmark className='todo-icon' onClick={()=>{
            updateTodo({
              todoId: todo.id,
              newValue: content,
            });
            setContent("");
            setEditTable(false);

          }}/>):
          (<GrFormEdit className='todo-icon' onClick={()=>setEditTable(true)}/>)
        }
       
      </div>
    </div>
  )
}

export default Todo
