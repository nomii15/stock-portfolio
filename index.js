const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/user");
require("./models/account");
require("./models/external");

require("./services/passport");

mongoose.connect(keys.mongoURI, {useNewUrlParser: true,useUnifiedTopology: true,});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(bodyParser.urlencoded({extended: false,}));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth")(app);
require("./routes/external")(app);
require("./routes/user")(app);

app.get('/', (req,res) => {
    res.send({hi: 'There'});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);
