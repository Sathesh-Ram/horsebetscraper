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
const scraper_1 = require("../services/scraper");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Set a timeout for Jest tests
jest.setTimeout(30000); // Set timeout to 30 seconds
// Test case to check if odds are scraped successfully
test('scrapeOdds should return odds for a given event URL', () => __awaiter(void 0, void 0, void 0, function* () {
    const eventUrl = process.env.EVENT_URL;
    const odds = yield (0, scraper_1.scrapeOdds)(eventUrl);
    expect(Array.isArray(odds)).toBe(true);
    odds.forEach(odd => {
        expect(odd).toHaveProperty('horse');
        expect(odd).toHaveProperty('odds');
    });
}));
