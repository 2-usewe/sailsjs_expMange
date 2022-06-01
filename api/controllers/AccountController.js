/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
//==========================find all===========================//
find:function(req,res){
    var userid=req.session.user;
    sails.log("user's userid",userid);
    //sails.log('req.param.id:',req.param('id'))
    User.findOne({id:userid})
    .populate('acco_unts').exec((err,account)=>{
        if(err)return sails.log(err);
        var username=req.session.username;
        sails.log('All accounts : ',account);
        return res.view('account/useracc',{account:account.acco_unts,username:username});
    })
},

//==========================find all===========================//
//==========================create account===========================//
    add:function(req,res){
        User.find().exec((err,user)=>{
            if(err){return res.serverError(err);}
            sails.log('user:',user);
            var userid=req.session.user;
            return res.view('account/addaccount',{user:user,userid:userid});
        });
    },
    create:function(req,res){
        var userid=req.session.user;
        sails.log('userid: ',userid);
        var accountname=req.param('accountname');
        var desc=req.param('desc');
        var members=req.session.user;
        var mem=req.param('members');
        Account.create({accountname:accountname,desc:desc,members:members}).fetch()
        .exec(async(err,account)=>{
            if(err){return res.serverError(err)}
            //account.members.push(req.param('members'));
            sails.log('account_id:',account.id);
            await Account.addToCollection(account.id,'members',mem);
            return res.redirect('/users');
        })
    },
//==========================create account===========================//

//==========================Edit Account ===========================//
edit:function(req,res){
    Account.findOne({id:req.param('id')})
    .exec((err,account)=>{
        if(err){return res.serverError(err)}
        return res.view('account/editaccount',{account:account});
    })
},
updateFn:function(req,res){
    var accountname={
        accountname:req.param('accountname')
    }
    Account.update({id:req.param('id')},accountname)
    .exec((err,account)=>{
        if(err){return res.serverError(err);}
        sails.log('successfully updated ',account);
        return res.redirect('/users')
    })
},
//==========================Edit Account ===========================//

//==========================Delete Account =========================//
delete:function(req,res){
    Account.destroy({id:req.param('id')},function(err){
        if(err){return res.serverError(err);}
        Transaction.destroy({accounts:req.param('id')},function(err){
            if(err){return res.serverError(err)}
            sails.log('account deleted succesfully.');
            return res.redirect('/users');
        });
    });
},
//==========================Delete Account =========================//

//==========================Account Details =========================//
details:function(req,res){
    var income=0;
    var expense=0;
    var transfer=0;
    Account.findOne({id:req.param('id')}).populate('members')
    .exec((err,foundAccount)=>{
        if(err){return res.serverError(err);}
        console.log("foundAccount: ",foundAccount);
        Transaction.find({accounts:req.param('id')},function(err,foundAll){
            if(err){return res.serverError(err);}
            foundAll.forEach(function(transaction){
                if(err){sails.log(err)}
                if(transaction.type==='income'){
                    income=income+transaction.amount;
                }
                else if(transaction.type==='expense'){
                    expense=expense+transaction.amount;
                }
                else if(transaction.type==='transfer'){
                    transfer=transfer+transaction.amount;
                }
            })
            var username=req.session.username;
            return res.view('account/accountdetails',{
                foundAccount:foundAccount,
                foundAll:foundAll,
                income:income,
                expense:expense,
                transfer:transfer,
                username:username,
            });
        });
    });
},
//==========================Account Details =========================//

//==========================Add Members =========================//
addmembers:function(req,res){
    var acc=[];
    Account.findOne(req.param('id'))
    .populate('members')
    .exec((err,foundAcc)=>{
        if(err){return res.serverError(err)}
        sails.log('find Account:',foundAcc.members);
        for(var i=0;i<foundAcc.members.length;i++){
            acc=foundAcc.members[i].email;
            sails.log('acc: ',acc);
        }
        User.find({},function(err,allUser){
            if(err){return res.serverError(err)}
            sails.log('fund allUser:',allUser);
            return res.view('account/member',{
                users:allUser,
                acc:acc,
                foundAcc:foundAcc,
            })
        });
    });
},
postmember:async function(req,res){
    // Account.findOne(req.param('id')).exec((err,foundOne)=>{
    //     if(err){return res.serverError(err)}
    //     foundOne.members.
    // })
    var mid=req.param('members');
    sails.log("members",mid);
    var accid=req.param('id');
    sails.log('Accountid:',accid);
     await Account.addToCollection(accid, 'members', mid)
    .exec((err)=>{
        if(err){return res.serverError(err)}
       // sails.log("addmem: ",addmem);
        return res.redirect('/users')
    })
}
//==========================Add Members =========================//
};

