/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'users/index' },
  'get /signup':{view:'users/signup'},
  'get /login':{view:'users/login'},

  'post /signup':"UserController.signup",
  'post /login':"UserController.login",
  '/logout': 'UserController.logoutFn',
  
  //accounts
  'get /users':'AccountController.find',
  'get /addaccount':'AccountController.add',
  'post /addaccount':'AccountController.create',

  'get /editaccount/:id':'AccountController.edit',
  'post /updateaccount/:id':'AccountController.updateFn',
  'get /deleteaccount/:id':'AccountController.delete',

  'get /accountdetails/:id':'AccountController.details',
  'get /addmember/:id':'AccountController.addmembers',
  'post /addmember/:id':'AccountController.postmember',

  //transactions
  'get /transaction/:id/all':'TransactionController.find',
  'get /transaction/:id/add':'TransactionController.add',
  'post /transaction/:id/create':'TransactionController.create',
  'get /transaction/:accid/edit/:id':'TransactionController.edit',  
  'post /transaction/:accid/update/:id':'TransactionController.updateFn',
  'get /transaction/:accid/delete/:id':'TransactionController.delete',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
