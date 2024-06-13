const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const dbConfig = require("./config/dbConfig.cjs");
app.use(express.json());
app.use(cors());
const userRoute = require("./routes/userRouter.cjs");
const adminRoute = require("./routes/doctorRouter.cjs")
const doctorRoute = require("./routes/doctorRouter.cjs");
const path = require("path");

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);


const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
