import path from "node:path"
import fs from "node:fs"

interface ConfigData {
    chats: number[]
}

export class ChatStorage {

    public readonly configPath: string;

    public constructor() {
        
        this.configPath = path.join(__dirname, "..", "storage", "storage.json")

    }

    public getChats(): number[] {

        const data = fs.readFileSync(this.configPath).toString();

        const parsed: ConfigData = JSON.parse(data)

        const chats = parsed.chats

        return Array.from(new Set(chats))

    }

    public addChat(chatId: number) {

        const data = fs.readFileSync(this.configPath).toString();

        const parsed: ConfigData = JSON.parse(data)

        const chats = parsed.chats

        chats.push(chatId)

        const chatArray = Array.from(new Set(chats))

        const writeData = {
            chats: chatArray
        }

        fs.writeFileSync(this.configPath, JSON.stringify(writeData))

    }

    public removeChat(chatId: number) {

        const data = fs.readFileSync(this.configPath).toString();

        const parsed: ConfigData = JSON.parse(data)

        const chats = parsed.chats.filter((chat) => {
            return chat != chatId
        })

        const writeData = {
            chats
        }

        fs.writeFileSync(this.configPath, JSON.stringify(writeData))

    }

}
