/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      accountname:{
        type:'string',
        required:true
      },
      desc:{
        type:'string',
      },
      members:{
        collection: 'user',
        via: 'acco_unts'
      },
      trans_action:{
        collection:'transaction',
        via:'accounts'
      }
      
  },

};

