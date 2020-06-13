const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Username invalid" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Password invalid" });
      }

      done(null, user);
    } catch (e) {
      done(e);
    }
  })
);
