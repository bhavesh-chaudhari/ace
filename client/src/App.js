import React from 'react'
import {Routes, Route, useMatch} from "react-router-dom"
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Registration from './pages/registration/Registration'

const App = () => {

  let match = useMatch("/register")

  console.log(match)

    return (
      <>
        {
          !match && <Navbar></Navbar>
        }
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Registration />}></Route>
        </Routes>
      </>
    );  
}

export default App;
