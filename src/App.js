import {useTodoLayerValue} from "./context/TodoContext";
import React,{useState,useEffect,useRef} from "react";
import TodoList from './components/TodoList'
import './App.css';
function App() {
  const [{todos},dispatch]=useTodoLayerValue();
  const [content,setContent]=useState("");
  const inputRef=useRef(null);
  useEffect(()=>{
    inputRef.current.focus()
  },[]);
  const handleSubmit=(event)=>{
    event.preventDefault();//sayfanın yeniden yüklemesini engeller.
    if (!content && content.length<1) {
      return;
    }
   const newTodo={
     id:Math.floor(Math.random()*454544552),
     content,
     isCompleted:false
   };
   dispatch({
    type:"ADD_TODO",
    payload:newTodo
   });
  };
  return (
   <div className="container">
     <form onSubmit={handleSubmit} className="todo-form">
         <input type="text" className="todo-input" onChange={(event)=>setContent(event.target.value)} value={content} ref={inputRef}></input>
         <button className="todo-button">Ekle</button>
     </form>
     <TodoList todos={todos}/>
   </div>  
  );
}

export default App;
