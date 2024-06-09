import path = require("path");
import * as winston from 'winston';


export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level} ${message}`;
    })),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(__dirname, "..", "..", "logs", "app.log") })
    ],
    exitOnError: false
})