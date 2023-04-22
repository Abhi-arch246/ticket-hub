const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("Database successfully connected");
});

conn.on("error", () => {
  console.log("Db connection error");
});

module.exports = mongoose;
