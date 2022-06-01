/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 var bcrypt=require('bcrypt-nodejs');
 var nodemailer=require('nodemailer');
 var jwt=require('jsonwebtoken');

module.exports = {
 signup:function(req,res){
  if (_.isUndefined(req.param('email'))) {
    return res.badRequest('An email address is required.')
}

if (_.isUndefined(req.param('password'))) {
    return res.badRequest('A password is required.')
}
for(var i=0;i<User.length;i++){
    if(req.param('email')===User[i]){
        return res.badRequest('the email is already exists')
    }
}
if (req.param('email')==""||req.param('name')==""||req.param('password')=="") {
    return res.badRequest('please fill the form correctly.')
}

if (req.param('password').length < 8) {
    return res.badRequest('Password must be at least 8 characters.')
}
   var user={
     name:req.param('name'),
     email:req.param('email'),
   };
   var password=req.param('password');
      let Mailoption=({
        from:"eman.iron2022@gmail.com",
        to:user.email,
        subject:'Confirmation Mail!!',
        html:`<h3>Hello ${user.username}</h3><br>
        <p><h4><b>Welcome to Expense Manager.........!<b></h4></p>`
      })
      transport.sendMail(Mailoption,function(err,data){
        if(err){
            console.log("error occour mail not send.");
        }
        else{
            console.log("maill send successfully.");
        }
      });
      bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,null,function(err,hash){
          if(err){sails.log(err)
          return res.json({message:err.message})}
          password=hash;
          User.create({name:req.param('name'),email:req.param('email'),password:password}).fetch().exec((err,user)=>{
            if(err){return res.status(500).json({message:err.message})}
            if(!user){return res.notFound()}
            //var token=jwt.sign({id:user.id,name:user.name,email:user},'secret');
            //sails.log('token: ',token);
            return res.redirect('/login');
          })
        })
      })

 },
 
login:function(req,res){
  //var email=req.param('email');
  User.findOne({email:req.param('email')}).exec((err,user)=>{
    if(err){  
      return sails.log(err)
    };
    req.session.user=user.id;
    req.session.username=user.name;
    sails.log('name:',user.name,"user_id:",req.session.user)
    bcrypt.compare(req.param('password'),user.password,function(err,users){
      if(err){
        return sails.log(err)}
      if(!users){
        req.addFlash('success', '**email id or password not match!');
      return res.redirect('/login');
      }
      else{
        sails.log('true users:',users);
        var token=jwToken.issue({ id: user.id,name:user.name,email:user.email}) ;
        sails.log('token: ',token);
        res.cookie('access_token',token,{httpOnly: true,secure:'secret'});
        return res.redirect('/users');
      }

    })
  })
},
logoutFn:function(req,res){
  req.session.user = null;
  req.addFlash('success', 'Please login to Use forther...!');
 // res.logout();
  //jwt.destroy(token);
  res.redirect('/');
}
};

