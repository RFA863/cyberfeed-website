import Avatar from "boring-avatars";
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import {useAuth} from "../hooks/useAuth";

function Navbar(){

  const {user, logout} = useAuth();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    };
   
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
     
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef])

  return(
    <div className="sticky top-0  w-full  backdrop-blur-sm flex justify-between items-center px-24 py-6 border-b border-slate-700">
      <Link to="/" className="cursor-pointer">
        <img src="/logo.png" alt="CyberFeed Logo" width={250}/>
      </Link>

      {user ? (
        <div className="relative cursor-pointer" ref={dropdownRef}>
        
          <button 
            onClick={() => setDropDownOpen(!dropDownOpen)}
            className="flex gap-4 items-center cursor-pointer"
          >
            <Avatar name={user.username}/>
            <div className="font-bold hidden md:block">{user.username}</div>
          </button>

         
          {dropDownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1">
              <Link to="/my-post" className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">My Post</Link>
              <button
                onClick={() => {
                  logout();
                  setDropDownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="font-exo2 font-bold bg-[#A855F7] px-6 py-3 rounded-xl cursor-pointer">Sign In</button>
          </Link>
        </div>
      )}
      
    </div>
  )
}

export default Navbar;