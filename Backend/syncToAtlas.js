const mongoose = require("mongoose");
const fs = require("fs");

const syncToAtlas = async () => {
  try {
    console.log("🔄 Syncing local data to MongoDB Atlas...");

    // Connect to local MongoDB
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("✅ Connected to local MongoDB");

    const schema = new mongoose.Schema({
      name: String,
      accountNumber: String,
      pin: String,
      balance: Number,
    });

    const Account = mongoose.model("Account", schema);

    // Get all local data
    const localData = await Account.find();
    console.log(`📊 Found ${localData.length} documents locally`);

    // Export to JSON
    fs.writeFileSync(
      "./accounts_export.json",
      JSON.stringify(localData, null, 2)
    );
    console.log("✅ Exported to accounts_export.json");

    console.log("\n📝 Next: Import this file to MongoDB Atlas using Compass");
    console.log("File location: ./accounts_export.json");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

syncToAtlas();
