
import { Route, Routes } from 'react-router'
import './App.css'
import Login from './markup/pages/Login'
import Home from './markup/pages/Home'
import AddEmployee from './markup/pages/admin/add-employee'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin/add-employee' element={<AddEmployee/>}/>
    </Routes>
    </>
  )
}

export default App
