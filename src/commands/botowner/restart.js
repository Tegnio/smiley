const Logger = require("../../modules/Logger");

module.exports = {
  name: "restart",
  description: "",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, message, args) => {
    Logger.log("bot", "Restarting...")
    process.exit(1).then(() => {
      process.execSync(`pwd`).toString('utf8');
    });
  },
};
