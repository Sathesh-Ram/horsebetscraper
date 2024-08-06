import puppeteer from 'puppeteer';

// Function to scrape odds from a given event URL
export const scrapeOdds = async (eventUrl: string) => {
    let browser;
    try {
        // Launch Puppeteer browser
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        // Navigate to the event page
        await page.goto(eventUrl, { waitUntil: 'networkidle2' });

        console.log("Page loaded. Inspecting the content...");

        // Wait for the known element to appear on the page
        await page.waitForSelector('.event-legs-list', { timeout: 20000 }).catch((error) => {
            throw new Error('Selector not found: ' + error.message);
        });

        // Extract odds information from the page
        const odds = await page.evaluate(() => {
            const horseOdds: { horse: string; odds: string }[] = [];
            const rows = document.querySelectorAll('.event-legs-list__leg-info');

            rows.forEach(row => {
                const horseName = row.querySelector('[data-testid="title"]')?.textContent?.trim() || '';
                const odd = row.querySelector('[data-testid="themed-label-content"]')?.textContent?.trim() || '';
                if (horseName && odd) {
                    horseOdds.push({ horse: horseName, odds: odd });
                }
            });

            return horseOdds;
        });

        return odds;
    } catch (error) {
        console.error('Error scraping odds:', error);
        throw error;
    } finally {
        // Ensure browser is closed in case of an error
        if (browser) {
            await browser.close();
        }
    }
};
