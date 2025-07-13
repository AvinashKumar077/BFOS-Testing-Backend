import express from "express"
import cors from "cors"
import transactionRouter from "./routes/transaction.route.js";
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use("/api/transactions", transactionRouter);

export { app }