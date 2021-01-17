const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "wave",
  category: "fun",
  cooldown: 2,
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png" });
    let amount = args[1] || Math.floor(Math.random() * 9 + 1);
    if (member.user.id === message.author.id) {
      amount = args[0] || Math.floor(Math.random() * 9 + 1);
    }
    const data = `https://useless-api--vierofernando.repl.co/wave?image=${image}&amount=${amount}`;

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data)
    .setImage(data);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
