const Logger = require("../modules/Logger");
const fetch = require("node-fetch");

module.exports = {
  name: "ready",
  execute(bot) {
    Logger.log("bot", "Bot is running!");
    bot.user.setStatus("idle");
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
      bot.user.setActivity(status, { type: "WATCHING" });

    }, 15000);

    setInterval(() => {
      fetch(`https://senko-info.ga/api/roflan/haudi`)
        .then((res) => res.json())
        .then((data) => {
          const text = data.text;

        bot.channels.cache.get('791338847900401674').send(text);
      });
    }, 30000);

    setInterval(() => {
      fetch(`https://senko-info.ga/api/images/meme`)
        .then((res) => res.json())
        .then((data) => {
          const url = data.url;

        bot.channels.cache.get('791338847900401674').send(url);
      });
    }, 900000);
  },
};
