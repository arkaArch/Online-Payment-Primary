import express from "express";
import userRoute from "./user.mjs";
import accountRoute from "./account.mjs"

const router = express.Router();

router.use("/user", userRoute);
router.use("/account", accountRoute);

export default router;