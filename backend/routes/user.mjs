import express from "express";
import zod from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { Account, User } from "../database/database.mjs"
import authenticateToken from "../middleware/authMiddleware.mjs";

const router = express.Router();

/* ======================= SIGNUP ROUTE ======================= */
const SignupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    firstname: zod.string().min(2),
    lastname: zod.string().min(2)
}).strict();

router.post("/signup", async (req, res) => {
    const { success } = SignupSchema.safeParse(req.body);
    if (!success) {
        return res.status(401).json({ msg: "Incorrect inputs" });
    }

    const { email, password, firstname, lastname } = req.body;

    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.status(401).json({ msg: "Email is already in use" });
    }

    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const user = await User.create({ email, password: hash, firstname, lastname });
            const userId = user._id;

            /* Give the user a random balance between 500 to 10000,
            since we don’t have integration with banks ;-) */
            const user_balance = await Account.create({
                userId: userId,
                balance: Math.floor((Math.random() * 9500) + 500)
            });

            const token = jwt.sign({ userId }, process.env.JWT_SECRET);
            
            return res.status(201).json({
                msg: "User created successfully", 
                token: token,
                balance: user_balance.balance
            })
        });
    });
});


/* ======================= SIGNIN ROUTE ======================= */
const SigninSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
}).strict();

router.post("/signin", async (req, res) => {
    const { success } = SigninSchema.safeParse(req.body);
    if (!success) {
        return res.status(401).json({ msg: "Incorrect inputs" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ msg: "Invalid credential" });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
        if (!result) {
            return res.status(401).json({ msg: "Invalid credential" });
        }

        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET);

        return res.status(200).json({
            msg: "Logged in Successfully",
            token: token
        });
    });
});


/* ======================= UPDATE ROUTE ======================= */
const updateSchema = zod.object({
    password: zod.string().min(8).optional(),
    firstname: zod.string().min(2).optional(),
    lastname: zod.string().min(2).optional()
}).strict();

router.put("/", authenticateToken, async (req, res) => {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(401).json({ msg: "Incorrect inputs" });
    }

    await User.updateOne({ _id: req.userId }, {
        $set: {
            /* If password is updated hash it again */
            password: bcrypt.hashSync(req.body.password, 10),
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
    });

    res.json("Updated successfully")
})

/* ===== Search user via firstName/lastName on query_param ====== */
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{ firstname: { "$regex": filter } }, { lastname: { "$regex": filter } }]
    })

    res.status(200).json({
        user: users.map(user => ({
            firstname: user.firstname,
            lastname: user.lastname,
            id: user._id
        }))
    })
})

export default router;