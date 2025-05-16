import React from 'react';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { loginAdmin } from './useConnectFileUrl';
import { useState } from 'react';
import {Navigate} from 'react-router'
import { useNavigate } from 'react-router';
import { isAdminLoggedIn } from '../../auth/AdminLoggedIn'; 
import { doAdminLogin } from '../../auth/AdminLoggedIn';
import { getCurrentAdmin } from '../../auth/AdminLoggedIn'; 
import { useEffect } from 'react';
import { Adminlogout } from '../../auth/AdminLoggedIn';
import { Input } from 'reactstrap';


const AdminLogin = () => {

  
  const navigate = useNavigate();

    const [loginDetail, setLoginDetail] = useState({
        email: "",
        password: "",
    });

    // Error state for backend errors
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
        loginAdmin(loginDetail)
            .then((response) => {
                console.log("Login successful:", response);
                // Save login and navigate to home (assuming you have a doLogin function)
                 doAdminLogin(response, () => {
                //     navigate("/AdminDashboard");
                //toast.success("Login successful!");
                navigate("/AdminDashboard"); // Directly navigate after successful login
                 });
                // toast.success("Login successful!");
                // navigate("/AdminDashboard"); // Directly navigate after successful login
            })
            .catch((error) => {
              console.log("Login failed:", error);
              if (error.response) {
                 // console.log("Error response data:", error.response.data);
                  let errorMessage = "";
                  if (typeof error.response.data === 'string') {
                      errorMessage = error.response.data;
                  } else if (error.response.data && error.response.data.message) {
                      errorMessage = error.response.data.message;
                  } else if (error.response.data && error.response.data.errors) {
                      // Handle validation errors (email, password fields)
                      let emailError = error.response.data.errors.email ? error.response.data.errors.email.join(' ') : '';
                      let passwordError = error.response.data.errors.password ? error.response.data.errors.password.join(' ') : '';
                      errorMessage = emailError || passwordError || "Login failed. Please check your input.";
                  } else {
                      errorMessage = "Login failed. Please check your credentials.";
                  }
                  setError({
                      errors: { serverMessage: errorMessage },
                      isError: true
                  });
              } else {
                  setError({
                      errors: { serverMessage: "Could not connect to the server." },
                      isError: true
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
                            <p className="text-red-700 font-bold text-xs text-left">{error.errors.email.join(' ')}</p>
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
                            <p className="text-red-700 font-bold text-xs text-left">{error.errors.password.join(' ')}</p>
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

                
            </div>
        </div>
    );
};
export default AdminLogin;
