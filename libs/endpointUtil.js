/*******************************************************
 * Copyleft (ɔ) 2019 Ryan Schachte code@ryan-schachte.com
 * Steal this code
 *
 * Permission is hereby granted, free of charge, to any
 * person obtaining a copy.
 *******************************************************/
const fs = require("fs");
const atob = require("atob");
const btoa = require("btoa");
const base64url = require("base64url");
const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

module.exports = {
  base64Decode: function(encodedString) {
    return atob(encodedString);
  },
  base64Encode: function(decodedString) {
    return btoa(decodedString);
  },
  validateBase64: function(encodedString) {
    return base64regex.test(encodedString);
  },
  generateFileName(name) {
    return `${base64url.encode(name).substring(1, 15)}`;
  },
  writeFile: function(randomTmpFile, graphDefinition) {
    fs.writeFileSync(
      "/tmp/" + randomTmpFile + ".mmd",
      graphDefinition,
      function(err) {
        if (err) {
          return console.log(err);
        }
      }
    );
  }
};
