const UserModel = require("./Db/model.js");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ username: username }).exec()
            
            if(user){
                if(password == user.password){
                    console.log('Identique password')
                    return done(null, user)
                }else{
                    console.log('Different password')
                    return done(null, false)
                }  
            }else{
                console.log('No such user')
                return done(null, false)
            }
        } catch (error) {
            console.log('error')
            return done(null, false)    
        }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, cb) => {
    try {
        const user = await UserModel.findById(id)
        cb(null, user)
    } catch (error) {
        cb(error, null)
    }
    
  });
};