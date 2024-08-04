import React from 'react'

const navbar = () => {
  return (
    <div className='container flex justify-around align-center bg-purple-800 text-white text-xl font-semibold py-2 h-16 pt-4'>
        <div className="logo font-bold text-2xl">My-ToDo</div>
        <div className="left"><ul className="flex gap-8">
            <li>Home</li>
            <li>Your Task</li>
            </ul></div>
      
    </div>
  )
}

export default navbar
