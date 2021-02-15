module.exports = {
  name: "guildDelete",
  async execute(bot, guild) {
    await bot.removeGuild(guild.id);

    guild.members.cache.forEach(async (member) => {
      await bot.removeUser(member.id, guild.id);
    });
  },
};
