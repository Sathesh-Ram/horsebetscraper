"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const odds_1 = __importDefault(require("../routes/odds"));
const auth_1 = require("../middleware/auth");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/odds', auth_1.authenticateToken, odds_1.default);
// Generate a token for testing
const token = (0, auth_1.generateToken)('testuser');
// Set a timeout for Jest tests
jest.setTimeout(30000); // Set timeout to 30 seconds for all tests in this file
// Test case to check if odds are scraped successfully
test('POST /odds should return scraped odds', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post('/odds')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventUrl: process.env.EVENT_URL });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((odd) => {
        expect(odd).toHaveProperty('horse');
        expect(odd).toHaveProperty('odds');
    });
}), 30000);
// Test case to check if missing eventUrl returns 400
test('POST /odds should return 400 if eventUrl is missing', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post('/odds')
        .set('Authorization', `Bearer ${token}`)
        .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Event URL is required');
}), 30000);
// Test case to check if missing token returns 401
test('POST /odds should return 401 if no token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post('/odds')
        .send({ eventUrl: process.env.EVENT_URL });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'No token provided');
}), 30000);
// Test case to check if invalid token returns 403
test('POST /odds should return 403 if token is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app)
        .post('/odds')
        .set('Authorization', `Bearer invalid_token`)
        .send({ eventUrl: process.env.EVENT_URL });
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Failed to authenticate token');
}), 30000);
