import { adminAxios } from "../../service/api"; // Correct import path to 'api.js'


export const loginAdmin = (loginDetail) => {
  return adminAxios
    .post('/authAdmin/login', loginDetail)
    .then((response) => response.data)
    .catch((error) => { 
      console.log(error); // log error (optional)
      throw error; //rethrow the error
    });
 
}; 
// Function to fetch user data from the backend (get user profile)
export const updateAdmin = (id, userData) => {
  return adminAxios
    .put(`/admin/${id}`, userData)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
