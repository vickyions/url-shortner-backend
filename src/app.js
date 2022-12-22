const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (_, res) => res.send("<h1>Hello</h1>"));

module.exports = app;
