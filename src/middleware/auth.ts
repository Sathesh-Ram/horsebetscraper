import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Secret key for JWT
const secret = process.env.JWT_SECRET || 'default_secret';

// Extend the Request interface to include a user property
interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

// Middleware to authenticate JWT token
export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        // Return 401 if no token is provided
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const user = jwt.verify(token, secret) as JwtPayload;
        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        // Return 403 if token verification fails
        res.status(403).json({ message: 'Failed to authenticate token' });
    }
};

// Function to generate JWT token
export const generateToken = (username: string) => {
    return jwt.sign({ username }, secret, { expiresIn: '1h' });
};
