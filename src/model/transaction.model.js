import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['debit', 'credit'],
        required: true
    },
    merchant: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
});

export const Transaction = mongoose.model("Transaction", transactionSchema)