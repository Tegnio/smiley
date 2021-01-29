const Logger = require("../../modules/Logger");
const package = require("../../../package.json");
const fetch = require("node-fetch");
const { beta, boticordApiKey } = require("../../../config.json");

module.exports = {
  name: "ready",
  execute(bot) {
    Logger.log("bot", "Bot is running!");
    bot.user.setActivity(`s)help | v${package.version}`, { status: 'idle', type: "LISTENING" });

    if (beta === false) {
      setInterval(() => {
        fetch("https://boticord.top/api/stats", {
          method: 'POST',
          headers: {
            'Authorization': boticordApiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            servers: bot.guilds.cache.size,
            shards: bot.ws.totalShards,
            users: bot.users.cache.size
          })
      }).then(data => Logger.log("boticord", data));
        bot.sdc.updateStat(bot.user.id, {
          servers: bot.guilds.cache.size,
          shards: bot.ws.totalShards
          }).then((data) => { Logger.log("SDC", data);
        });
      }, 1800000);
    };
  },
};
