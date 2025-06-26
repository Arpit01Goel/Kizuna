import React from 'react'
import Navbar from "../Components/Navbar"
import Introduction from "../Components/Introduction"
import About from "../Components/About"
import Footer from '../Components/Footer'
function Home() {
  return (
    <div>
      <div className="relative w-full  bg-[url('./assets/Theme.jpeg')] bg-cover bg-center text-white text-3xl md:text-5xl">
      <div className='absolute inset-0 bg-black opacity-70 h-full'></div>
      <div className='relative z-10'>

      {/* <Navbar /> */}

      <Introduction />
      <div className="w-[80%] h-[1px] bg-white/30 my-6 mx-auto"></div>

      <About />
      <div className="w-[80%] h-[1px] bg-white/30 my-6 mx-auto"></div>

      {/* <Footer /> */}
      </div>
    </div>
    </div>
  )
}

export default Home
