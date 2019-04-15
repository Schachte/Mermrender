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
const plantuml = require("node-plantuml");
const fs = require("fs");
const os = require("os");

const endpointUtil = require("./libs/endpointUtil");
const mermaidUtil = require("./libs/mermaidUtil");
const plantUmlUtil = require("./libs/plantUmlUtil");

app.use(express.json());
plantuml.useNailgun();

app.get("/diagram/:diagram", async (req, res) => {
  const img = fs.readFileSync(`/tmp/${req.params.diagram}.png`);
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(img, "binary");
});

app.post("/encode/mermaid", async (req, res) => {
  const graphDefinition = req.body.diagram;
  const randomTmpFile = endpointUtil.generateFileName(graphDefinition);

  endpointUtil.writeFile(randomTmpFile, graphDefinition, ".mmd");
  await mermaidUtil.generateImage(randomTmpFile);

  res.json({
    embed_link: `http://${req.headers.host}/diagram/${randomTmpFile}`,
    note:
      "It may take up to 15 seconds to retrieve the image after initial persistence"
  });
});

app.post("/encode/plantuml", async (req, res) => {
  const graphDefinition = req.body.diagram;
  const randomTmpFile = endpointUtil.generateFileName(req.body.diagram);
  endpointUtil.writeFile(randomTmpFile, graphDefinition, ".puml");
  await plantUmlUtil.generateImage(randomTmpFile);

  res.json({
    embed_link: `http://${req.headers.host}/diagram/${randomTmpFile}`,
    note:
      "It may take up to 15 seconds to retrieve the image after initial persistence"
  });
});

app.listen(process.env.PORT || 3000);
