const { addGuild } = require("../utils/functions");

module.exports = {
  name: "guildCreate",
  async execute(bot, guild) {
    await addGuild(guild.id);
    const humans = guild.members.cache.filter((mem) => !mem.user.bot).size;
    const bots = guild.members.cache.filter((mem) => mem.user.bot).size;

    bot.channels.cache.get('786683848830222357')
    .send(`:regional_indicator_a: Added guild **${guild.name}** (ID: **${guild.id}**)`);

    if(humans < 10 || bots > humans) {
      return guild.leave();
    };
  },
};
