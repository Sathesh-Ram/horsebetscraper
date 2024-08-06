# Horse Racing Bets Scraper

## Description
This project is a Node.js application that scrapes horse racing odds from a bookmaker site using Puppeteer and exposes a RESTful API to retrieve the scraped odds. The API is secured with JWT-based authentication.

## Features
- Scrape horse racing odds using Puppeteer.
- Expose a RESTful API to retrieve scraped odds.
- Secure the API with JWT authentication.

## Technologies Used
- Node.js
- Express
- TypeScript
- Puppeteer
- JWT (jsonwebtoken)
- Jest (for testing)
- Supertest (for API testing)

## Prerequisites
- Node.js
- npm or yarn

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sathesh-Ram/horsebetscraper.git
   cd horsebet-scraper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a .env file:**
   ```bash
   JWT_SECRET=your_secret_key
   EVENT_URL=https://www.paddypower.com/horse-racing?tab=today
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Run the project:**
   ```bash
   npm start
   ```

## Usage

### Generating a Token
You can generate a token using the generateToken function in the auth.ts file. For testing purposes, you can use the testAPI.ts script.

### Scrape Odds API
- **Endpoint**: POST /odds
- **Headers**:
- **Authorization**: Bearer <your_jwt_token>
- **Request Body**: `{ "eventUrl": "https://www.paddypower.com/horse-racing?tab=today" }`

### Example Request
You can use the testAPI.ts script to test the API:
   ```bash
   ts-node src/tests/testAPI.ts
   ```

### Testing
To run the tests, use the following command:
   ```bash
   npm test
   ```

### Assumptions
- **URL**: The structure of the bookmaker site is consistent and does not change frequently.
- **Method**: The JWT secret is hard-coded for simplicity.

### Known Issues
- **URL**: The script may break if the bookmaker site changes its structure.
- **Method**: Running Puppeteer in headless mode may result in different behavior; adjust settings as needed.