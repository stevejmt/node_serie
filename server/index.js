// call framework express
const express = require('express');
const path = require("path")
// initialize for api request, init server
const app = express();

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + '/images'));

const db = require('./models');

// Routers
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
app.listen(3001, () => {
    console.log("Serveur running on port 3001");
    });
});

