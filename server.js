const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "pages", "index.html"), (err, data) => {
      if (err) throw new Error(err);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/about" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "pages", "about.html"), (err, data) => {
      if (err) throw new Error(err);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/sys" && req.method === "GET") {
    // let totalSeconds = 4250238;
    // days = Math.floor(totalSeconds / 86400);
    // totalSeconds %= 86400;
    // hours = Math.floor(totalSeconds / 3600);
    // totalSeconds %= 3600;
    // minutes = Math.floor(totalSeconds / 60);
    // seconds = totalSeconds % 60;

    // console.log(`${days}:${hours}:${minutes}:${seconds}`);
    
    const osInfo = {
      hostname: os.hostname(),
      platform: os.platform(),
      architecture: os.arch(),
      numberOfCPUS: os.cpus().length,
      networkInterfaces: os.networkInterfaces(),
      uptime: os.uptime(),
    };
    fs.writeFile("./osinfo.json", JSON.stringify(osInfo, null, 2), (err) => {
      if (err) throw new Error(err);
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.write("Your OS info has been saved successfully!");
      res.end();
    });
  } else {
    fs.readFile(path.join(__dirname, "pages", "404.html"), (err, data) => {
      if (err) throw new Error(err);
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
