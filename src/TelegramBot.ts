import { FileLogger } from "./FileLogger";
import { ChatStorage } from "./chatStorage";
import config from "./config";

import TelegramBot, { TelegramEvents } from 'node-telegram-bot-api';

export class TelegramBotService {

    private readonly bot: TelegramBot | undefined;

    private readonly fileLogger: FileLogger;

    private readonly chatStorage: ChatStorage;

    private readonly token: string;

    private user: TelegramBot.User | undefined;

    public constructor(
        fileLogger: FileLogger,
        chatStorage: ChatStorage
    ) {
        
        this.fileLogger = fileLogger;
        
        this.chatStorage = chatStorage;

        this.token = config.TELEGRAM.TOKEN;

        this.bot = new TelegramBot(this.token, {polling: true});

    }

    public sendChatList(chatId: number) {

        const chats = this.chatStorage.getChats();

        this.bot?.sendMessage(chatId, `Чаты \n${chats}`)

    }

    public async start() {

        if(!this.bot) {
            return this.fileLogger.error("Bot user not found")
        }

        this.user = await this.bot.getMe();

        if(!this.user) {
            return this.fileLogger.error("Bot user not found")
        }

        this.bot.on("message", async (msg) => {

            if(msg.chat.id != config.TELEGRAM.ADMIN_ID) {
                return;
            }

            const data = msg.text?.split(" ") || []

            switch(data[0]) {
                case "/add": {

                    const chatId = parseInt(data[1] || "0", 10) || 0

                    this.chatStorage.addChat(chatId)

                    this.bot?.sendMessage(msg.chat.id, `Чат ${chatId} успешно добавлен`)

                    this.sendChatList(msg.chat.id)

                    break;
                }
                case "/list": {

                    this.sendChatList(msg.chat.id)

                    break;
                }
                case "/remove": {
                    
                    const chatId = parseInt(data[1] || "0", 10) || 0

                    this.chatStorage.removeChat(chatId)

                    this.bot?.sendMessage(msg.chat.id, `Чат ${chatId} успешно удалён`)

                    this.sendChatList(msg.chat.id)

                    break;
                }
            }

        })

        this.bot.on("channel_post", async (msg) => {

            const { message_id, chat: messageChat } = msg;

            if(Math.abs(messageChat.id) != Math.abs(config.TELEGRAM.MONITOR_CHAT)) {
                return this.fileLogger.error(`Invalid chat, ${msg}`)
            }

            const chats = this.chatStorage.getChats();

            chats.forEach(async (chat) => {
                try {
                    await this.bot?.forwardMessage(
                        chat,
                        messageChat.id,
                        message_id
                    )
                } catch(e: any) {
                    return this.fileLogger.error(e)
                }

            })

        })

    }

}