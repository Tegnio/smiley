const { addGuild } = require("../../utils/functions");

module.exports = {
  name: "guildCreate",
  async execute(bot, guild) {
    await addGuild(guild.id);

    bot.channels.cache.get('786683848830222357')
    .send(`:regional_indicator_a: Added guild **${guild.name}** (ID: **${guild.id}**)`);

    // if(guild.members.cache.size < 5) {
    //  return guild.leave();
    // };
  },
};
