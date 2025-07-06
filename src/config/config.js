// ========================================================================

// This file loads the TypeScript config file by registering ts-node
// Sequelize CLI can only read JavaScript files, so this acts as a bridge
// to allow using config.ts seamlessly during CLI commands

// ========================================================================

require("ts-node/register");
module.exports = require("./config.ts"); // let Sequelize CLI use the TypeScript config file
