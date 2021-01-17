const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "goose",
  category: "fun",
  cooldown: 2,
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch("https://nekos.life/api/v2/img/goose").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setTitle(lang.IMAGE.FAILED_TO_LOAD)
      .setURL(data.url)
      .setImage(data.url);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
