import express from "express";
import serverless from "serverless-http";
import loader from '../../src/loaders/index.js';
const app = express();
loader(app);

export const handler = serverless(app);