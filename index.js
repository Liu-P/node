/*
 * @Description:
 * @Author: LCL
 * @Date: 2023-01-28
 * @LastEditors: LCL
 * @LastEditTime: 2023-05-10
 */

import koa from 'koa';
import { readFileSync } from 'fs';
// import mount from 'koa-mount';
// import serve from 'koa-static';
import bodyparser from 'koa-bodyparser';
// import { fileURLToPath } from 'url';
// import path from 'path';
import router from './source/router/index.js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = 3000;
const ip = 'localhost';

const app = new koa();

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
// app.use(
//   serve(__dirname + '/source/static/')
// );

// app.use(
//   mount('/', async (ctx) => {
//       ctx.body = readFileSync(__dirname + '/source/index.htm', 'utf-8')
//   })
// );

app.use(router.routes(), router.allowedMethods());

app.listen(port, ip, () => {
  console.log(`正在运行在http://${ip}:${port}`);
});

export default app;
