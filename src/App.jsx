
import { Route, Routes } from 'react-router'
import './App.css'
import Main from './Components/Main'
import Home from './Components/Home'
import NotFound from './Components/NotFound'
import AllUsers from './Components/AllUsers'
import About from './Components/About'
import ProductDetails from './Components/ProductDetails'
import Login from './Components/Pages/Login'
import Register from './Components/Pages/Register'


function App() {


  return (
    <>
    
    <Routes>
      
        <Route path='/' element={<Main/>}>
        
        <Route path='/' element={<Home/>}> </Route>
        <Route path='*' element={<NotFound/>}> </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/allUser' element={<AllUsers/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/:id' element={<ProductDetails></ProductDetails>}> </Route>
        
        
        </Route>

     
    </Routes>
    
      
    </>
  )
}

export default App
