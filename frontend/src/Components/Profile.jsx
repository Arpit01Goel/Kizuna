import React, { useEffect, useState } from 'react'
import {useAuthStore} from "../store/useAuthStore"
function Profile() {
  const {authUser, checkAuth,updateProfile} = useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  const [file,setFile] = useState()
  const handleClick = async () =>{
    const nwUser = {...authUser, profilePic: file? URL.createObjectURL(file): authUser.profilePic}
    updateProfile(nwUser)
    checkAuth()
    setFile("")
  }
  return (
    <div className='flex flex-col justify-start items-start bg-base-100'>
      <div className='flex flex-row items-center justify-around min-h-screen'>
      <input type="file" className="file-input file-input-ghost" value={file} />
            <img src= {authUser.profilePic==""? null: authUser.profilePic} className='min-h-12 border-amber-500 border-2 min-w-12'/>
            <button className="btn btn-soft btn-secondary" onClick={handleClick}>Submit</button>
      </div>
      <div className='flex flex-row'>

      </div>
    </div>
  )
}

export default Profile
