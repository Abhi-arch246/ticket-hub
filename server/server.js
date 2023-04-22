const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConnect = require("./dbconnect/dbConnect");
const userRoute = require("./routes/userRoute");
app.use(express.json());

app.use("/api/users", userRoute);

app.listen(port, () => console.log(`Server running on ${port}`));
