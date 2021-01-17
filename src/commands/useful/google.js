const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "google",
  description: "",
  category: "useful",
  aliases: ["lmgtfy"],
  cooldown: 5,
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const query = encodeURIComponent(args.join(" "));
    const url = `https://lmgtfy.app/?q=${query}`;

    if (!query) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }
    if(query.length > 256) {
      return message.channel.send(lang.GLOBAL.LONG_ARGS
        .replace("{length}", query.length)
        .replace("{limit}", "256"));
    }

    message.channel.startTyping();
    const embed = BaseEmbed(message)
    .setAuthor(lang.OTHER.GOOGLE_SEARCH, `https://i.imgur.com/Ek1Qm3w.png`)
    .setTitle(decodeURIComponent(query))
    .setURL(url);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
