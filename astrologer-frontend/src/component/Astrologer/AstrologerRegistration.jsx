import React, { useState, useEffect } from 'react';
import { Input, FormFeedback } from 'reactstrap';
import { toast } from 'react-toastify';
import { registerAstrologer } from "./useConnetFile";

import { useNavigate } from 'react-router-dom';


const AstrologerRegistration = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    knowledge: "", // Fixed typo: knowladge -> knowledge
    experience: "",
    contactNumber: "",
    language:"",
    price: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  useEffect(() => {
    console.log("Data changed:", data);
  }, [data]);

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      knowledge: "",
      experience: "",
      contactNumber: "",
      language:"",
      price: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (error.isError) {
      setError({ ...error, isError: false });
      return;
    }

    console.log("Form submitted:", data);

    // Server API call
    registerAstrologer(data)
      .then((response) => {
        console.log(response);
        toast.success("Astrologer registered successfully!");
        navigate("/"); // Redirect to home or dashboard after successful registration

        // Reset form
        setData({
          name: "",
          email: "",
          password: "",
          knowledge: "",
          experience: "",
          contactNumber: "",
          language:"",
          price: "",
        });

        setError({
          errors: {},
          isError: false,
        });
      })
      .catch((error) => {
        console.log(error);

        if (error.response && error.response.data && error.response.data.message) {
          toast.error("Registration failed: " + error.response.data.message);
        }
        setError({
          errors: error.response?.data || {},
          isError: true,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-screen-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Astrologer Registration</h2>

        <form className="space-y-4" onSubmit={submitForm}>
          <div className="grid grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
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
         
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => handleChange(e, 'email')}
                value={data.email}
                invalid={error.errors?.email ? true : false}
                className={`mt-1 w-full rounded-md p-2 border ${error.errors?.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.email}</FormFeedback>
            </div>
          </div>
            {/* Password Field */}
          <div className="grid grid-cols-2 gap-4">            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => handleChange(e, 'password')}
                value={data.password}
                invalid={error.errors?.password ? true : false}
                className={`mt-1 w-full rounded-md p-2 border ${error.errors?.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.password}</FormFeedback>
            </div>
          

          {/* Expertise Field */}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Knowladge</label>
            <Input
              name="knowledge"
              type="text"
              placeholder="Enter knowledge"
              onChange={(e) => handleChange(e, 'knowledge')}
              value={data.knowledge}
              invalid={error.errors?.knowledge ? true : false}
              className={`mt-1 w-full rounded-md p-2 border ${error.errors?.knowledge ? 'border-red-500' : 'border-gray-300'}`}
            />
            <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.knowledge}</FormFeedback>
          </div>
        </div>
          {/* Experience Field */}
          <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience (in years)</label>
            <Input
              name="experience"
              type="text"
              placeholder="Enter Experience in Years"
              onChange={(e) => handleChange(e, 'experience')}
              value={data.experience}
              invalid={error.errors?.experience ? true : false}
              className={`mt-1 w-full rounded-md p-2 border ${error.errors?.experience ? 'border-red-500' : 'border-gray-300'}`}
            />
            <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.experience}</FormFeedback>
          </div>

         
            {/* Contact Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <Input
                name="contactNumber"
                type="tel"
                placeholder="Enter Contact Number"
                onChange={(e) => handleChange(e, 'contactNumber')}
                value={data.contactNumber}
                invalid={error.errors?.contactNumber ? true : false}
                className={`mt-1 w-full rounded-md p-2 border ${error.errors?.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.contactNumber}</FormFeedback>
            </div>
          </div>
            {/* language Field */}
          <div className="grid grid-cols-2 gap-4">

              <div>
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <Input
                name="language"
                type="text"
                placeholder="Enter language"
                onChange={(e) => handleChange(e, 'language')}
                value={data.language}
                invalid={error.errors?.language ? true : false}
                className={`mt-1 w-full rounded-md p-2 border ${error.errors?.language ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.language}</FormFeedback>
            </div>

             {/* Price Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <Input
                name="price"
                type="text"
                placeholder="Enter price"
                onChange={(e) => handleChange(e, 'price')}
                value={data.place}
                invalid={error.errors?.price ? true : false}
                className={`mt-1 w-full rounded-md p-2 border ${error.errors?.price ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FormFeedback className="text-red-700 font-bold text-xs text-left">{error.errors?.price}</FormFeedback>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-6">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Register
            </button>
            <button type="reset" onClick={resetData} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
              Reset
            </button>
          </div>
        </form>

        {/* Login Link */}
        {/* <div className="mt-2 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/astrologer/login" className="text-blue-500 hover:underline">Login</Link>
        </div> */}
      </div>
    </div>
  );
};

export default AstrologerRegistration;
