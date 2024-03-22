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


const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${username}:${password}@blogifyhub.rjugz7a.mongodb.net/?retryWrites=true&w=majority&appName=blogifyHub`);
        console.log("Connect to MongoDB successfully");
    }catch (error) {
        console.log("Connection failed" + error.message);
    }
}
connectDB();   //start DB 


app.get("/", async(req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc'});
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

//Listing Route
app.listen(3000, () => {
  console.log(`Server is listening to port 3000`);
});
