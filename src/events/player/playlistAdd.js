const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "playlistAdd",
  async execute(bot, message, queue, playlist) {
    const lang = await bot.getGuildLang(message.guild.id);

    const embed = BaseEmbed(message)
    .setAuthor(lang.MUSIC.ADDED_TO_QUEUE)
    .setTitle(playlist.title)
    .setURL(playlist.url)
    .setThumbnail(playlist.thumbnail)
    .addField(lang.OTHER.REQUESTED_BY, playlist.requestedBy.tag, true)
    .addField(lang.MUSIC.UPLOADED_BY, playlist.author, true)
    .addField(lang.MUSIC.TRACKS, playlist.tracks.length, true);

    return message.reply(embed);
  }
}
