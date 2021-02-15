const Logger = require("../../modules/Logger");
const { debug } = require("../../../config.json")

module.exports = {
  name: "debug",
  execute(bot, debug) {
    if(debug) {
      Logger.log("debug", debug)
    }
  },
};
