import { createServer } from "http";
import { readFile } from "fs";

const port = 3000;
const ip = "10.10.7.101";

const sendResponse = (fileName, statusCode, response) => {
  readFile(`./html/${fileName}`, (error, data) => {
    if (error) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("some wrong is happen!");
    } else {
      response.statusCode = statusCode;
      response.setHeader("Content-Type", "text/html");
      response.end(data);
    }
  });
};

const server = createServer((request, response) => {
  const method = request.method;
  let url = request.url;
  if (method === "GET") {
    const requestUrl = new URL(url, `http://${ip}:${port}`);
    url = requestUrl.pathname;
    const lang = requestUrl.searchParams.get("lang");
    let selector = "";

    if (lang === "zh") {
      selector = "-zh";
    }

    if (url === "/" || url === "/index.html") {
      sendResponse(`index${selector}.html`, 200, response);
    } else if (url === "/about.html") {
      sendResponse(`about${selector}.html`, 200, response);
    } else if (url === "/login.html") {
      sendResponse(`login${selector}.html`, 200, response);
    } else if (url === "/login-success.html") {
      sendResponse(`login-success${selector}.html`, 200, response);
    } else if (url === "/login-fail.html") {
      sendResponse(`login-fail${selector}.html`, 200, response);
    } else {
      sendResponse(`404${selector}.html`, 404, response);
    }
  } else {
    console.log(url);
    if (url === "/process-login") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        body = new URLSearchParams(body);

        if (body.get("username") === "lcl" && body.get("password") === "1") {
          response.statusCode = 301;
          response.setHeader("Location", "/login-success.html");
        } else {
          response.statusCode = 301;
          response.setHeader("Location", "/login-fail.html");
        }
        response.end();
      });
    }
  }
});

server.listen(port, ip, () => {
  console.log(`正在运行在http：//${ip}:${port}`);
});
