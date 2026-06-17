require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");

const importToAtlas = async () => {
  try {
    console.log("📤 Importing data to MongoDB...");

    // Connect to MongoDB Atlas
    await mongoose.connect(
      process.env.MONGO_URI,
      { serverSelectionTimeoutMS: 5000 }
    );
    console.log("✅ Connected to MongoDB Atlas cluster1!");

    const schema = new mongoose.Schema({
      name: String,
      accountNumber: String,
      pin: String,
      balance: Number,
    });

    const Account = mongoose.model("Account", schema);

    // Clear existing data
    await Account.deleteMany({});
    console.log("🧹 Cleared existing documents");

    // Read exported data
    const data = JSON.parse(fs.readFileSync("./accounts_export.json", "utf8"));

    // Remove MongoDB internal fields
    const cleanData = data.map(({ _id, __v, ...rest }) => rest);

    // Insert data
    const result = await Account.insertMany(cleanData);
    console.log(`✅ Imported ${result.length} documents to MongoDB Atlas!`);

    // Verify
    const allDocs = await Account.find();
    console.log("\n📊 Data now in MongoDB Atlas cluster1:");
    console.table(allDocs);

    await mongoose.disconnect();
    console.log("\n✅ Done! Check MongoDB Atlas cluster1 → test → accounts");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

importToAtlas();
