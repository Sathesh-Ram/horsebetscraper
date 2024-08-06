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
exports.scrapeOdds = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
// Function to scrape odds from a given event URL
const scrapeOdds = (eventUrl) => __awaiter(void 0, void 0, void 0, function* () {
    let browser;
    try {
        // Launch Puppeteer browser
        browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        // Navigate to the event page
        yield page.goto(eventUrl, { waitUntil: 'networkidle2' });
        console.log("Page loaded. Inspecting the content...");
        // Wait for the known element to appear on the page
        yield page.waitForSelector('.event-legs-list', { timeout: 20000 }).catch((error) => {
            throw new Error('Selector not found: ' + error.message);
        });
        // Extract odds information from the page
        const odds = yield page.evaluate(() => {
            const horseOdds = [];
            const rows = document.querySelectorAll('.event-legs-list__leg-info');
            rows.forEach(row => {
                var _a, _b, _c, _d;
                const horseName = ((_b = (_a = row.querySelector('[data-testid="title"]')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
                const odd = ((_d = (_c = row.querySelector('[data-testid="themed-label-content"]')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '';
                if (horseName && odd) {
                    horseOdds.push({ horse: horseName, odds: odd });
                }
            });
            return horseOdds;
        });
        return odds;
    }
    catch (error) {
        console.error('Error scraping odds:', error);
        throw error;
    }
    finally {
        // Ensure browser is closed in case of an error
        if (browser) {
            yield browser.close();
        }
    }
});
exports.scrapeOdds = scrapeOdds;
