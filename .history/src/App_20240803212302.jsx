import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

// Dummy JSON data (simulating a JSON file as data repository)
const initialTodos = [
  {
    id: uuidv4(),
    todo: "Sample Task",
    description: "This is a sample task description.",
    isCompleted: false,
    lastUpdated: new Date().toISOString()
  }
]

function App() {
  const [todo, setTodo] = useState("")
  const [description, setDescription] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    let storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    } else {
      setTodos(initialTodos)
      localStorage.setItem("todos", JSON.stringify(initialTodos))
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let task = todos.find(i => i.id === id)
    setTodo(task.todo)
    setDescription(task.description)
    setEditingId(id)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleAddOrUpdate = () => {
    if (editingId) {
      setTodos(todos.map(item => 
        item.id === editingId ? 
        { ...item, todo, description, lastUpdated: new Date().toISOString() } : item))
      setEditingId(null)
    } else {
      setTodos([...todos, { id: uuidv4(), todo, description, isCompleted: false, lastUpdated: new Date().toISOString() }])
    }
    setTodo("")
    setDescription("")
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let newTodos = todos.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)
    setTodos(newTodos)
    saveToLS()
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredTodos = todos.filter(item => 
    item.todo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <Navbar />
      <div className='flex justify-center '>
        <div className="w-[50vw] bg-purple-400 min-h-screen m-8 p-10 rounded-lg ">
          <div className='flex justify-center text-2xl font-extrabold m-3'>
            <h1>Manage your todos at one place</h1>
          </div>
          <div className='text-xl font-bold m-3'>
            <h2>{editingId ? "Edit Todo" : "Add a Todo"}</h2>
          </div>
          <div className='gap-4 flex'>
            <input onChange={handleChange} value={todo} type="text" className='w-[35vw] rounded-xl p-1' placeholder="Task" />
            <button onClick={handleAddOrUpdate} disabled={todo.length < 3} className='bg-violet-700 rounded-md w-20 text-white'>{editingId ? "Update" : "Save"}</button>
          </div>
          <div className='gap-4 flex my-2'>
            <textarea onChange={handleDescriptionChange} value={description} className='w-[35vw] rounded-xl p-1' placeholder="Description"></textarea>
          </div>
          <div className='flex gap-2 my-3'>
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} /><p> Show Finished</p>
          </div>
          <div className='flex gap-2 my-3'>
            <input onChange={handleSearchChange} value={searchTerm} type="text" placeholder="Search..." className='w-[35vw] rounded-xl p-1' />
          </div>
          <hr />
          <h2 className='font-bold text-xl my-4'>Your Todos</h2>
          <div className='flex flex-col gap-3'>
            {filteredTodos.length === 0 && <div>No Todos</div>}
            {filteredTodos.map(item => (showFinished || !item.isCompleted) && (
              <div key={item.id} className='flex w-[40wv] justify-between'>
                <div className='flex'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className='mx-3' />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className='flex gap-2'>
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-700 rounded-md w-auto p-1 text-white'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 rounded-md w-auto p-1 text-white'>Delete</button>
                  <button onClick={() => toggleExpand(item.id)} className='bg-violet-700 rounded-md w-auto p-1 text-white'>{expandedId === item.id ? "Collapse" : "Expand"}</button>
                </div>
                {expandedId === item.id && (
                  <div className='mt-2 ml-10'>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Last Updated:</strong> {new Date(item.lastUpdated).toLocaleString()}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
