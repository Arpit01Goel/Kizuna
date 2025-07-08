import React from 'react'
import Home from "./Pages/Home"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Chat from "./Components/Chat"
import { useAuthStore } from './store/useAuthStore'
import { Navigate } from 'react-router-dom'
import { useEffect  } from 'react'
import Footer from './Components/Footer'
import NewContact from './Pages/NewContact'
import Navbar from './Components/Navbar'
import ThemeTester from './Pages/ThemeTester'
import Profile from './Components/Profile'
import Review from "./Pages/Review"
const App = () => {
  const {authUser,checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
  useEffect(() =>{
    checkAuth()
  },[checkAuth])
  // console.log("online users: ",onlineUsers)
  
  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex flex-row items-center justify-around h-screen w-screen' >
        <span className="loading loading-ring loading-xl"></span>

      </div>
    )
  }
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/home" element={authUser? <Home/> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser? <Signup />: <Navigate to="/chat" />} />
        <Route path="/login" element={!authUser? <Login />: <Navigate to="/chat" />  } />
        <Route path="/chat" element={authUser ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/contact" element={authUser ? <NewContact /> : <Navigate to="/login" />} />
        <Route path="/theme-tester" element={<ThemeTester />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/review" element={<Review />} />

        
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
