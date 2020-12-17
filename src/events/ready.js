const Logger = require("../modules/Logger");

module.exports = {
  name: "ready",
  execute(bot) {
    const commands = bot.commands.size;
    const servers = bot.guilds.cache.size;
    const users = bot.users.cache.size;
    const statuses = [
      `s)help | ${commands} ⚙️`,
      `s)help | ${servers} 🗃️`,
      `s)help | ${users} 👥`,
    ];

    Logger.log("bot", "Bot is running!");
    bot.user.setStatus("idle");
    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, { type: "WATCHING" });
    }, 10000);
  },
};
