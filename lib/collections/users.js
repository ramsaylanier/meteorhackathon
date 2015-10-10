Users = new Mongo.Collection('users');

Meteor.methods({
  createUser: function(){
    console.log('creating new user');
    return Users.insert({});
  }
})
