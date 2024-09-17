import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const __dirname = import.meta.dirname;
const pathToFile = path.join(__dirname, "index.html");

const mimeTypes = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".html": "text/html",
};

const getStaticFile = (res, filePath, ext) => {
  res.setHeader("Content-Type", mimeTypes[ext]);
  fs.readFile(path.join(".", "public", filePath), (err, data) => {
    if (err) {
      console.log(path.join(".", "public", filePath));
      res.statusCode = 404;
      res.end();
    } else {
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  const url = req.url;
  switch (url) {
    case "/":
      if (req.method === "GET") {
        const content = fs.readFileSync(pathToFile);
        res.write(content);
        res.end();
      } else if (req.method === "POST") {
        let body = "";
        req.on("data", (buf) => {
          body += buf;
          const fileName = `form.log`;
          fs.appendFile(path.join(__dirname, "files", fileName), body, () => {
            res.statusCode = 201;
            res.end();
          });
        });
      } else {
        res.statusCode = 405;
        res.end();
      }

      break;
    case "/about":
      const aboutPage = fs.readFileSync(path.join(__dirname, "about.html"));
      res.write(aboutPage);
      res.end();
      break;
    default:
      const extname = path.extname(url).toLocaleLowerCase();
      if (extname in mimeTypes) {
        getStaticFile(res, url, extname);
      } else {
        res.statusCode = 404;
        res.end();
      }
  }
});

server.listen(3000, () => {
  console.log(`Server is running: http://localhost:3000`);
});
