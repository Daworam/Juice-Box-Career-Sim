require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));



app.use("/api/v1", require("./api"));
app.use("/auth", require("./auth"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;