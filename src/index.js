require("./utils/database");
const { Collection, Client } = require("discord.js");
const { token, sdcApiKey } = require("../config.json");
const { GiveawaysManager } = require("discord-giveaways");
const SDC = require("@megavasiliy007/sdc-api");
const {
  sendErrorLog,
  formatDate,
  toCapitalize,
  getUserById,
  addGuild,
  addUser,
  removeUser,
  updateUserById,
  getGuildById,
  updateGuildById,
  removeGuild,
  findMember,
  getLanguages,
  formatNumber,
  getGuildLang,
} = require("./utils/functions");
const bot = new Client({
  disableMentions: "everyone",
  partials: ["GUILD_MEMBER", "MESSAGE", "USER"],
});

[
  sendErrorLog,
  formatDate,
  toCapitalize,
  getUserById,
  addGuild,
  addUser,
  removeUser,
  updateUserById,
  getGuildById,
  updateGuildById,
  removeGuild,
  findMember,
  getLanguages,
  formatNumber,
  getGuildLang,
].forEach((func) => {
  bot[func.name] = func;
});

// Locale - Language
bot.getGuildLang = getGuildLang;

// Commands
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.findMember = findMember;
bot.sdc = new SDC(sdcApiKey);

require("moment-duration-format");
require("./modules/command")(bot);
require("./modules/events")(bot);

bot.login(token);

// Unhandled errors
process.on("unhandledRejection", (error) => sendErrorLog(bot, error, "error"));

process.on("uncaughtExceptionMonitor", (error) => sendErrorLog(bot, error, "error"));

process.on("warning", (warning) => sendErrorLog(bot, warning, "warning"));
