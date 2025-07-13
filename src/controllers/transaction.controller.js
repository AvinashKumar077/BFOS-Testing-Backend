import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Transaction } from "../model/transaction.model.js";

const addTransaction = asyncHandler(async (req, res) => {
    const { amount, type, merchant, timestamp } = req.body;

    if (!amount || !type || !merchant || !timestamp) {
        throw new ApiError(400, "All fields are required");
    }
    if (!['debit', 'credit'].includes(type)) {
        throw new ApiError(400, "Type must be either 'debit' or 'credit'");
    }

    const transaction = new Transaction({
        amount,
        type,
        merchant,
        timestamp
    });
    await transaction.save();
    res.status(201).json(new ApiResponse(201, transaction, "Transaction added successfully"));
})

const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find();
    res.status(200).json(new ApiResponse(200, transactions, "Transactions retrieved successfully"));
});

export { addTransaction, getAllTransactions };