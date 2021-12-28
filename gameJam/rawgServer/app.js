const http = require("https");

const options = {
  method: "GET",
  hostname: "rawg-video-games-database.p.rapidapi.com",
  port: null,
  path: "/games",
  headers: {
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "15bf96b1b1de4925ad2da66b1bd65972",
    useQueryString: true,
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
