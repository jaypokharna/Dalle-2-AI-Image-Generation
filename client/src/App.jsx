/* eslint-disable no-unused-vars */
import React from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/home/Home'
import CreatePost from './pages/createPost/CreatePost'
import Header from './components/header/Header'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    
    <div className="w-[100vw] bg-[#f9fafe]">
      <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home />}/>
      <Route path="/createPost" element={<CreatePost />}/>

    </Routes>
    </BrowserRouter>
    <Toaster/>
    </div>

  )
}

export default App