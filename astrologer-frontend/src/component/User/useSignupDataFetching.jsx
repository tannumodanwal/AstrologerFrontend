import { myAxios } from "../../service/api";


// Function to fetch user data from the backend(sign up)
export const sign = (user) => {
  return myAxios
    .post('/auth/register', user)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error); // log error (optional)
      throw error; //rethrow the error
    });

}; 


// Function to fetch user data from the backend (login)
export const loginUser = (loginDetail) => {
  return myAxios
    .post('/auth/login', loginDetail)
    .then((response) => response.data)
    .catch((error) => { 
      console.log(error); // log error (optional)
      throw error; //rethrow the error
    });
 
}; 
// Function to fetch user data from the backend (get user profile)
export const updateProfile = (userId, userData) => {
  return myAxios
    .put(`/users/${userId}`, userData)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
// user ka data delete krne ke liye
export const deleteUser = (userId) => {
  return myAxios
    .delete(`/users/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error); 
      throw error;
    });
};



// Upload user profile image
// export const uploadUserImage = (userId, imageFile) => {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   return myAxios
//     .post(`/users/${userId}/upload-image`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Image upload failed:", error);
//       throw error;
//     });
// };
