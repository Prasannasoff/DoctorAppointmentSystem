const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // Ensure this line is present
const dbConfig = require("./config/dbConfig.cjs"); // Assuming this file correctly sets up your MongoDB connection
app.use(express.json());
app.use(cors());
const userRoute = require("./routes/userRouter.cjs");
const doctorRoute = require("./routes/doctorRouter.cjs");
const path = require("path");

app.use("/api/user", userRoute);

app.use("/api/doctor", doctorRoute);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
