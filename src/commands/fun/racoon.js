const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "racoon",
  description: "",
  category: "fun",
  cooldown: 2,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const wait_msg = await message.channel.send(lang.OTHER.PROCESSING);
    const data = await fetch("https://some-random-api.ml/img/racoon").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setTitle(lang.IMAGE.FAILED_TO_LOAD)
      .setURL(data.link)
      .setImage(data.link);

    setTimeout(() => {
      message.channel.send(embed);
      wait_msg.delete();
    }, 100);
  },
};
