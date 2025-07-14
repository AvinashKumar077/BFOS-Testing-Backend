import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Transaction } from "../model/transaction.model.js";

const addTransaction = asyncHandler(async (req, res) => {
    const transactions = req.body;

    if (!Array.isArray(transactions) || transactions.length === 0) {
        throw new ApiError(400, "A non-empty list of transactions is required");
    }

    const validated = transactions.filter(tx =>
        tx.amount !== undefined &&
        ['debit', 'credit'].includes(tx.type) &&
        typeof tx.merchant === 'string' &&
        typeof tx.timestamp === 'number'
    );

    if (validated.length === 0) {
        throw new ApiError(400, "No valid transactions provided");
    }

    const saved = await Transaction.insertMany(validated);
    res.status(201).json(new ApiResponse(201, saved, `${saved.length} transactions added`));
});


const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find().sort({ timestamp: -1 });
    res.status(200).json(new ApiResponse(200, transactions, "Transactions retrieved successfully"));
});

export { addTransaction, getAllTransactions };