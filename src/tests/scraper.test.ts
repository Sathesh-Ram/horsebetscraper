import { scrapeOdds } from '../services/scraper';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set a timeout for Jest tests
jest.setTimeout(30000); // Set timeout to 30 seconds

// Test case to check if odds are scraped successfully
test('scrapeOdds should return odds for a given event URL', async () => {
    const eventUrl = process.env.EVENT_URL as string;
    const odds: { horse: string, odds: string }[] = await scrapeOdds(eventUrl);
    expect(Array.isArray(odds)).toBe(true);
    odds.forEach(odd => {
        expect(odd).toHaveProperty('horse');
        expect(odd).toHaveProperty('odds');
    });
});
