const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
    name: "trackAdd",
    async execute(bot, message, queue, track, i) {
      const lang = await bot.getGuildLang(message.guild.id);

      const embed = BaseEmbed(message)
      .setAuthor(lang.MUSIC.ADDED_TO_QUEUE)
      .setTitle(track.title)
      .setURL(track.url)
      .setThumbnail(track.thumbnail)
      .addField(lang.OTHER.REQUESTED_BY, track.requestedBy.tag, true)
      .addField(lang.MUSIC.UPLOADED_BY, track.author, true)
      .addField(lang.MUSIC.DURATION, track.duration, true);


      return message.reply(embed);
    },
  };
