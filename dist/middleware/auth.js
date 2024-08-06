"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Secret key for JWT
const secret = process.env.JWT_SECRET || 'default_secret';
// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        // Return 401 if no token is provided
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Verify the token
        const user = jsonwebtoken_1.default.verify(token, secret);
        // Attach user to request object
        req.user = user;
        next();
    }
    catch (error) {
        // Return 403 if token verification fails
        res.status(403).json({ message: 'Failed to authenticate token' });
    }
};
exports.authenticateToken = authenticateToken;
// Function to generate JWT token
const generateToken = (username) => {
    return jsonwebtoken_1.default.sign({ username }, secret, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
