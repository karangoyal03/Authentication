const passport =require('passport')
const LinkedInStrategy =require('passport-linkedin-oauth2').Strategy

const keys=require('./keys')

const User =require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(
  new LinkedInStrategy(
    {
      callbackURL: "/auth/linkedin/redirect",
      clientID: keys.linkedIn.clientID,
      clientSecret: keys.linkedIn.clientSecret,
    },
    (accessToken, refreshToken, profile, done)=>{
      console.log(profile)
         User.findOne({ linkedInId: profile.id }).then((currentuser) => {
           if (currentuser) {
             //already exit wala user
             //   console.log("Already exist user :", currentuser);
             done(null, currentuser);
           } else {
             //naya user yahan bna h
             const newuser = new User({
               username: profile.displayName,
               linkedInId: profile.id,
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