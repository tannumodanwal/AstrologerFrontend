import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { sign } from './useSignupDataFetching';
import { toast } from 'react-toastify';
import { Input, FormFeedback } from 'reactstrap';
import { doLogin } from '../../auth/loggedIn'; // Import doLogin function
import { getCurrentUser } from '../../auth/loggedIn'; // Import getCurrentUser function
import { logout } from '../../auth/loggedIn'; // Import logout function
import { isLoggedIn } from '../../auth/loggedIn'; // Import isLoggedIn function

import {Navigate} from 'react-router'
 
const UserRegistration = () => {
   
  const navigate = useNavigate();
  
  
  const [data, setData] = useState({
    name: "", 
    age: "", 
    email: "",
    password: "",
    dateOfBirth: "",
    timeOfBirth: "",
    contactNumber: "",
    place: "",
    gender: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  

  useEffect(() => {
    console.log("Data changed:", data);
  },[data])

  //handle change function
  const handleChange = (event, property) => {
    //dynamic property assignment
    setData({
      ...data,
      [property]: event.target.value,
    });
  };
  
  //reset data function
  const resetData = () => {
    setData({
      name: "",
      age: "",
      email: "",
      password: "",
      dateOfBirth: "",
      timeOfBirth: "",
      contactNumber: "",
      place: "",
      gender: "",
    });
    
  };

  //submit form function

  const submitForm = (event) => {
    event.preventDefault(); // Form submit hone par page reload na ho
  
    if (error.isError) {
    //  toast.error("Please fill all the fields correctly!!");
      setError({ ...error, isError: false }); // Reset error state
      return;
    }
  
    console.log("Form submitted:", data);
  
    // Server API call
    sign(data)
      .then((response) => {
        console.log(response);
        //toast.success("User registered successfully !! user id ");
  
         //  for auto-login 
        doLogin(response, () => {
          navigate("/"); // ya jahan chahte ho
        });

        // Form reset karna chahti ho to
        setData({
          name: "",
          age: "",
          email: "",
          password: "",
          dateOfBirth: "",
          timeOfBirth: "",
          contactNumber: "",
          place: "",
          gender: "",
        });
  
        // Clear any previous errors if submission is successful
        setError({
          errors: {},
          isError: false,
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
  
        // Agar server ne specific error diya hai to toast dikhayein
        if (error.response && error.response.data && error.response.data.message) {
          toast.error("Registration failed: " + error.response.data.message);
         } 
        setError({
          errors: error.response?.data || {}, // Optional chaining for safety
          isError: true,
        });
      });
  };
  

  return (

    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-screen-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Registration</h2>

          <form className="space-y-4 " onSubmit={submitForm}>
            <div className="grid grid-cols-2 gap-4">
              {/*Name Field*/}
             <div >
               <label className="block text-sm font-medium text-gray-700">Full Name</label>
               <Input
                 name="name"
                 type="text"
                 placeholder="Enter Full Name"
                 onChange={(e) => handleChange(e, 'name')}
                 value={data.name}
                 invalid={error.errors?.name ? true : false}  
                 className={`mt-1 w-full rounded-md p-2 border ${error.errors?.name ? 'border-red-500' : 'border-gray-300'}`}
               />
               <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.name}</FormFeedback>
              </div>
              {/*Age Field*/}
              <div >
                <label className="block text-sm font-medium text-gray-700">age</label>
                <Input
                  name="age"
                  type="text"
                  placeholder="age"
                  onChange={(e) => handleChange(e,'age')}
                  value={data.age}
                  invalid={error.errors?.age ? true : false}  
                  className={`mt-1 w-full rounded-md p-2 border ${error.errors?.age ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.age}</FormFeedback> 
              </div>
            </div>  
            <div className="grid grid-cols-2 gap-4">
              {/*email Field*/}     
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                 type="email"
                 placeholder="Enter Email"
                 id='email'
                 onChange={(e) => handleChange(e,'email')}
                 value={data.email}
                 invalid={error.errors?.email ? true : false}  
                 className={`mt-1 w-full rounded-md p-2 border ${error.errors?.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.email}</FormFeedback>
              </div>
              {/*Password Field*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  id='password'
                  onChange={(e) => handleChange(e,'password')}
                  value={data.password}
                  invalid={error.errors?.password ? true : false}  
                  className={`mt-1 w-full rounded-md p-2 border ${error.errors?.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.password}</FormFeedback>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Date of Birth Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Input
                 type="date"
                 placeholder="yyyy-mm-dd"
                 onChange={(e) => handleChange(e, 'dateOfBirth')}
                 value={data.dateOfBirth}
                 invalid={error.errors?.dateOfBirth ? true : false}  
                 className={`mt-1 w-full rounded-md p-2 border ${error.errors?.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.dateOfBirth}</FormFeedback>
              </div>
              {/*Time of Birth Field*/} 
              <div>
                <label className="block text-sm font-medium text-gray-700">Time of Birth</label>
                <Input
                 type="time"
                 step="1" 
                 placeholder="hh:mm:ss"
                 onChange={(e) => handleChange(e, 'timeOfBirth')}
                 value={data.timeOfBirth}
                 invalid={error.errors?.timeOfBirth ? true : false}  
                 className={`mt-1 w-full rounded-md p-2 border ${error.errors?.timeOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.timeOfBirth}</FormFeedback>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/*Contact Number Field*/}

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <Input
                  type="tel"
                  placeholder="Contact Number"
                  id='contactNumber'
                  onChange={(e) => handleChange(e,'contactNumber')}
                  value={data.contactNumber}
                  invalid={error.errors?.contactNumber ? true : false}  
                  className={`mt-1 w-full rounded-md p-2 border ${error.errors?.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.contactNumber}</FormFeedback>
              </div>
              {/*Place Field*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">Place</label>
                <Input
                  type="text"
                  placeholder="Enter Place"
                  id='place'
                  onChange={(e) => handleChange(e,'place')}
                  value={data.place}
                  invalid={error.errors?.place ? true : false}  
                  className={`mt-1 w-full rounded-md p-2 border ${error.errors?.place ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.place}</FormFeedback>
              </div>
            </div>

          {/*Gender Field*/}

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <Input
              type="select"
              onChange={(e) => handleChange(e, 'gender')}
              value={data.gender}
              invalid={error.errors?.gender ? true : false}
              className={`mt-1 w-full border rounded-md p-2 ${error.errors?.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            </Input>
            <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.gender}</FormFeedback>

          </div>

          {/*Button field*/}

          <div className="flex justify-between mt-6">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Register
            </button>
            <button onClick={resetData} type="reset" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
              Reset
            </button>
          </div>
        </form> 
        {/*Login Link*/}
        <div className="mt-2 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration; 
 