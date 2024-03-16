"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotService = void 0;
const config_1 = __importDefault(require("./config"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
class TelegramBotService {
    constructor(fileLogger, chatStorage) {
        this.fileLogger = fileLogger;
        this.chatStorage = chatStorage;
        this.token = config_1.default.TELEGRAM.TOKEN;
        this.bot = new node_telegram_bot_api_1.default(this.token, { polling: true });
    }
    sendChatList(chatId) {
        var _a;
        const chats = this.chatStorage.getChats();
        (_a = this.bot) === null || _a === void 0 ? void 0 : _a.sendMessage(chatId, `Чаты \n${chats}`);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.bot) {
                return this.fileLogger.error("Bot user not found");
            }
            this.user = yield this.bot.getMe();
            if (!this.user) {
                return this.fileLogger.error("Bot user not found");
            }
            this.bot.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                console.log(msg);
                if (msg.chat.id != config_1.default.TELEGRAM.ADMIN_ID) {
                    return;
                }
                const data = ((_a = msg.text) === null || _a === void 0 ? void 0 : _a.split(" ")) || [];
                switch (data[0]) {
                    case "/add": {
                        const chatId = parseInt(data[1] || "0", 10) || 0;
                        this.chatStorage.addChat(chatId);
                        (_b = this.bot) === null || _b === void 0 ? void 0 : _b.sendMessage(msg.chat.id, `Чат ${chatId} успешно добавлен`);
                        this.sendChatList(msg.chat.id);
                        break;
                    }
                    case "/list": {
                        this.sendChatList(msg.chat.id);
                        break;
                    }
                    case "/remove": {
                        const chatId = parseInt(data[1] || "0", 10) || 0;
                        this.chatStorage.removeChat(chatId);
                        (_c = this.bot) === null || _c === void 0 ? void 0 : _c.sendMessage(msg.chat.id, `Чат ${chatId} успешно удалён`);
                        this.sendChatList(msg.chat.id);
                        break;
                    }
                }
            }));
            this.bot.on("channel_post", (msg) => __awaiter(this, void 0, void 0, function* () {
                const { message_id, chat: messageChat } = msg;
                if (Math.abs(messageChat.id) != Math.abs(config_1.default.TELEGRAM.MONITOR_CHAT)) {
                    return this.fileLogger.error(`Invalid chat, ${msg}`);
                }
                console.log("POST", msg);
                const chats = this.chatStorage.getChats();
                chats.forEach((chat) => __awaiter(this, void 0, void 0, function* () {
                    var _d;
                    try {
                        yield ((_d = this.bot) === null || _d === void 0 ? void 0 : _d.forwardMessage(chat, messageChat.id, message_id));
                    }
                    catch (e) {
                        console.log(e);
                    }
                }));
            }));
        });
    }
}
exports.TelegramBotService = TelegramBotService;
