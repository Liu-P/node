/*
 * @Description:
 * @Author: LCL
 * @Date: 2023-01-28
 * @LastEditors: LCL
 * @LastEditTime: 2023-01-28
 */

const koa = require('koa')
const fs = require('fs')
const mount = require('koa-mount')
const static = require('koa-static')

const port = 3000;
const ip = "10.10.7.181";

const app = new koa()

app.use(
  static(__dirname + '/source/')
);

app.use(
  mount('/', async (ctx) => {
      ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
  })
);

app.listen(port, ip, () => {
  console.log(`正在运行在http://${ip}:${port}`);
});


module.exports = app;
