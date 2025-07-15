import { app } from './app.js';
import serverless from 'serverless-http';
import connectDB from './db/db.js';
import 'dotenv/config.js';

// Track DB connection status (to avoid reconnecting every request)
let isConnected = false;

const handler = async (req, res) => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }

    return serverless(app)(req, res);
};

export default handler;
