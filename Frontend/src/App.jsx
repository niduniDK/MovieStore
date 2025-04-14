import { StrictMode, useState } from 'react'
import './App.css'
import Home from './pages/home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </Router>
    </StrictMode>
  )
}

export default App
