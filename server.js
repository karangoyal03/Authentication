const express = require("express");
const keys = require("./config/keys");
const authroutes = require("./routes/auth-routes");
const profileroutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const githubSetup=require('./config/github-setup');
const linkedInSetup=require('./config/linked-in-setup')
const facebookSetup=require('./config/facebook-setup')
const loginSignupSetup=require('./config/login-signup-setup')
const mongoose = require("mongoose");
const passport = require("passport");

const cookieSession = require("cookie-session");

mongoose.Promise = global.Promise; //ES6 promise
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost:27017/authpracticeusinglocalpass", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.set("view engine", "hbs");

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000 * 7,
    keys: [keys.session.cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authroutes);
app.use("/profile", profileroutes);
mongoose.connection
  .once("open", () => {
    console.log("connected");
  })
  .on("error", (error) => {
    console.log("Your error ", error);
  });

app.get("/", (req, res) => {
  res.render("Home",{user:req.user});
});

app.listen(5000, () => {
  console.log("server has started");
});
