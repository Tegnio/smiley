require("./utils/database");
const { Collection, Client } = require("discord.js");
const config = require("../config.json");
const { Player } = require("discord-player");
const SDC = require("sdc-api-wrapper");
const fetch = require("node-fetch");
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
  isHex,
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
  isHex,
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
bot.sdc = new SDC(config.sdcApiKey);
bot.player = new Player(bot, {
  autoSelfDeaf: true,
  leaveOnEnd: true,
  leaveOnEndCooldown: 60000,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 60000,
  leaveOnStop: true,
});

require("moment-duration-format");
require("./modules/command")(bot);
require("./modules/events")(bot);

bot.login(config.token);

// Unhandled errors
process.on("unhandledRejection", (error) => sendErrorLog(bot, error, "error"));

process.on("uncaughtExceptionMonitor", (error) => sendErrorLog(bot, error, "error"));

process.on("warning", (warning) => sendErrorLog(bot, warning, "warning"));
