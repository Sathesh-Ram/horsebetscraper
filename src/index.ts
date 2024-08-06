import express from 'express';
import bodyParser from 'body-parser';
import oddsRouter from './routes/odds';
import { authenticateToken } from './middleware/auth';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/odds', authenticateToken, oddsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
