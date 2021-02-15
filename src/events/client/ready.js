const Logger = require("../../modules/Logger");
const package = require("../../../package.json");

module.exports = {
  name: "ready",
  execute(bot) {
    Logger.log("bot", "Bot is running!");
    bot.user.setActivity(`s)help | v${package.version}`, { type: "LISTENING" });
  },
};
