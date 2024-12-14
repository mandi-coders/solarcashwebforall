import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './Layout'
import React from 'react'
import GetHelp from './components/My/GetHelp'
import CreateTicket from './components/My/CreateTicket'
import UserProfile from './components/My/UserProfile'
import Withdraw_history from './components/My/Withdraw_history'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FundHistory from './components/My/FundHistory'
import ViewTicket from './components/My/ViewTicket'
import InsideTicket from './components/My/InsideTicket'
import SingleLevel from './components/My/SingleLevel'
import ProtectedRoute from './API/ProtectedRout'
import Income from './components/My/Income'
import ForgotPassEmail from './components/Auth/ForgotPassEmail'
import OTP from './components/Auth/OTP'
import ConfirmPass from './components/Auth/ConfirmPass'



function App() {

  return (
    <>
      <div className=' bg-[#eee] mx-auto w-[100vw] sm:w-[400px] max-w-[100vw] min-h-[100vh] shadow-xl shadow-black ' >
        <ToastContainer
          position='top-right'
        />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/ForgotPassEmail' element={<ForgotPassEmail />} />
            <Route path='/otp' element={<OTP/>} />
            <Route path='/ConfirmPass' element={<ConfirmPass/>} />

            
            <Route path='*' element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>

            } />
            <Route path='/income' element={
              <ProtectedRoute>
                <Income/>
              </ProtectedRoute>

              }/>

            <Route path='/getHelp' element={

              <ProtectedRoute><GetHelp /> </ProtectedRoute>} />
            <Route path='/CreateTicket' element={

              <ProtectedRoute><CreateTicket /> </ProtectedRoute>} />
            <Route path='/UserProfile' element={

              <ProtectedRoute><UserProfile /> </ProtectedRoute>} />
            <Route path='/Withdraw_history' element={

              <ProtectedRoute><Withdraw_history /> </ProtectedRoute>} />
            <Route path='/fundHistory' element={

              <ProtectedRoute><FundHistory /> </ProtectedRoute>} />
            <Route path='/viewTicket' element={

              <ProtectedRoute><ViewTicket /> </ProtectedRoute>} />
            <Route path='/SingleTicket' element={

              <ProtectedRoute><InsideTicket /> </ProtectedRoute>} />
            <Route path='/SingleLevel' element={

              <ProtectedRoute><SingleLevel /> </ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
