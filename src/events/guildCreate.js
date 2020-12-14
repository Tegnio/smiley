const { addGuild } = require("../utils/functions");
const Logger = require("../modules/Logger");

module.exports = {
  name: "guildCreate",
  async execute(bot, guild) {
    await addGuild(guild.id);
    Logger.log("guilds", `Added guild ${guild.name} (ID: ${guild.id}, ${guild.memberCount} members)`);

    bot.channels.cache.get('786683848830222357')
    .send(`<:plus:786969737899802634> Added guild **${guild.name}** (ID: **${guild.id}**, **${guild.memberCount}** members)`)
  },
};
