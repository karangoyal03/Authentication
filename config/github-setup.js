const passport =require('passport')
const GithubStrategy=require('passport-github').Strategy
const keys=require('./keys')
const User= require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(
  new GithubStrategy(
    {
      callbackURL: "/auth/github/redirect",
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ githubId: profile.id }).then((currentuser) => {
          if (currentuser) {
            //already exit wala user
            //   console.log("Already exist user :", currentuser);
            done(null, currentuser);
          } else {
            //naya user yahan bna h
            const newuser = new User({
              username: profile.displayName,
              githubId: profile.id,
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