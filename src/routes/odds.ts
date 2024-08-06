import { Router } from 'express';
import { scrapeOdds } from '../services/scraper';

const router = Router();

// Endpoint to handle POST requests to scrape odds
router.post('/', async (req, res) => {
    const { eventUrl } = req.body;
    if (!eventUrl) {
        // Return 400 if eventUrl is missing
        return res.status(400).json({ error: 'Event URL is required' });
    }

    try {
        // Call the scrapeOdds function with the provided URL
        const odds = await scrapeOdds(eventUrl);
        res.json(odds);
    } catch (error) {
        // Return 500 if scraping fails
        res.status(500).json({ error: 'Failed to scrape odds' });
    }
});

export default router;
