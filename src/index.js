import 'dotenv/config'
import connectDB from "./db/db.js";
import { app } from './app.js';

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Error in starting server !!", error)
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => console.error("Mongo DB connection error !!", error))
