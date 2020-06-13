const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/User");
passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,

      //option for Google strategy
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((currentuser) => {
        if (currentuser) {
          //already exit wala user
        //   console.log("Already exist user :", currentuser);
          done(null,currentuser);
        } else {

            //naya user yahan bna h 
          const newuser = new User({
            username: profile.displayName,
            googleId: profile.id,
          });
          newuser.save().then((user) => {
            console.log("New User added ", user);
            done(null,user);
          });
        }
      });
    }
  )
);
