import "dotenv/config";
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send("Authorization failed. No access token.");
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    } catch(err) {
        return res.status(403).send("Could not verify token");
    }
};

export default authenticateToken;