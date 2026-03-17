
import { Route, Routes } from 'react-router'
// import './App.css'
import Login from './markup/pages/Login'
import Home from './markup/pages/Home'
import AddEmployee from './markup/pages/admin/AddEmployee'
import Footer from './markup/components/Footer/Footer'
// Import the css files 
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custome.css"
import Header from './markup/components/Header/Header'

function App() {


  return (
    <>
  <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/addemployee' element={<AddEmployee/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
