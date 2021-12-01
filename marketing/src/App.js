import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Pricing from './components/Pricing'
import Dashboard from './components/Dashboard'

function App () {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/pricing' element={<Pricing />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
    </Routes>
  </BrowserRouter>
}

export default App