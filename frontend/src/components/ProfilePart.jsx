import React from 'react';
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import img from '../assets/expense-tracker-app-rgb-color-icon-vector.jpg';
import { useSelector } from 'react-redux';

const ProfilePart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
     
    
  };

  return (
    <div className="flex flex-col items-center gap-2 shadow-md rounded-md p-6 dark:bg-gray-900 dark:text-white">
      <div className="w-12 h-12 rounded-full bg-gray-400 overflow-hidden">
        <img
          src={img}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-sm font-semibold">{user ? user.username : "No user logged in"}</h2>
      <div>
        <button 
          onClick={handleLogout} 
          className="flex bg-gray-200 items-center gap-2 p-2 border rounded-md hover:bg-red-200 dark:bg-purple-900 dark:text-white"
        >
          <FiLogOut size={14} />
          <span className='text-xs'>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePart;
