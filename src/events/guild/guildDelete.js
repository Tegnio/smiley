const {
  removeGuild,
  removeUser,
} = require("../../utils/functions");

module.exports = {
  name: "guildDelete",
  async execute(bot, guild) {
    await removeGuild(guild.id);
    bot.channels.cache.get('786683848830222357')
    .send(`:regional_indicator_r: Removed guild **${guild.name}** (ID: **${guild.id}**)`)

    guild.members.cache.forEach(async (member) => {
      await removeUser(member.id, guild.id);
    });
  },
};
