const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "notstonks",
  category: "fun",
  aliases: ["nst"],
  cooldown: 2,
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png" });
    const url = `https://vacefron.nl/api/stonks?user=${image}&notstonks=true`;

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(url)
    .setImage(url);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
