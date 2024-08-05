import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [description, setDescription] = useState("") 
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedTodoId, setExpandedTodoId] = useState(null)

  // useEffect(() => {
  //   let toString = localStorage.getItem("todos")
  //   if(toString){
  //     let todos =JSON.parse(localStorage.getItem("todos"))
  //     setTodos(todos)
  //   }
  // }, [])
  


  // const saveToLS =(params) => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // }
  
  useEffect(() => {
   axios.get()
  }, [third])
  

  const handleEdit =(e,id)=>{
    let t= todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    setDescription(t[0].description)
    let newTodos =todos.filter(item=>{
      return item.id!==id
    });
   
    setTodos(newTodos)
    saveToLS();



  }



  const handleDelete =(e,id)=>{

    let newTodos =todos.filter(item=>{
      return item.id!==id
    });
   
    setTodos(newTodos)
    saveToLS();
  }


  const handleChange =(e)=>{
    setTodo(e.target.value)
  }

  const handleDescriptionChange = (e) => { 
    setDescription(e.target.value)
  }

  const handleAdd =()=>{ 
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false, description, timestamp: new Date().toLocaleString() }]) 
    setTodo("")
    setDescription("") 
    saveToLS(); 
  }

  const handleCheckbox=(e) => {
    let id =  e.target.name;
    let index=todos.findIndex(item=>{
      return item.id ===id;
    })
    let newTodos =[...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS();
  }
  

  const toggleFinished =(params) => {
    setshowFinished(!showFinished)
  }
  

  const handleSearch = (e) => { 
    setSearchTerm(e.target.value) 
  }

  const toggleExpand = (id) => { 
    setExpandedTodoId(expandedTodoId === id ? null : id); 
  }

  const filteredTodos = todos.filter(item => item.todo.toLowerCase().includes(searchTerm.toLowerCase())); 




  return (
    <>
    <Navbar/>
      <div className='flex justify-center '>
        <div className="w-[50vw] bg-purple-400 min-h-screen m-8 p-10 rounded-lg ">
          <div className='flex justify-center text-2xl font-extrabold m-3'>
           <h1 >Manage your todos at one place</h1>
          </div>
          <div className='text-xl font-bold m-3'>
           <h2>Add a Todo</h2>

          </div>
           <div className='gap-4 flex'>
            <input onChange={handleChange} value={todo} type="text" className='w-[35vw] rounded-xl p-1' />
            <input onChange={handleDescriptionChange} value={description} type="text" className='w-[35vw] rounded-xl p-1' placeholder="Description" />
            <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-700 rounded-md w-20 text-white hover:bg-violet-500  hover:border-2'>Save</button>
           </div>
           <div className='flex gap-2 my-3'>
           <input onChange={toggleFinished} type="checkbox" checked={showFinished}/><p> Show Finished</p>
           </div>

           <hr />

           <h2 className='font-bold text-xl my-4'>Your Todos</h2>

           <div className='flex flex-col gap-3'>
           <input onChange={handleSearch} value={searchTerm} type="text" placeholder="Search todos..." className='w-[35vw] rounded-xl p-1 my-3' />

           {filteredTodos.length === 0 && <div>No Todos</div>}

           {filteredTodos.map(item => {

            
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className='flex flex-col w-[40vw]'> 
                <div className='flex justify-between'>
                  <div className='flex'>
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className='mx-3'/>
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className='flex gap-2'>
                    <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-700 rounded-md w-auto p-1 text-white hover:bg-violet-500  hover:border'>Edit</button>
                    <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-700 rounded-md w-auto p-1 text-white hover:bg-violet-500  hover:border'>Delete</button>
                    <button onClick={() => toggleExpand(item.id)} className='bg-violet-700 rounded-md w-auto p-1 text-white hover:bg-violet-500  hover:border'>{expandedTodoId === item.id ? 'Less info' : 'More info'}</button> 
                  </div>
                </div>
                {expandedTodoId === item.id && ( 
                  <div className='mt-2'> 
                    <p>Description: {item.description}</p> 
                    <p>Last updated: {item.timestamp}</p> 
                  </div> 
                )} 
              </div>
           )})}
           </div>
        </div>
      </div>
    </>
  )
}

export default App
