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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scraper_1 = require("../services/scraper");
const router = (0, express_1.Router)();
// Endpoint to handle POST requests to scrape odds
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventUrl } = req.body;
    if (!eventUrl) {
        // Return 400 if eventUrl is missing
        return res.status(400).json({ error: 'Event URL is required' });
    }
    try {
        // Call the scrapeOdds function with the provided URL
        const odds = yield (0, scraper_1.scrapeOdds)(eventUrl);
        res.json(odds);
    }
    catch (error) {
        // Return 500 if scraping fails
        res.status(500).json({ error: 'Failed to scrape odds' });
    }
}));
exports.default = router;
