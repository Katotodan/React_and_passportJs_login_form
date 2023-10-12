const express = require('express')
const passport = require('passport')

const router = express.Router()
const UserModel = require('../Db/model.js')


// Routes
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists");
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.redirect('/')
//       });
//     }
//   })(req, res, next);
// });

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

router.post('/signup',async function(req, res, next) {
  try {
    const userExist = await UserModel.findOne({username: req.body.username}).exec()
    if(!userExist){
      const user = new UserModel(req.body)
      await user.save()
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    }else{
      throw new Error('Broken')
    }   
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
  
});

const isUserAuth = (req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.status(404).send('User not authentificated')
    }
}

router.get('/', isUserAuth, (req,res)=>{
    res.send('User well auth')
})

router.get('/login', (req,res)=>{
    res.send('User not auth')
})



//----------------------------------------- END OF ROUTES---------------------------------------------------




module.exports = router