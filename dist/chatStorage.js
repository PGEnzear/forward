"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatStorage = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
class ChatStorage {
    constructor() {
        this.configPath = node_path_1.default.join(__dirname, "..", "storage", "storage.json");
    }
    getChats() {
        const data = node_fs_1.default.readFileSync(this.configPath).toString();
        const parsed = JSON.parse(data);
        const chats = parsed.chats;
        return Array.from(new Set(chats));
    }
    addChat(chatId) {
        const data = node_fs_1.default.readFileSync(this.configPath).toString();
        const parsed = JSON.parse(data);
        const chats = parsed.chats;
        chats.push(chatId);
        const chatArray = Array.from(new Set(chats));
        const writeData = {
            chats: chatArray
        };
        node_fs_1.default.writeFileSync(this.configPath, JSON.stringify(writeData));
    }
    removeChat(chatId) {
        const data = node_fs_1.default.readFileSync(this.configPath).toString();
        const parsed = JSON.parse(data);
        const chats = parsed.chats.filter((chat) => {
            return chat != chatId;
        });
        const writeData = {
            chats
        };
        node_fs_1.default.writeFileSync(this.configPath, JSON.stringify(writeData));
    }
}
exports.ChatStorage = ChatStorage;
