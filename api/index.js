import http from "http";
import express from "express";
import routes from "./server/routes";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import fs from "fs";
import shell from "shelljs";

var hostname = "192.168.0.16";
var port = 4000;
var app = express();
var server = http.createServer(app);
var multer = require("multer");

app.use("/api/static", express.static(__dirname + "/public"));
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Api C2",
  })
);

server.listen(port, hostname, () => {
  console.log(`Server MLM is runing ar http://${hostname}:${port}/`);
});
