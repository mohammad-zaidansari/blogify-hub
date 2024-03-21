const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article1",
      createdAt: new Date(),
      description: "Test description",
    },
    {
      title: "Test Article2",
      createdAt: new Date(),
      description: "Test description",
    },
  ];
  res.render("index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(3000, () => {
  console.log(`Server is listening to port 3000`);
});
