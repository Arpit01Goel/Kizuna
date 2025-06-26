import React from "react";
import { FiAlignLeft } from "react-icons/fi";
import {Link} from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore";
const Navbar = () => {
  const {logout} = useAuthStore()
  const [showMenu, setShowMenu] = React.useState(false);
//   alert(showMenu)
  return (
    <div className="top-0 text-white sticky z-50">
      <div className="hidden lg:flex flex-col">
      <ul className="hidden lg:flex flex-row justify-between ml-[40%] mr-[10%] py-3.5 font-bold text-2xl  ">
        <li className=""><Link to="/Home" className="hover:underline">Home</Link></li>
        <li className=""><Link to="/About" className="hover:underline">About</Link></li>
        <li className=""><Link to="/Chat" className="hover:underline">Chat</Link></li>
        <li className=""><Link to="/Review" className="hover:underline">Review</Link></li>
        <li className=""><Link to="/Contact" className="hover:underline">Contact</Link></li>
        <li className=""><Link to="/login" className="hover:underline" onClick={logout}>Logout</Link></li>
      </ul>
        <div className="w-[80%] h-[1px] bg-white/30  mx-auto"></div>

      </div>

      <div className="lg:hidden p-3.5 ">
        <FiAlignLeft
          size={40}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        />
      </div>
      {showMenu
        ? (<div className="" >
      
      <ul className="lg:hidden flex flex-col w-full text-center h-screen text-3xl gap-8 list-none "onClick={async () =>{
        setShowMenu(false)
      }}>
      <li className="hover:bg-gray-800 hover:opacity-50 py-4"><Link to="/Home" className="hover:underline">Home</Link></li>
        <li className="hover:bg-gray-800 hover:opacity-50 py-4"><Link to="/About" className="hover:underline">About</Link></li>
        <li className="hover:bg-gray-800 hover:opacity-50 py-4"><Link to="/Chat" className="hover:underline">Chat</Link></li>
        <li className="hover:bg-gray-800 hover:opacity-50 py-4"><Link to="/Review" className="hover:underline">Review</Link></li>
        <li className="hover:bg-gray-800 hover:opacity-50 py-4"><Link to="/Contact" className="hover:underline">Contact</Link></li>
        <li className="hover:bg-gray-800 hover:opacity-50 py-4"><Link to="/login" className="hover:underline" onClick={logout}>Logout</Link></li>
      </ul>
      </div> )
        : null}
      

    </div>
  );
};

export default Navbar;
