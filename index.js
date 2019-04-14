/*******************************************************
 * Copyleft (ɔ) 2019 Ryan Schachte code@ryan-schachte.com
 * Steal this code
 *
 * Permission is hereby granted, free of charge, to any
 * person obtaining a copy.
 *******************************************************/
const express = require("express");
const app = express();
const exec = require("child_process").exec;
const base64url = require("base64url");
const fs = require("fs");
const os = require("os");

const uniqueFilename = require("unique-filename");
const endpointUtil = require("./libs/endpointUtil");

app.use(express.json());

app.get("/diagram/:diagram", async (req, res) => {
  const img = fs.readFileSync(`/tmp/${req.params.diagram}.png`);
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(img, "binary");
});

app.post("/encode", async (req, res) => {
  let graphDefinition = req.body.diagram;

  const randomTmpFile = `${base64url
    .encode(req.body.diagram)
    .substring(1, 15)}`;

  // Add option to check for cached images
  fs.writeFileSync("/tmp/" + randomTmpFile + ".mmd", graphDefinition, function(
    err
  ) {
    if (err) {
      return console.log(err);
    }
  });

  // todo: add dimension options mmdc -i input.mmd -o output.svg -w 1024 -H 768
  await exec(
    `./node_modules/.bin/mmdc -i /tmp/${randomTmpFile}.mmd -o /tmp/${randomTmpFile}.png -b transparent`,
    function callback(error, stdout, stderr) {
      if (error) {
        console.log("There was an error processing the output file");
      }
    }
  );

  // TODO: Make hostname dynamic
  res.json({
    embed_link: `http://localhost:3000/diagram/${randomTmpFile}`
  });
});

app.listen(process.env.PORT || 3000);
