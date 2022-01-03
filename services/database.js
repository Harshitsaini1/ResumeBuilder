const mongoose = require("mongoose");

const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.laylr.mongodb.net/resumeDB?retryWrites=true&w=majority`;

mongoose.connect(
    db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => console.log("connected to db")
);

module.exports = mongoose;