const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const keys = require("./keys");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new facebookStrategy(
    {
      callbackURL: "/auth/facebook/redirect",
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then((currentuser) => {
        if (currentuser) {
          //already exit wala user
          //   console.log("Already exist user :", currentuser);
          done(null, currentuser);
        } else {
          //naya user yahan bna h
          const newuser = new User({
            username: profile.displayName,
            facebookId: profile.id,
          });
          newuser.save().then((user) => {
            console.log("New User added ", user);
            done(null, user);
          });
        }
      });
    }
  )
);
