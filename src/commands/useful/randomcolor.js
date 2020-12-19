const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "randomcolor",
  description: "",
  category: "useful",
  cooldown: 2,
  aliases: ["rcolor", "rclr"],
  execute(bot, message) {
    const color = Math.floor(Math.random()*16777215).toString(16);
    const url = `https://api.no-api-key.com/api/v2/color?hex=${color}`;

    const embed = BaseEmbed(message)
      .setColor(`#${color}`)
      .setThumbnail(url)
      .setTitle(`#${color}`);

    message.channel.send(embed);
  },
};
