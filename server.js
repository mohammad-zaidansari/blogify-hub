const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req, res) => {
    res.send("I am working root");
})

app.listen(3000, () => {
    console.log(`Server is listening to port 3000`);
});