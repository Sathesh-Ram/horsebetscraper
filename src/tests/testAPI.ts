import axios, { AxiosResponse, AxiosError } from 'axios';
import { generateToken } from '../middleware/auth';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const eventUrl = process.env.EVENT_URL as string;
const token = generateToken('testuser');

// Function to test the API endpoint
axios.post('http://localhost:3000/odds', { eventUrl }, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then((response: AxiosResponse) => {
    console.log('API response:', response.data);
})
.catch((error: AxiosError) => {
    console.error('Error calling API:', error.response ? error.response.data : error.message);
});
