const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "./public");

app.use(express.static(publicDirPath, { extensions: ["html"] }));
app.use(express.static(__dirname));

app.use(function (req, res) {
  res.status(404).sendFile(publicDirPath + "/404.html");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log("Server started at http://localhost:" + port);
});
