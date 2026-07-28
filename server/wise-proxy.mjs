// Wise rate proxy — keeps your Wise API key on the server (never in the front-end).
// Zero dependencies (Node 18+ has global fetch).
//
// Run it:   WISE_API_KEY=your_key_here node server/wise-proxy.mjs
// (On Windows PowerShell:  $env:WISE_API_KEY="your_key_here"; node server/wise-proxy.mjs )
//
// Then in src/app/Section2.tsx set:
//   const RATE_URL = "http://localhost:3001/rate?source=USD&target=INR";
//
// For production, deploy this behind HTTPS and set WISE_API_KEY as an env var on the host.

import http from "node:http";

const KEY = process.env.WISE_API_KEY;
const PORT = process.env.PORT || 3001;
// Use the live endpoint by default; switch to the sandbox host while testing if you like.
const WISE_HOST = process.env.WISE_HOST || "https://api.wise.com";

if (!KEY) {
  console.error("Missing WISE_API_KEY environment variable. Set it before starting.");
  process.exit(1);
}

http
  .createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // lock this down to your site's origin in production
    const url = new URL(req.url, "http://localhost");
    if (url.pathname !== "/rate") {
      res.writeHead(404);
      return res.end("Not found");
    }
    const source = url.searchParams.get("source") || "USD";
    const target = url.searchParams.get("target") || "INR";
    try {
      const r = await fetch(`${WISE_HOST}/v1/rates?source=${source}&target=${target}`, {
        headers: { Authorization: `Bearer ${KEY}` },
      });
      const data = await r.json();
      const rate = Array.isArray(data) ? data[0]?.rate : data?.rate;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ rate, source, target }));
    } catch (e) {
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "rate fetch failed" }));
    }
  })
  .listen(PORT, () => console.log(`Wise rate proxy running at http://localhost:${PORT}/rate`));
