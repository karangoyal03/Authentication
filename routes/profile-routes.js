const route =require('express').Router()


const Authcheck =(req,res,next)=>{
    if(!req.user){
        res.redirect('/auth/login')
    }
    else{
        next();
    }
}


route.get('/',Authcheck,(req,res)=>{
    // res.send('viewing the profile page of',req.user.username)
    console.log('in profile section')
     res.render("profile", { user: req.user});
})


module.exports=route