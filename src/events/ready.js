const Logger = require("../modules/Logger");

module.exports = {
  name: "ready",
  execute(bot) {
    let apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4MTE3OTgxMDcwMDk4NDMzMCIsImlhdCI6MTYwODExNzk1OH0.f2x7yuT0uEHZWRiTa31kX2zcfOx4OjC2LwvoDIy0gYw";
    const SDC = require("sdc-api");
    const sdc = new SDC(apiKey);
    const commands = bot.commands.size;
    const statuses = [
      `s)help | ${commands} ⚙️`,
    ];

    Logger.log("bot", "Bot is running!");
    bot.user.setStatus("idle");
    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, { type: "WATCHING" });
      sdc.setAutoPost(bot);
    }, 10000);
  },
};
