const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "gonewild",
  description: "",
  category: "nsfw",
  cooldown: 5,
  nsfwOnly: true,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    message.channel.startTyping();
    const data = await fetch(
      "https://nekobot.xyz/api/image?type=gonewild"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data.message)
    .setImage(data.message);

    message.channel.stopTyping(true)
    .then(() => message.channel.send(embed));
  },
};
