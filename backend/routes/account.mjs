import express from "express";
import { Account } from "../database/database.mjs";
import authenticateToken from "../middleware/authMiddleware.mjs";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", authenticateToken, async (req, res) => {
    /* req.userId is grabbed from token */
    const account = await Account.findOne({ userId: req.userId });
    res.json({ balance: account.balance });
})


/* ======================== TRANSFER ======================== */
router.post("/transfer", authenticateToken, async (req, res) => {
    /* start transaction session */
    const session = await mongoose.startSession();

    session.startTransaction();
    const { senderAmount, recipientId } = req.body;

    /* Fetch from "Account" within transaction */
    const senderAccount = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (senderAccount.balance < senderAmount) {
        /* Abort the transaction process */
        await session.abortTransaction();
        return res.json("Insufficient balance");
    }

    const recipientAccount = await Account.findOne({
        userId: recipientId
    }).session(session);

    if (!recipientAccount) {
        await session.abortTransaction();
        return res.status(401).json({ msg: "Invalid account" });
    }

    /* Perform the transfer within session */
    /* Decrease the amount from sender */
    await Account.updateOne({ userId: req.userId }, {
        $inc: { balance: -senderAmount }
    }).session(session);

    /* Increase the amount of recepient */
    await Account.updateOne({ userId: recipientId }, {
        $inc: { balance: senderAmount }
    }).session(session);


    /* Commit the transaction */
    await session.commitTransaction();
    res.status(200).json({ msg: "Transfer successfully" });
})

export default router;