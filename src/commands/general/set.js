const { updateGuildById, getGuildById } = require("../../utils/functions");

module.exports = {
  name: "set",
  description: "",
  category: "general",
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const languages = bot.getLanguages();
    const guildId = message.guild.id;
    const { prefix } = await getGuildById(guildId);
    const option = args[0];
    const item = message.mentions.channels.first() || message.mentions.roles.first();
    const language = args[1];

    if (!option) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    switch (option.toLowerCase()) {
      case "language": {
        if (!language) {
          return message.channel.send(lang.LANG.PROVIDE_LANG);
        } else if(language === 'list') {
            return message.channel.send(
            `${lang.LANG.LIST} ${languages
            .map((l) => `\`${l}\``)
            .join(", ")}`
          );
        } else if(!languages.includes(language)) {
          return message.channel.send(
        `${lang.LANG.NOT_AVAILABLE} ${languages
          .map((l) => `\`${l}\``)
          .join(", ")}`
          );
        } else updateItem("locale", language, guildId);
        message.react("✅")
        break;
      }
      default:
        return message.channel.send(`\`${option}\` is not a option!`);
    }
  },
};

async function updateItem(type, item, guildId) {
  await updateGuildById(guildId, {
    [type]: item,
  });
}
