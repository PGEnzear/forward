import winston from "winston";

import path from "node:path";

const errorLogFile = path.join(__dirname, "..", "logs", "error.log");
const combinedLogFile = path.join(__dirname, "..", "logs", "error.log");

export class FileLogger {

	private logger: winston.Logger;

	constructor() {
		
		this.logger = winston.createLogger({
			level: "info",
			format: winston.format.json(),
			defaultMeta: { service: "bot-forwarder" },
			transports: [
				new winston.transports.File({
					filename: errorLogFile,
					level: "error",
				}),
				new winston.transports.File({ filename: combinedLogFile }),
			],
		});

		if (process.env.NODE_ENV !== "production") {
			this.logger.add(
				new winston.transports.Console({
					format: winston.format.simple(),
				}),
			);
		}
	}

	public error(message: string) {
		return this.logger.log({
			level: "error",
			message,
		});
	}

	public log(message: string) {
		return this.logger.log({
			level: "info",
			message,
		});
	}

	public getLogger(): winston.Logger {
		return this.logger;
	}

}