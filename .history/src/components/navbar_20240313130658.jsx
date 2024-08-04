import React from 'react'

const navbar = () => {
  return (
    <div className='container flex justify-around h-9 align-middle '>
        <div className="logo">My-Task</div>
        <div className="left"><ul className="flex">
            <li>Home</li>
            <li>Your Task</li>
            </ul></div>
      
    </div>
  )
}

export default navbar
