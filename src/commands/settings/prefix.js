const { getGuildById, updateGuildById } = require("../../utils/functions");
const { ownerId } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "prefix",
  category: "settings",
  cooldown: 2,
  memberPermissions: ["MANAGE_GUILD"],
  botPermissions: ["ADD_REACTIONS"],
  async execute(bot, message, args) {
    const prefix = args[0];
    const lang = await bot.getGuildLang(message.guild.id);
    const guild = await getGuildById(message.guild.id);

    if (!prefix) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }
    if (prefix.length > 5) {
      return message.channel.send(lang.OTHER.ARGS_VALUE_MAX
      .replace("{max}", "5")
      .replace("{got}", prefix.length));
    }

    setPrefix(message, prefix);
    message.react("✅");
  },
};

async function setPrefix(message, prefix) {
  await updateGuildById(message.guild.id, { prefix });
}
