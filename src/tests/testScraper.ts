import { scrapeOdds } from '../services/scraper';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const eventUrl = process.env.EVENT_URL as string;

// Function to test the scraper directly
scrapeOdds(eventUrl).then(odds => {
    console.log('Scraped odds:', odds);
}).catch(error => {
    console.error('Error scraping odds:', error);
});
