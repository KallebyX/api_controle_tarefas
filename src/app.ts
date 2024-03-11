import express, { json } from "express";
const helmet = require('helmet');

export const app = express();

app.use(helmet(json()));