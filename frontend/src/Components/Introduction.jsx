import React from 'react'

const Introduction = () => {
  return (
    <div className='w-full h-auto flex flex-col md:flex-row md:px-24 py-8 justify-between items-center text-white text-5xl'>
      <div className='md:w-1/2 p-8'>
      Oh my, are you lost? How cute... Shall I show you the way?
      </div>
      <div className='md:w-1/2 flex items-center p-8'>
      <img src="/assets/_.jpeg" className='w-full' />
      </div>
    </div>
  )
}

export default Introduction
