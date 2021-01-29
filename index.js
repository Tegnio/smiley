const { ShardingManager } = require('discord.js');
const Logger = require("./src/modules/Logger");
const config = require("./config.json");
const manager = new ShardingManager('./src/bot.js', {
  token: config.token,
  respawn: true
});

manager.on('shardCreate', shard => Logger.log("shards", `Spawned shard ${shard.id}`));
manager.spawn();
