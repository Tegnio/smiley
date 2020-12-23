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
    Logger.log("db", "Connected to mongoDB!");
  } catch (e) {
    Logger.error("db", e);
  }

  connection.on("disconnected", () => {
    Logger.log("db", "Disconnected from mongoDB!");
  });
  connection.on("reconnected", () => {
    Logger.log("db", "Reconnected to mongoDB!");
  });
})();
