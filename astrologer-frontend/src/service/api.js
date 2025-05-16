import axios from 'axios';
export const baseURL = 'http://localhost:9999/api';
export const myAxios = axios.create({
    baseURL: baseURL,
});

// Create a separate Axios instance for astrologer-related API requests
export const astroAxios = axios.create({
    baseURL: baseURL,
});

export const adminAxios = axios.create({
    baseURL: baseURL,
});


