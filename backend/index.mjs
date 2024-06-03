import express from "express";
import cors from "cors";
import mainRoute from "./routes/root.mjs";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRoute);

app.listen(3000, () => {
    console.log("App is listening at port 3000");
})