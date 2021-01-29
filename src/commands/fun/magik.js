const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "magik",
  category: "fun",
  aliases: ["magic"],
  cooldown: 2,
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png" });
    let intensity = args[1] || Math.floor(Math.random() * 10);
    if (member.user.id === message.author.id) {
      intensity = args[0] || Math.floor(Math.random() * 10);
    };
    if (isNaN(intensity)) {
      return message.channel.send(lang.OTHER.MUST_BE_A_NUMBER.replace("{args}", intensity));
    };
    if (intensity <= 0) {
      return message.channel.send(lang.OTHER.MUST_BE_A_NATURAL_NUMBER.replace("{args}", intensity));
    };
    if (intensity > 10) {
      return message.channel.send(lang.OTHER.ARGS_VALUE_MAX
        .replace("{max}", "10")
        .replace("{got}", intensity));
    };
    message.channel.startTyping();
    const data = await fetch(`https://nekobot.xyz/api/imagegen?type=magik&image=${image}&intensity=${intensity}`)
      .then((res) => res.json());

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data.message)
    .setImage(data.message);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
