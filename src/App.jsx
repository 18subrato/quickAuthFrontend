import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import ErrorPage from './pages/ErrorPage'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Toaster toastOptions={{
        success: {
          style:{
            background:'#4CAF50',
            color:'#fff'
          },
        },
        error:{
          style:{
            background:'#F44336',
            color:'#fff'
          }
        }
      }} />
     <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/email-verify' element={ <EmailVerify/> } />
      <Route path='/reset-password' element={ <ResetPassword/> } />
      <Route path='*' element={ <ErrorPage/> } />
     </Routes>
    </div>
  )
}

export default App


