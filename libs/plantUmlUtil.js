/*******************************************************
 * Copyleft (ɔ) 2019 Ryan Schachte code@ryan-schachte.com
 * Steal this code
 *
 * Permission is hereby granted, free of charge, to any
 * person obtaining a copy.
 *******************************************************/
const exec = require("child_process").exec;

module.exports = {
  generateImage: async function(randomTmpFile) {
    await exec(
      `puml generate /tmp/${randomTmpFile}.puml -o /tmp/${randomTmpFile}.png`,
      function callback(error, stdout, stderr) {
        if (error) {
          console.log("There was an error processing the output file");
        }
      }
    );
  }
};
