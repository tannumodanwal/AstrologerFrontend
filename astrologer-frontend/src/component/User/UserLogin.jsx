import React from 'react';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { loginUser } from './useSignupDataFetching';
import { useState } from 'react';
import {Navigate} from 'react-router'
import { useNavigate } from 'react-router';
import { isLoggedIn } from '../../auth/loggedIn'; 
import { doLogin } from '../../auth/loggedIn';
import { getCurrentUser } from '../../auth/loggedIn'; 
import { useEffect } from 'react';
import { logout } from '../../auth/loggedIn';
import { Input } from 'reactstrap';


const UserLogin = () => {

  
  const navigate = useNavigate();


 
  const [loginDetail, setLoginDetail] = useState({
      email: "",
      password: "",
  });

    //  Error state for backend errors (NEW ADDITION)
    const [error, setError] = useState({
      errors: {},
      isError: false
    });
  
 
  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail, 
      [field]: actualValue 
    });
  }



  const handleReset = () => {
    setLoginDetail({
      email: "",
      password: "",
    });
    setError({ errors: {}, isError: false }); // reset errors also on reset
  }

  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Login Details:", loginDetail);
  
    //login api call
     loginUser(loginDetail)
      .then((response) => {
        console.log("Login successful:",response);
       
        // Save login and navigate to home
        doLogin(response, () => {
            navigate("/");
        });

      })
      .catch((error) => {
        if (error.response && error.response.data) {
            const serverErrors = error.response.data;
            let emailError = serverErrors.email ? serverErrors.email.join(' ') : '';
            let passwordError = serverErrors.password ? serverErrors.password.join(' ') : '';
            let serverMessage = '';
    
            if (!serverErrors.email && !serverErrors.password) {
                serverMessage = serverErrors.message || "The email address you entered is not registered!!. Please sign up first.";
            }
    
            setError({
                errors: {
                    email: emailError,
                    password: passwordError,
                    serverMessage: serverMessage,
                },
                isError: true,
            });
        }
    });
    
      
      
      
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Login</h2>

        {/* ✅ Server error message box */}
        {error.isError && error.errors?.serverMessage && (
          <div className="bg-red-200 text-red-800 border border-red-500 p-3 rounded mb-4 text-center font-bold">
            {error.errors.serverMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleFormSubmit}>

          {/*Email Field*/}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              id="email"
              value={loginDetail.email}
              onChange={(e) => handleChange(e, 'email')}
              placeholder="Enter Email"
              className={`w-full p-2 border rounded ${
                error.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {error.errors.email && (
              <p className="text-red-700 font-bold text-xs text-left">{error.errors.email}</p>
            )}
          </div> 

           {/*Password Field*/}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              id="password"
              value={loginDetail.password}
              onChange={(e) => handleChange(e, 'password')}
              placeholder="Enter Password"
              className={`w-full p-2 border rounded ${
                error.errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
             {error.errors.password && (
               <p className="text-red-700 font-bold text-xs text-left">{error.errors.password}</p>
              )}
          </div> 
 
          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Login
            </button>
            <button onClick={handleReset} type="reset" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
              Reset 
            </button>
          </div>
          
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
        </div>

        <div className="mt-2 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
