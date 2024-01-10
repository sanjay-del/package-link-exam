import 'dotenv/config';

import Fastify, { FastifyInstance } from 'fastify';
import { AppConfig } from './config.js';
import { sdkAInstance, sdkBInstance } from './setup.js';
const server: FastifyInstance = Fastify();

server.get('/testA', async (req, res) => {
  res.send(await sdkAInstance.functionA());
});

server.get('/testB', async (req, res) => {
  res.send(await sdkBInstance.functionB());
});
server.listen(
  { port: parseInt(AppConfig.app.port), host: '0.0.0.0' },
  async () => {
    try {
      console.log(`Test app started at ${AppConfig.app.port}`);
    } catch (e) {
      console.error(e);
    }
  },
);
