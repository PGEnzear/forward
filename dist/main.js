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
const chatStorage_1 = require("./chatStorage");
const config_1 = __importDefault(require("./config"));
const FileLogger_1 = require("./FileLogger");
const TelegramBot_1 = require("./TelegramBot");
const fileLogger = new FileLogger_1.FileLogger();
const chatStorage = new chatStorage_1.ChatStorage();
const botInstance = new TelegramBot_1.TelegramBotService(fileLogger, chatStorage);
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (config_1.default.SHOW_CONFIG) {
            console.log(`Loaded config`, config_1.default);
        }
        yield botInstance.start();
    }
    catch (e) {
        console.warn(e);
    }
});
bootstrap();
