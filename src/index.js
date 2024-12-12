import dotenv from "dotenv";

console.log(process.env.NODE_ENV, '----process.env')
dotenv.config({
    path: [
        '.env',
        `.env.${process.env.NODE_ENV}`,
    ]
});

console.log(process.env.POSTGRESQL_URL, '----POSTGRESQL_URL')

import start from './main.js';

const app = start();

export default app;