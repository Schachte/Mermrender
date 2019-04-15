/*******************************************************
 * Copyleft (ɔ) 2019 Ryan Schachte code@ryan-schachte.com
 * Steal this code
 *
 * Permission is hereby granted, free of charge, to any
 * person obtaining a copy.
 *******************************************************/
const express = require("express");
const app = express();
const base64url = require("base64url");
const fs = require("fs");

const endpointUtil = require("./libs/endpointUtil");
const mermaidUtil = require("./libs/mermaidUtil");

app.use(express.json());

app.get("/diagram/:diagram", async (req, res) => {
  const img = fs.readFileSync(`/tmp/${req.params.diagram}.png`);
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(img, "binary");
});

app.post("/encode", async (req, res) => {
  const graphDefinition = req.body.diagram;
  const randomTmpFile = endpointUtil.generateFileName(req.body.diagram);

  endpointUtil.writeFile(randomTmpFile, graphDefinition);
  mermaidUtil.generateImage(randomTmpFile);

  // TODO: Make hostname dynamic
  res.json({
    embed_link: `http://localhost:3000/diagram/${randomTmpFile}`
  });
});

app.listen(process.env.PORT || 3000);
