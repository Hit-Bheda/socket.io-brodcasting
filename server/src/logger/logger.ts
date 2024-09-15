import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, json, prettyPrint } = format;
import { green, blue } from "colorette";

const infoFormate = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${blue(`[${label}]`)} ${green(level)}: ${message}`;
});

export const infoLogger = createLogger({
    level: "info",
    format: combine(label({ label: "server" }), timestamp({ format: "HH:mm:ss" }), infoFormate),
    transports: [new transports.Console()],
});

export const errorLogger = createLogger({
    level: "error",
    format: combine(
        timestamp(),
        json(),
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "./logs/error.log", level: "error" })
    ]
})