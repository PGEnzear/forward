"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const configPathEnv = node_path_1.default.join(__dirname, "..", ".env");
dotenv_1.default.config({ path: configPathEnv });
const config = {
    SHOW_CONFIG: ((_a = process.env.SHOW_CONFIG) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == "true",
    TELEGRAM: {
        ADMIN_ID: parseInt(process.env.ADMIN_ID || "0", 0) || 0,
        MONITOR_CHAT: parseInt(process.env.MONITOR_CHAT || "0", 0) || 0,
        TOKEN: process.env.BOT_TOKEN || "invalid",
    },
};
exports.default = config;
