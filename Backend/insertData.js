require("dotenv").config();
const mongoose = require("mongoose");

const connectAndInsert = async () => {
  try {
    console.log("Connecting to MongoDB database...");
    await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log("✅ Connected to MongoDB Atlas!");

    const accountSchema = new mongoose.Schema({
      name: String,
      accountNumber: String,
      pin: String,
      balance: Number,
    });

    const Account = mongoose.model("Account", accountSchema);

    // Insert test data
    const result = await Account.insertMany([
      { name: "Test User", accountNumber: "ACC001", pin: "1234", balance: 0 },
      { name: "Alice Wonder", accountNumber: "ACC002", pin: "5678", balance: 0 },
    ]);

    console.log("✅ Data inserted:", result);

    // Retrieve data
    const accounts = await Account.find();
    console.log("\n📊 Data in MongoDB Atlas cluster1:");
    console.table(accounts);

    await mongoose.disconnect();
    console.log("✅ Disconnected");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

connectAndInsert();
