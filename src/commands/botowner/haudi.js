const BaseEmbed = require("../../modules/BaseEmbed");
const fetch = require("node-fetch");

module.exports = {
  name: "haudi",
  description: "",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, message, args) {
    message.react("✅");
    setInterval(() => {
      fetch('https://senko-info.ga/api/roflan/haudi').then((res) =>
        res.json());
      bot.channels.cache.get('790881502593548328')
      .send(res.text)
    }, 15000);
  },
};
