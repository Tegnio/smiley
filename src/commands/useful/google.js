const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "google",
  description: "",
  category: "useful",
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const query = encodeURIComponent(args.join(" "));
    const url = `https://lmgtfy.app/?q=${query}`;
    const wait_msg = await message.channel.send(lang.OTHER.PROCESSING);

    const embed = BaseEmbed(message)
    .setAuthor(lang.OTHER.GOOGLE_SEARCH, `https://i.imgur.com/Ek1Qm3w.png`)
    .setTitle(decodeURIComponent(query))
    .setURL(url);

    setTimeout(() => {
      message.channel.send(embed);
      wait_msg.delete();
    }, 100);
  },
};