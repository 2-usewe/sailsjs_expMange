/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name:{
      type:'string',
      required:true,
    },
    email:{
      type:'string',
      required:true,
      unique:true,
    },
    password:{
      type:'string',
      required:true
    },
    acco_unts:{
      collection: 'account',
      via:'members'
    },
    transactions:{
      collection:'transaction',
      via:'user',
    }
  },
  customToJSON: function() {
    return _.omit(this,['password']);
 },
 datastores:'mongodb',

};

