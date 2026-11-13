const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname);
const port = Number(process.env.PORT) || 3000;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(body);
}

function handleLocalApi(request, response) {
  const pathname = new URL(request.url, "http://localhost").pathname;
  if (!pathname.startsWith("/api/")) {
    return false;
  }

  if (pathname === "/api/exposure/me") {
    sendJson(response, 200, {
      local: true,
      status: "ready",
      message: "Local exposure demo is ready.",
    });
    return true;
  }

  if (pathname === "/api/tools/run" || pathname === "/api/tools/ip-check") {
    sendJson(response, 200, {
      local: true,
      status: "complete",
      result: "Local demo result",
    });
    return true;
  }

  if (
    pathname === "/api/tools/lead" ||
    pathname === "/api/demo-requests" ||
    pathname === "/api/leads"
  ) {
    sendJson(response, 200, {
      local: true,
      accepted: true,
      message: "Saved to the local demo runtime.",
    });
    return true;
  }

  sendJson(response, 404, { local: true, error: "Local API route not found." });
  return true;
}

function resolveFile(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.resolve(root, `.${requested}`);

  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    return null;
  }

  return filePath;
}

const server = http.createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method Not Allowed");
    return;
  }

  if (handleLocalApi(request, response)) {
    return;
  }

  const filePath = resolveFile(request.url);
  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not Found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    fs.createReadStream(filePath).pipe(response);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`NorthCypher local site running at http://127.0.0.1:${port}`);
});
