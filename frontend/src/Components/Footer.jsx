import React from "react";
import {useAuthStore} from "../store/useAuthStore"
function Footer() {
  const authUser = useAuthStore((state) => state.authUser); // Access the logged-in user

  return (

    <div>
      <div className="flex flex-row flex-wrap justify-around p-16 text-lg ">
        <div className="max-w-1/6">
          <img src="/assets/DS_icon.jpeg" className="w-1/2" />
          
        </div>

        <div className="">
          <h3 className="text-2xl my-4">Navigation</h3>
          <ul>
            <li>Home</li>
            <li>Pages</li>
            <li>About Us</li>
            <li>Services</li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-2xl my-4">Quick Links</h3>
          <ul>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Booking</li>
            <li>Pages</li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-2xl my-4">Services</h3>
          <ul>
            <li>Home</li>
            <li>Contact</li>
            <li>Blog</li>
            <li>404</li>
          </ul>
        </div>
      </div>
      {/* Display logged-in user information */}
      {authUser && (
        <div className="text-center mt-8">
          <h3 className="text-xl font-bold">Logged in as:</h3>
          <p>{authUser.username}</p>
          <p>{authUser.email}</p>
        </div>
      )}
    </div>
  );
}

export default Footer;
