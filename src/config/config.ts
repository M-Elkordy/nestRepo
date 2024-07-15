import dotenv = require('dotenv');
dotenv.config();

export const serviceUrl: string = process.env.SERVICE_URL;
export const port: string = process.env.PORT;
