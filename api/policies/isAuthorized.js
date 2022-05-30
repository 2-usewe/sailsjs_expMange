const jwt = require("jsonwebtoken");
module.exports=function(req,res,next){
    let token;
    if(req.headers && req.headers.token){
        token=req.headers.token;
        if(token.length<=0)
        return res.json(401,{err: 'Format is Authorization: Bearer[token]'});
    }
    else if (req.param('token')){
        token = req.param('token');
        delete req.query.token;
    }
    else {
        return res.json(401, {err: 'No Authorization header was found'});
        }
        jwToken.verify(token, function (err, token) {
            if (err) return res.json(401, {err: 'Invalid Token!'});
            req.token = token; // This is the decrypted token or the payload you provided
            next();
            });           
    
}