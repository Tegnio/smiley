const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
    name: "trackStart",
    async execute(bot, message, track) {
      const lang = await bot.getGuildLang(message.guild.id);

      const embed = BaseEmbed(message)
      .setAuthor(lang.MUSIC.STARTED_PLAYING)
      .setTitle(track.title)
      .setURL(track.url)
      .setThumbnail(track.thumbnail)
      .addField(lang.MUSIC.UPLOADED_BY, track.author, true)
      .addField(lang.MUSIC.DURATION, track.duration, true);


      return message.channel.send(embed);
    },
  };
  