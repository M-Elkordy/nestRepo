import dotenv = require('dotenv');
dotenv.config();

export const port: number = Number(process.env.PORT_NUMBER);
export const filePath: string = process.env.FILE_PATH;