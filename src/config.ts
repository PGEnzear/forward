import dotenv from "dotenv";

import path from "node:path";

const configPathEnv = path.join(__dirname, "..",".env");

dotenv.config({ path: configPathEnv });

const config = {

    SHOW_CONFIG: process.env.SHOW_CONFIG?.toLowerCase() == "true",

    TELEGRAM: {
        ADMIN_ID: parseInt(process.env.ADMIN_ID || "0", 0) || 0,
        MONITOR_CHAT: parseInt(process.env.MONITOR_CHAT || "0", 0) || 0,
        TOKEN: process.env.BOT_TOKEN || "invalid",
    },

};

export default config;