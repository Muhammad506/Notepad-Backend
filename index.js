const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Route for reading files
app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    if (err) {
      console.error("Error reading files directory", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("index", { files: files });
  });
});

// Route for creating new files
app.post("/create", function (req, res) {
  const title = req.body.title
    ? req.body.title.replace(/\s+/g, "")
    : "Untitled";
  const details = req.body.details || "";

  fs.writeFile(`./files/${title}.txt`, details, function (err) {
    if (err) {
      console.error("Error writing file", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/");
  });
});

app.listen(3000, function () {
  console.log("Server is running on http://localhost:3000");
});
