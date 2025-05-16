import React, { use } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isLoggedIn, getCurrentUser, logout } from '../auth/loggedIn';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import RoleSelectionModal from './Common/RoleSelectionModal';
import {
  isAstrologerLoggedIn,
  getCurrentAstrologer,
  astrologerLogout,
} from '../auth/AstrologerLoggedIn';



const Navbar = () => {


  // ✅ Modal visibility and action type state
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [actionType, setActionType] = useState(''); // 'login' ya 'signup'
  
  // useLocation hook se current URL path milta hai (e.g. '/', '/chat', etc.)
  const location = useLocation();

  // useNavigate hook se hum programmatically kisi route pe ja sakte hain
  const navigate = useNavigate();


  // ✅ Show modal and set whether it's for login or signup
  const handleOpenModal = (type) => {
    setActionType(type);
    setShowRoleModal(true);
  };
  
  const handleRoleSelect = (role) => {
    setShowRoleModal(false);
    if (actionType === 'login') {
      navigate(`/${role}/login`);
    } else {
      navigate(`/${role}/signup`);
    }
  };
  


  const allowedRoutes = ['/', '/chat', '/login'];

  // [isOpen, setIsOpen] = useState(false);// Dropdown ya mobile menu toggle karne ke liye use ho sakta hai (abhi unused)
  const [login, setLogin] = useState(true);// User login hai ya nahi, isko track karta hai
  const [user, setUser] = useState(undefined);// Logged-in user ka data store karta hai (e.g. email)
  const [astrologer, setAstrologer] = useState(null);


  useEffect(() => {
    const handleStorageChange = () => {
      if (isLoggedIn()) {
        setUser(getCurrentUser());
        setLogin(true);
      } else if (isAstrologerLoggedIn()) {
        setAstrologer(getCurrentAstrologer());
        setLogin(true);
      } else {
        setUser(undefined);
        setAstrologer(undefined);
        setLogin(false);
      }
    };
  
    window.addEventListener("storage", handleStorageChange); // ⭐ Listen for changes in localStorage
  
    // Initial check on component mount
    handleStorageChange();
  
    return () => {
      window.removeEventListener("storage", handleStorageChange); // ❌ Cleanup on unmount
    };
  }, []);
  
  
  
   // Agar current route allowedRoutes me nahi hai to navbar render hi nahi hoga
   if (!allowedRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    if (user) {
      logout(() => {
        setLogin(false);       // ✅ Update login state
        setUser(undefined);    // ✅ Clear user info
        navigate("/");
      });
    } else if (astrologer) {
      astrologerLogout(() => {
        setAstrologer(undefined); // ✅ Clear astrologer info
        setLogin(false);          // ✅ Also update login state
        navigate("/");
      });
    }
  
    toast.success("Logged out successfully");
  };
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 shadow-md backdrop-blur-md">

      {/* Logo Section */}

      <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
        <img
          src="https://www.anilastrologer.com/assets/images/Top-Famous-Astrologer-in-India.webp"
          alt="Astrotalk Logo"
          className="w-12 h-12 rounded-full shadow-sm"
        />
        <h6 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-gray-800">InsightAstro</h6>
      </div>


      {/* Navigation Links */}

      <ul className="hidden md:flex gap-6 text-lg font-bold text-gray-700 hover:[&>li]:text-yellow-600 transition-all duration-300">
        <li>
          <Link to="/chat" className="hover:text-yellow-600 transition duration-200">
            Chat with Astrologer
          </Link>
        </li>
        <li>
          <Link to="/pooja" className="hover:text-yellow-600 transition duration-200">
            Book a Pooja
          </Link>
        </li>
      </ul>



     {/* Buttons */}
     {/* Buttons Section */}
     <div className="flex gap-4 items-center">
        {login && (user || astrologer) ? (
          <>
            <Link to={user ? "/profile" : "/AstroProfile"}>
              {(user?.imageName || astrologer?.imageName) ? (
  <img
    src={`http://localhost:9999/images/${user?.imageName || astrologer?.imageName}`}
    alt="Profile"
    className="w-10 h-10 rounded-full object-cover border-2 border-green-500 shadow"
  />

              ) : (
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full font-semibold shadow text-lg border-2 border-green-500"
                  style={{
                    backgroundColor: 'lightblue',
                    color: 'darkblue',
                  }}
                >
                   {(user?.name || astrologer?.name)?.charAt(0).toUpperCase() ??
                     (user?.email || astrologer?.email)?.charAt(0).toUpperCase()}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
            >
              <FiLogOut size={20} />
              Logout
            </button>
          </>
        ) : (
          <>
            {/* ✅ Login button triggers modal */}
            <button
              onClick={() => handleOpenModal('login')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300"
            >
              Login
            </button>
            {/* ✅ Signup button triggers modal */}
            <button
              onClick={() => handleOpenModal('signup')}
              className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300"
            >
              Signup
            </button>
          </>
        )}
      

      {/* ✅ Role selection modal */}
      {showRoleModal && (
          <div className="absolute top-full mt-2 right-0">
            <RoleSelectionModal
              onSelectRole={handleRoleSelect}
              onClose={() => setShowRoleModal(false)}
              actionType={actionType}
            />
          </div>
      )}
      </div>
    </nav>
  );
};
 

export default Navbar; 