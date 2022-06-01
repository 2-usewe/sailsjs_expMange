/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find:function(req,res){
      var accountId=req.param('id');
      var userid=req.session.user;
      Account.findOne({id:accountId},function(err,account){
        if(err){return res.serverError(err);}
        sails.log("foundaccount: ",account);
          Transaction.find({accounts:accountId})
          .sort({date:-1})
          .populate('user')
          .exec((err,alltransaction)=>{
              if(err){return res.serverError(err);}
              sails.log('allTransactions: ',alltransaction);
              sails.log('userid: ',userid);
              return res.view('transaction/transactions',{
                account:account,
                transaction:alltransaction,
                userid:userid,
              });
          });
      });
  },
  add:function(req,res){
    var accountId=req.param('id');
    return res.view('transaction/addtransaction',{accountId:accountId});
  },
  create:function(req,res){
    var accountId=req.param('id');
    //req.session.accountId=accountId;
      var trans={
        type:req.param('type'),
        amount:req.param('amount'),
        desc:req.param('desc'),
        date:req.param('date'),
        accounts: req.param('id'),
        user: req.session.user,
      };
      sails.log('accounts :',req.param('id'));
      Transaction.create(trans).fetch()
      .exec((err,transc)=>{
        if(err){return res.serverError(err);}
        if(!transc){return res.notFound();}
        sails.log("transaction: ",transc);
        return res.redirect("/transaction/" +accountId+ "/all");
      })
  },
  edit:function(req,res){
    sails.log('accid:',req.param('accid'),'trans id: ',req.param('id'));
    var accid=req.param('accid');
      Transaction.findOne({id:req.param('id')}).exec((err,transac)=>{
        if(err){return res.serverError(err);}
        sails.log('transaction:',transac);
        return res.view('transaction/edittransaction',{transac:transac,accid:accid});
      });
  },
  updateFn:function(req,res){
    var trans={
      amount:req.param('amount'),
      desc:req.param('desc'),
      date:req.param('date'),
      type:req.param('type',)
    };
    var accid=req.param('accid');
    sails.log('accid:',req.param('accid'),'trans id: ',req.param('id'));
    Transaction.update({id:req.param('id')},trans)
    .exec((err,uptrans)=>{
      if(err){return res.serverError(err);}
      sails.log('update transaction:',uptrans);
      return res.redirect("/transaction/" +accid+ "/all");
    })
  },
  delete:function(req,res){
    var accid=req.param('accid');
    Transaction.destroy({id:req.param('id')},(err,deletedata)=>{
      if(err){return res.serverError(err);}
      sails.log("deleted successfuly.",accid);
      return res.redirect("/transaction/" +accid+ "/all");
    });
  }

};

