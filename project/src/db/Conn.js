const mongoose = require("mongoose");

const dburl = "mongodb+srv://201210006:Shyam12345@cluster0.jvgvpuz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dburl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});