import { ChatStorage } from "./chatStorage";
import config from "./config";
import { FileLogger } from "./FileLogger";

import { TelegramBotService } from "./TelegramBot"

const fileLogger = new FileLogger();
const chatStorage = new ChatStorage();
const botInstance = new TelegramBotService(fileLogger, chatStorage);

const bootstrap = async () => {

    try {

        if(config.SHOW_CONFIG) {
            console.log(`Loaded config`, config)
        }

        await botInstance.start();        

    } catch(e) {
        
        console.warn(e)

    }

}

bootstrap();