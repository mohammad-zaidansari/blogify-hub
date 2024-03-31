const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotevn = require("dotenv");
const bodyParser = require("body-parser");
const articleRouter = require("./routes/articles");
const Article = require("./models/articles");
const methodOverride = require("method-override");


dotevn.config();
app.use(express.urlencoded({extended: true}));      // To encode the data that comes from the form....
app.use(methodOverride('_method'));
app.set("view engine", "ejs");


const dbUrl = process.env.ATLASDB_URL;
main()
.then(() => {
  console.log("Connect to Database");
}).catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
};


app.get("/", async(req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc'});
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

//Listing Route
app.listen(3000, () => {
  console.log(`Server is listening to port 3000`);
});
