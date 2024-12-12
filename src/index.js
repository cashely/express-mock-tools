import dotenv from "dotenv";
dotenv.config({
    path: [
        '.env',
        `.env.${process.env.NODE_ENV}`,
    ]
//   path: '.env.local'
});

console.log(process.env.A, '--')

import start from './main.js';

const app = start();

export default app;