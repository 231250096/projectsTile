import { MidwayConfig } from '@midwayjs/core';

export default {
  cors: {
    origin: '*',
  },
  // use for cookie sign key, should change to your own and keep security
  keys: '1722690562835_7205',
  koa: {
    port: 7001,
  },
} as MidwayConfig;
