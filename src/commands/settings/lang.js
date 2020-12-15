const { updateGuildById, getGuildById } = require("../../utils/functions");
const fs = require("fs");

const languages = fs
  .readdirSync("./src/locales/")
  .filter((f) => f.endsWith(".js"))
  .map((la) => la.slice(0, -3));

module.exports = {
  name: "lang",
  description: "",
  category: "settings",
  cooldown: 10,
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guildId = message.guild.id;
    const language = args[0];

if (!language) {
  return message.channel.send(lang.LANG.PROVIDE_LANG);
}
if(language === 'list') {
  return message.channel.send(
    `${lang.LANG.LIST} ${languages
      .map((l) => `\`${l}\``)
      .join(", ")}`
  );
}
if (!languages.includes(language)) {
  return message.channel.send(
    `${lang.LANG.NOT_AVAILABLE} ${languages
      .map((l) => `\`${l}\``)
      .join(", ")}`
  );
}
  updateItem("locale", language, guildId);
  const wait_msg = await message.channel.send(lang.OTHER.PROCESSING)
  setTimeout(() => {
    message.channel.send(lang.LANG.UPDATED.replace("{language}", language));
    wait_msg.delete();
  }, 100);

async function updateItem(type, item, guildId) {
  await updateGuildById(guildId, {
    [type]: item,
      });
    }
  }
}
