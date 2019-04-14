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
  let graphDefinition = base64url.decode(req.params.diagram);

  const randomTmpFile = (await uniqueFilename("/tmp", "tmp-mmd")) + ".mmd";

  // Add to endpointUtil
  fs.writeFile(randomTmpFile, graphDefinition, function(err) {
    if (err) {
      return console.log(err);
    }
  });

  // Add to MermaidUtil
  // mmdc -i input.mmd -o output.svg -w 1024 -H 768
  exec(
    `./node_modules/.bin/mmdc -i ${randomTmpFile} -o ${randomTmpFile}.png -b transparent`,
    function callback(error, stdout, stderr) {
      if (error) {
        console.log("There was an error processing the output file");
      }
    }
  );
  res.json({ same: "" });
});

app.post("/encode", (req, res) => {
  console.log(req.body.diagram);
  console.log(base64url.encode(req.body.diagram));
  console.log(base64url.decode(base64url.encode(req.body.diagram)));
  res.json({ encoded_diagram: base64url.encode(req.body.diagram) });
});

app.listen(process.env.PORT || 3000);
