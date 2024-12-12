import dotenv from "dotenv";

console.log(process.env, '----process.env')
dotenv.config({
    path: [
        '.env',
        `.env.${process.env.NODE_ENV}`,
    ]
//   path: '.env.local'
});

console.log(process.env, '--')

import start from './main.js';

const app = start();

export default app;