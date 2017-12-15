const express = require("express");
const path = require("path");
const open = require("open");
const app = express();

const PORT = 8999;

app.use(express.static("dist"));
app.get("*", function(request, response) {
  response.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("app is running on http://localhost:", PORT);
  setTimeout(() => {
    open(`http://127.0.0.1:${PORT}`);
  }, 300);
});
