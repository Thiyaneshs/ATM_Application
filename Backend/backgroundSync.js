require("dotenv").config();
const mongoose = require("mongoose");

let atlasConnected = false;

// Connect to Atlas in background
const connectAtlas = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      { serverSelectionTimeoutMS: 3000 }
    );
    atlasConnected = true;
    console.log("✅ Atlas background sync: Connected!");
  } catch (error) {
    atlasConnected = false;
    console.log("⏳ Atlas sync: Not connected (will retry)");
  }
};

// Auto-sync function
const autoSyncToAtlas = async () => {
  if (!atlasConnected) {
    await connectAtlas();
  }

  if (atlasConnected) {
    try {
      const localDb = mongoose.connections[0];
      const atlasDb = mongoose.connections[1] || null;

      if (!atlasDb) return;

      // Get local data
      const localAccounts = await localDb.collection("accounts").find({}).toArray();

      if (localAccounts.length > 0) {
        // Sync to Atlas
        const atlasCollection = atlasDb.collection("accounts");
        
        for (const account of localAccounts) {
          await atlasCollection.updateOne(
            { accountNumber: account.accountNumber },
            { $set: account },
            { upsert: true }
          );
        }

        console.log(`✅ Synced ${localAccounts.length} documents to Atlas`);
      }
    } catch (error) {
      console.log("⚠️ Sync error:", error.message);
      atlasConnected = false;
    }
  }
};

// Start auto-sync every 10 seconds
setInterval(autoSyncToAtlas, 10000);

module.exports = { autoSyncToAtlas };
