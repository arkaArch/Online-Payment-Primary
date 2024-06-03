import { Schema, connect, model } from "mongoose";
import "dotenv/config";

try {
    connect(process.env.MONGODB_URI)
    console.log("Connected to database successfully");
} catch (e) {
    console.log("Database connection error: " + e);
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 8,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    firstname: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 30
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 30
    }
});

const AccountSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true
    }
    /* In the real world, you shouldn’t store `floats` for balances in the database.
    You usually store an integer which represents the INR value with decimal places. 
    (for eg, if someone has 33.33 rs in their account, you store 3333 in the database).

    There is a certain precision that you need to support (which for india is
    2 or 4 decimal places) and this allows you to get rid of precision
    errors by storing integers in your DB */
})

const User = model("user", UserSchema);
const Account = model("account", AccountSchema);

export { User, Account };