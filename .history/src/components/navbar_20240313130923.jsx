import React from 'react'

const navbar = () => {
  return (
    <div className='container flex justify-around h-9 align-middle bg-purple-800 text-white text-xl '>
        <div className="logo">My-Task</div>
        <div className="left"><ul className="flex gap-8">
            <li>Home</li>
            <li>Your Task</li>
            </ul></div>
      
    </div>
  )
}

export default navbar
