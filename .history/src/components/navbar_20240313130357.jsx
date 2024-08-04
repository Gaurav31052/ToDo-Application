import React from 'react'

const navbar = () => {
  return (
    <div className='container flex space-Between'>
        <div className="logo">My-Task</div>
        <div className="left"><ul className="none">
            <li>Home</li>
            <li>Your Task</li>
            </ul></div>
      
    </div>
  )
}

export default navbar
