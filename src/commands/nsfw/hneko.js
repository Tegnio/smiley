const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "hneko",
  category: "nsfw",
  aliases: ["hn"],
  cooldown: 5,
  nsfwOnly: true,
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch(
      "https://nekobot.xyz/api/image?type=hneko"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data.message)
    .setImage(data.message);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
