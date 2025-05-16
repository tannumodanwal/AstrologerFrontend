import React, { useEffect, useState } from "react";
import { updateProfile } from './useSignupDataFetching';
import {deleteUser } from './useSignupDataFetching';
import { useNavigate } from 'react-router-dom';
import {Navigate} from 'react-router'
import { Input} from 'reactstrap';


const UserProfileInfo = () => { 

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [profileImage, setProfileImage] = useState(null); // state to hold image file
  const [previewUrl, setPreviewUrl] = useState(null);     // preview image URL


  useEffect(() => {
    const storedDataString = localStorage.getItem('data');
    if (storedDataString) {
      try {
        const storedData = JSON.parse(storedDataString);
        if (storedData && storedData.user) {
          setUser(storedData.user);
          setUserId(storedData.user.id);
          if (storedData.user.profileImage) {
            setPreviewUrl(storedData.user.profileImage); // image from localStorage
          }
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }, []);
  
  // Handle image input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  
  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const userData = {
      name: event.target.name.value,
      age: event.target.age.value,
      email: event.target.email.value,
      dateOfBirth: event.target.dateOfBirth.value, 
      timeOfBirth: event.target.timeOfBirth.value,
      contactNumber: event.target.contactNumber.value,
      place: event.target.place.value,
      gender: event.target.gender.value,
    };
  
    updateProfile(userId, userData)
      .then(async (response) => {
        // ✅ Upload image if selected
        if (profileImage) {
          const formData = new FormData();
          formData.append("image", profileImage);
  
          try {
            const res = await fetch(`http://localhost:9999/api/users/${userId}/upload-image`, {
              method: "POST",
              body: formData,
            });
            const data = await res.json();
            
            response.profileImage = data.imageUrl || previewUrl; // if backend returns image URL
          } catch (uploadError) {
            console.error("Image upload failed:", uploadError);
            response.profileImage = previewUrl; // fallback to preview
          }
        } else {
          response.profileImage = previewUrl;
        }
  
        const updatedUser = { ...response };
  
        // ✅ LocalStorage update
        const storedDataString = localStorage.getItem("data");
        if (storedDataString) {
          const storedData = JSON.parse(storedDataString);
          storedData.user = updatedUser;
          localStorage.setItem("data", JSON.stringify(storedData));
          window.dispatchEvent(new Event("storage"));
        }
  
        setUser(updatedUser);
        navigate("/");
      })
      .catch((error) => {
        console.error("Profile update failed:", error);
      });
  };
  

  

  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(userId);
        localStorage.removeItem('data'); // localStorage se bhi hata do
        alert("Account deleted successfully!");
        window.location.href = '/'; // ya login page ya homepage bhej do
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert("Failed to delete account!");
      }
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-xl">Loading user info...</div>
      </div>
    );
  }

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h2>

        {/* Profile Image Upload and Preview */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-green-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-full font-bold shadow text-3xl border-2 border-green-500 bg-blue-100 text-black">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <label htmlFor="profileImageInput" className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow cursor-pointer">
              {/* Replace this with your actual upload icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </label>
          </div>

          {/* Hidden input file */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="profileImageInput"
            className="absolute top-0 left-0 w-24 h-24 opacity-0 pointer-events-none"
          />
        </div>


        
        <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
    {/*Name Field*/}
    <div >
  <label className="block text-sm font-medium text-gray-700"></label>
  <Input
    name="name"
    type="text"
    defaultValue={user?.name || ''}
    className='mt-1 w-full border rounded-md p-2'
  />

  </div>

{/*Age Field*/}
<div >
  <label className="block text-sm font-medium text-gray-700"></label>
  <Input
    name="age"
    type="text"
    defaultValue={user?.age || ''}
    className='mt-1 w-full border rounded-md p-2'
  />
  </div>
</div>


<div className="grid grid-cols-2 gap-4">
  {/*email Field*/}

<div>
  <label className="block text-sm font-medium text-gray-700"></label>
  <Input
    type="email"
    name="email"
    defaultValue={user?.email || ''}
    className='mt-1 w-full border rounded-md p-2'
    />
        
</div>
 {/* Date of Birth Field */}

<div>
  <label className="block text-sm font-medium text-gray-700"></label>
  <Input
    type="date"
    name="dateOfBirth"
    defaultValue={user?.dateOfBirth || ''}
    className='mt-1 w-full border rounded-md p-2'
  />
 </div>
</div>
<div className="grid grid-cols-2 gap-4">

{/*Time of Birth Field*/} 

<div>
  <label className="block text-sm font-medium text-gray-700"></label>
  <Input
    type="time"
    name="timeOfBirth"
    step="1" 
    defaultValue={user?.timeOfBirth || ''}
    className='mt-1 w-full border rounded-md p-2'
  />
  </div>

{/*Contact Number Field*/}

<div>
  <label className="block text-sm font-medium text-gray-700"></label>
  <Input
    type="tel"
    name="contactNumber"
    defaultValue={user?.contactNumber || ''}
    className='mt-1 w-full border rounded-md p-2'
  />
  </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
{/*Place Field*/}

<div>
  <label className="block text-sm font-medium text-gray-700"></label>
  <Input
    type="text"
    name="place"
    defaultValue={user?.place || ''}
    className='mt-1 w-full border rounded-md p-2'
  />
  </div>
{/*Gender Field*/}

<div>
  <label className="block text-sm font-medium text-gray-700"></label>
  <Input
    type="select"
      name="gender"
    defaultValue={user?.gender || ''}
    className='mt-1 w-full border rounded-md p-2'
  >
  <option value="">-- Select Gender --</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
  </Input>
 
</div>
</div>


          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </form>
        <button
           type="button"
           onClick={handleDeleteUser}
           className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition mt-2"
        >
          Delete Account
        </button>

      </div>
    </div>
  );
};

export default UserProfileInfo;
