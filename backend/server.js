const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const router = require('./routes/router.js')
const UserModel = require("./Db/model.js");
const MongoDBStore = require('connect-mongodb-session')(session)
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect("mongodb://127.0.0.1:27017/Chat-App")
.then(()=> console.log('DB connected'))
.catch(err => console.log('Db not connected'))

const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/Chat-App',
  collection: 'mySessions'
})

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 },
    store: store
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passport.js")(passport);


app.use('/', router)

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------


//Start Server
app.listen(5000, () => {
  console.log("Server Has Started");
});