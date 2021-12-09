import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'

const App = () => {
    return (
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>} >
            </Route>
          </Routes>
        </Router>
    )
}

export default App
