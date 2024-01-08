import axios from 'axios';

// Base URL for your API
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Create an axios instance with common configurations
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;