import { infoLogger } from './logger';

export const morganFormate = ":method :url :status :res[content-length] - :response-time ms";

export const morganData = {
    stream:{
        write: (message: string) => {
            const [ method, url, status, res, responseTime ] = message.split(" ");
            infoLogger.info(`${method} ${url} ${status} ${res} - ${responseTime} ms`)
        }
    }
}