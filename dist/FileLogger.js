"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const node_path_1 = __importDefault(require("node:path"));
const errorLogFile = node_path_1.default.join(__dirname, "..", "logs", "error.log");
const combinedLogFile = node_path_1.default.join(__dirname, "..", "logs", "error.log");
class FileLogger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: "info",
            format: winston_1.default.format.json(),
            defaultMeta: { service: "bot-forwarder" },
            transports: [
                new winston_1.default.transports.File({
                    filename: errorLogFile,
                    level: "error",
                }),
                new winston_1.default.transports.File({ filename: combinedLogFile }),
            ],
        });
        if (process.env.NODE_ENV !== "production") {
            this.logger.add(new winston_1.default.transports.Console({
                format: winston_1.default.format.simple(),
            }));
        }
    }
    error(message) {
        return this.logger.log({
            level: "error",
            message,
        });
    }
    log(message) {
        return this.logger.log({
            level: "info",
            message,
        });
    }
    getLogger() {
        return this.logger;
    }
}
exports.FileLogger = FileLogger;
