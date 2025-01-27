const mongoose = require("mongoose");

const conn = () => {
    mongoose.connect("mongodb+srv://new:Shree123@cluster0.jhoj67t.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
};

module.exports = conn;