const { connect, connection } = require("mongoose");
const { mongodbUri } = require("../../config.json");
const Logger = require("../modules/Logger");

(async function database() {
  const uri = mongodbUri;

  try {
    await connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Logger.log("database", "Connected to mongoDB!");
  } catch (e) {
    Logger.error("database", e);
  }

  connection.on("disconnected", () => {
    Logger.log("database", "Disconnected from mongoDB!");
  });
})();
