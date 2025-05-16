import { astroAxios } from "../../service/api"; // Correct import path to 'api.js'


// --------------------- Astrologer APIs ---------------------

// Register Astrologer
export const registerAstrologer = (astrologerData) => {
  return astroAxios
    .post('/authastro/register', astrologerData)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Registration failed:", err);
      throw err;
    });
};

// Login Astrologer
export const loginAstrologer = (loginData) => {
  return astroAxios
    .post('/authastro/login', loginData)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Login failed:", err);
      throw err;
    });
};

// Get All Astrologers
export const getAllAstrologers = () => {
  return astroAxios
    .get('/astrologers')
    .then((res) => res.data)
    .catch((err) => {
      console.error("Fetching all astrologers failed:", err);
      throw err;
    });
};

// Get Astrologer by ID
export const getAstrologerById = (astrologerId) => {
  return astroAxios
    .get(`/astrologers/${astrologerId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Fetching astrologer by ID failed:", err);
      throw err;
    });
};

// Update Astrologer by ID
export const updateAstrologer = (astrologerId, updatedData) => {
  return astroAxios
    .put(`/astrologers/${astrologerId}`, updatedData)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Updating astrologer failed:", err);
      throw err;
    });
};

// Delete Astrologer by ID
export const deleteAstrologer = (astrologerId) => {
  return astroAxios
    .delete(`/astrologers/${astrologerId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Deleting astrologer failed:", err);
      throw err;
    });
};


