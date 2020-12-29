const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "wave",
  description: "",
  category: "fun",
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png" });
    let amount = args[1] || Math.floor(Math.random() * 9 + 1);
    if (member.user.id === message.author.id) {
      amount = args[0] || Math.floor(Math.random() * 9 + 1);
    }
    if (amount > 10) {
      return message.channel.send(lang.GLOBAL.LONG_ARGS
      .replace("{length}", amount.length)
      .replace("{limit}", "10"))
    }
    const data = `https://useless-api--vierofernando.repl.co/wave?image=${image}&amount=${amount}`;

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data)
    .setImage(data);

    message.channel.startTyping()
    .then(() => message.channel.send(embed))
    .then(() => message.channel.stopTyping(true));
  },
};
