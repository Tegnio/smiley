const {
  removeGuild,
  removeUser,
} = require("../utils/functions");
const Logger = require("../modules/Logger");

module.exports = {
  name: "guildDelete",
  async execute(bot, guild) {
    await removeGuild(guild.id);

    Logger.log("guilds", `Removed guild ${guild.name} (ID: ${guild.id}, ${guild.memberCount} members)`);

    bot.channels.cache.get('786683848830222357')
    .send(`<:minus:786969736755413012> Removed guild **${guild.name}** (ID: **${guild.id}**, **${guild.memberCount}** members)`)

    guild.members.cache.forEach(async (member) => {
      await removeUser(member.id, guild.id);
    });
  },
};
