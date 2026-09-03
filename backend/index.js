require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());

app.use("/api", require("./routes/main"));

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
