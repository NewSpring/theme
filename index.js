var express = require("express");
var serveStatic = require("serve-static");

var app = express();

app.use(serveStatic("public/ftp", { index: ["default.html", "default.htm"] }));
app.listen(3000);
