import { Router } from "express";
import { addTransaction, getAllTransactions } from "../controllers/transaction.controller.js";

const router = Router();

router.post("/a", addTransaction);
router.get("/g", getAllTransactions);

export default router;
