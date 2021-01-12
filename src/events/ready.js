const Logger = require("../modules/Logger");
const fetch = require("node-fetch");
const {
  sdcApiKey,
  boticordApiKey
} = require("../../config.json");

module.exports = {
  name: "ready",
  execute(bot) {
    Logger.log("bot", "Bot is running!");
    bot.user.setStatus("idle");
    bot.sdc.setAutoPost(bot);
    setInterval(() => {
      const commands = bot.commands.size;
      const servers = bot.guilds.cache.size;
      const users = bot.users.cache.size;
      const statuses = [
        `s)help | ${commands} ⚙️`,
        `s)help | ${servers} 🗃️`,
        `s)help | ${users} 👥`,
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, { type: "LISTENING" });
    }, 30000);
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
    }).then(r => r.json()).then(console.info);
    }, 1800000);
  },
};
