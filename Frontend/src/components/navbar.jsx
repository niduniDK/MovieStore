import React from 'react'
import icon from '../assets/movie-clapper-open.png'
import person_icon from '../assets/person.png'
import { Link } from 'react-router-dom';
import SearchBar from './searchbar';

function Navbar() {
  return (
    <div className="flex flex-row bg-white items-center p-1 mb-0 my-2 m-5">
      <Link to={'/#home'} className="flex flex-row bg-white items-center p-1 m-5">
        <img src={icon} alt="Movie icon" className="w-12 h-auto mx-3" />
        <h1 className="text-4xl text-green-950 m-5 my-2 ml-1"><strong>MovieStore</strong></h1>
      </Link>
      <SearchBar/>
      <div className='flex flex-row'>
        <Link to={'/login'}>
          <img src={person_icon} className='absolute top-3 right-3 w-12 h-auto m-10' />
        </Link>
        
      </div>
    </div>
  )
}

export default Navbar;
