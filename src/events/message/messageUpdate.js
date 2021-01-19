const { MessageEmbed } = require("discord.js");
const { getGuildById } = require("../../utils/functions");
module.exports = {
  name: "messageUpdate",
  async execute(bot, oldMsg, newMsg) {
    if (!newMsg.guild) return;
  },
};
