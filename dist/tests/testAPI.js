"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("../middleware/auth");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const eventUrl = process.env.EVENT_URL;
const token = (0, auth_1.generateToken)('testuser');
// Function to test the API endpoint
axios_1.default.post('http://localhost:3000/odds', { eventUrl }, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then((response) => {
    console.log('API response:', response.data);
})
    .catch((error) => {
    console.error('Error calling API:', error.response ? error.response.data : error.message);
});
