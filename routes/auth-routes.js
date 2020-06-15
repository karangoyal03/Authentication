const route = require("express").Router();
const User = require("./../models/User");

const passport = require("passport");

route.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

route.get("/signup", (req, res) => res.render("signup"));

route.post("/signup", (req, res) => {
  const user = new User({
    username :req.body.username,
    email:req.body.email,
    password:req.body.password

  })
  user.save().then((user)=>{
    res.redirect('/auth/login')
  })
  .catch((err)=>{
    console.log(err);
    res.redirect('/auth/signup')
  })
});

route.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/profile/",
  })
);

route.get("/logout", (req, res) => {
  //using passport hum yeh kaam krenge
  //   res.send("logging out");
  req.logout();
  res.redirect("/");
});

route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

route.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile"],
  })
);

route.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_liteprofile"],
  })
);

route.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile"],
  })
);

// callback route for google to redirect to
route.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  res.redirect("/profile/");
});

route.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  res.redirect("/profile/");
});

route.get(
  "/linkedin/redirect",
  passport.authenticate("linkedin"),
  (req, res) => {
    res.redirect("/profile/");
  }
);

route.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/profile/");
  }
);

module.exports = route;
