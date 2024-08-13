// import { tmpdir } from 'os';
// import { join } from 'path';
import { MidwayConfig } from '@midwayjs/core';

export default {
  cors: {
    origin: '*',
  },
  keys: '1722690562835_7205',
  koa: {
    port: 7001,
  },
  // upload: {
  //   mode: 'file', // 使用 file 模式
  //   fileSize: '10mb', // 设置最大上传文件大小
  //   tmpdir: join(tmpdir(), 'midway-upload'), // 上传的文件临时存储路径
  //   whitelist: null, // 允许所有文件类型上传
  //   mimeTypeWhiteList: null, // 允许所有 MIME 类型上传
  // },
} as MidwayConfig;