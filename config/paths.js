const path = require("path");

const PATHS = {
  dist: path.resolve(__dirname, "../dist/"),
  public: path.resolve(__dirname, "../public/"),
  src: path.resolve(__dirname, "../src/"),
  js: path.resolve(__dirname, "../src/index.js")
};

module.exports = PATHS;
