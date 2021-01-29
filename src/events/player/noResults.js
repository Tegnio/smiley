module.exports = {
  name: "noResults",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    message.channel.send(lang.MUSIC.NO_RESULTS);
  }
}
