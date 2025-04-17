import { StrictMode, useEffect, useState } from 'react'
import './App.css'
import Home from './pages/home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import MovieList from './pages/movielist'
import WatchOnline from './pages/watchonline'
import SearchResults from './pages/searchresults'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/#home' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/movielist' element={<MovieList/>}></Route>
          <Route path='/watchonline' element={<WatchOnline/>}></Route>
          <Route path='/search' element={<SearchResults/>}></Route>
        </Routes>
      </Router>
    </StrictMode>
  )
}

export default App
