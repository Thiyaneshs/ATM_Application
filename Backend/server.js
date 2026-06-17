const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors({
    origin: "https://atm-application-7y7n.vercel.app/",
}));

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message,
  });
});
app.use("/api/atm", require("./routes/atmroutes"));

// Direct connection to MongoDB Atlas enabled via MONGO_URI in .env

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running");
});
