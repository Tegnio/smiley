const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "stonks",
  description: "Allows you to get a stonks image with somebody's (or yours) avatar",
  category: "fun",
  aliases: ["st"],
  cooldown: 2,
  usage: "stonks [user]",
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png" });
    const wait_msg = await message.channel.send(lang.OTHER.PROCESSING);
    const url = `https://vacefron.nl/api/stonks?user=${image}`;

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(url)
    .setImage(url);

    message.channel.send(embed);
    wait_msg.delete;

  },
};
