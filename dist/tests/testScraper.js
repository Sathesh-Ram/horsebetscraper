"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("../services/scraper");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const eventUrl = process.env.EVENT_URL;
// Function to test the scraper directly
(0, scraper_1.scrapeOdds)(eventUrl).then(odds => {
    console.log('Scraped odds:', odds);
}).catch(error => {
    console.error('Error scraping odds:', error);
});
