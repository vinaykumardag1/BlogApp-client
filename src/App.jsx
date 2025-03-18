import React from 'react'
import Login from './Forms/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Forms/Register'
import Dashboard from './pages/Dashboard'
import CreateBlog from './pages/CreateBlog'
import MyBlogs from './pages/myBlogs'
import Blogs from './pages/Blogs'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Dashboard/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/register' element={<Register/>} />
       <Route path='/createblog' element={<CreateBlog/>} />
       <Route path='/myBlogs' element={<MyBlogs/>}/>
       <Route path='/blogs/:id' element={<Blogs/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
