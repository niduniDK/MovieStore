import React from 'react'
import icon from '../assets/movie-clapper-open.png'
import person_icon from '../assets/person.png'

function Navbar() {
  return (
    <div className="flex flex-row bg-white items-center p-3 m-5">
      <img src={icon} alt="Movie icon" className="w-12 h-auto mx-3" />
      <h1 className="text-4xl text-green-950 m-5"><strong>MovieStore</strong></h1>
      <div className='flex flex-row'>
        <img src={person_icon} className='absolute top-3 right-3 w-12 h-auto m-10' />
      </div>
    </div>
  )
}

export default Navbar;
