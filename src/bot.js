require("./utils/database");
const { Collection, Client } = require("discord.js");
const config = require("../config.json");
const { Player } = require("discord-player");
const { functions } = require("./utils/functions");
const bot = new Client({
  disableMentions: "all",
  partials: ["GUILD_MEMBER", "MESSAGE", "USER"],
});

functions.forEach((func) => {
  bot[func.name] = func;
});

// Commands
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
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
process.on("unhandledRejection", (error) => bot.sendErrorLog(bot, error, "error"));

process.on("uncaughtExceptionMonitor", (error) => bot.sendErrorLog(bot, error, "error"));

process.on("warning", (warning) => bot.sendErrorLog(bot, warning, "warning"));
