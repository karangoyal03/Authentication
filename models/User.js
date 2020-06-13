const mongoose =require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
  username: {
    type: String,
  },
  googleId: {
    type: String,
    index: true,
  },
  githubId: {
    type: String,
    index: true,
  },
  linkedInId: {
    type: String,
    index: true,
  },
  facebookId: {
    type: String,
    index: true,
  },
});


const User = mongoose.model('users',UserSchema)


module.exports=User