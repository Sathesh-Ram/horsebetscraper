import request, { Response } from 'supertest';
import express from 'express';
import oddsRouter from '../routes/odds';
import { authenticateToken, generateToken } from '../middleware/auth';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use('/odds', authenticateToken, oddsRouter);

// Generate a token for testing
const token = generateToken('testuser');

// Set a timeout for Jest tests
jest.setTimeout(30000); // Set timeout to 30 seconds for all tests in this file

// Test case to check if odds are scraped successfully
test('POST /odds should return scraped odds', async () => {
    const response: Response = await request(app)
        .post('/odds')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventUrl: process.env.EVENT_URL });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((odd: { horse: string; odds: string }) => {
        expect(odd).toHaveProperty('horse');
        expect(odd).toHaveProperty('odds');
    });
}, 30000);

// Test case to check if missing eventUrl returns 400
test('POST /odds should return 400 if eventUrl is missing', async () => {
    const response: Response = await request(app)
        .post('/odds')
        .set('Authorization', `Bearer ${token}`)
        .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Event URL is required');
}, 30000);

// Test case to check if missing token returns 401
test('POST /odds should return 401 if no token is provided', async () => {
    const response: Response = await request(app)
        .post('/odds')
        .send({ eventUrl: process.env.EVENT_URL });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'No token provided');
}, 30000);

// Test case to check if invalid token returns 403
test('POST /odds should return 403 if token is invalid', async () => {
    const response: Response = await request(app)
        .post('/odds')
        .set('Authorization', `Bearer invalid_token`)
        .send({ eventUrl: process.env.EVENT_URL });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Failed to authenticate token');
}, 30000);
