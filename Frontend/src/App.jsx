import { StrictMode, useEffect, useState } from 'react'
import './App.css'
import Home from './pages/home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import MovieList from './pages/movielist'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/#home' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/movielist' element={<MovieList/>}></Route>
        </Routes>
      </Router>
    </StrictMode>
  )
}

export default App
