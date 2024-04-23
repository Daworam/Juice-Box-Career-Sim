require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try{
    req.user = jwt.verify(token, process.env.JWT);
  }catch{
    req.user = null;
  }
  next();
})

app.use("/api/v1", require("./api"));
app.use("/auth", require("./auth"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;