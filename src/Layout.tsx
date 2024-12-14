import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import My from './components/My/My'
import Share from './components/Share/Share'
import Purchased from './components/Purchased/Purchased'
import Invest from './components/Invest/Invest'
import Withdraw from './components/Withdraw/Withdraw'
import Recharge from './components/Recharge/Recharge'
import Ticket from './components/Ticket/Ticket'
import ReferAndEarn from './components/My/ReferAndEarn'
import ChangePassword from './components/My/ChangePassword'
import Footer from './components/Common/Footer'
import Income from './components/My/Income'
import PaymentDetails from './components/Invest/PaymentDetails'
import MakePayment from './components/Invest/MakePayment'
import RewardHistory from './components/My/RewardHistory'

function Layout() {
  return (
  <>
    <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/invest' element={<Invest/>}/> 
        <Route path='/my' element={<My/>}/>
        <Route path='/purchased' element={<Purchased/>}/>
        <Route path='/withdraw' element={<Withdraw/>}/>
        <Route path='/recharge' element={<Recharge/>}/>
        <Route path='/ticket' element={<Ticket/>}/>
        <Route path='/my' element={<My/>}/>
        <Route path='/share' element={<Share/>}/>
        <Route path='/purchased' element={<Purchased/>}/>
        <Route path='/referAndEarn' element={<ReferAndEarn/>}/>
        <Route path='/ChangePassword' element={<ChangePassword/>}/>
        <Route path='/paymentDetails' element={<PaymentDetails/>}/>
        <Route path='/makePayment' element={<MakePayment/>}/>
        <Route path='/rewardHistory' element={<RewardHistory/>}/>
    </Routes>
    <Footer/>
  </>
  )
}

export default Layout
