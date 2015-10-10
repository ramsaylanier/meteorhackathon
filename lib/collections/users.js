Users = new Mongo.Collection('users');

Meteor.methods({
  createUser: function(){
    console.log('creating new user');
    return Users.insert({rooms: []});
  },
  updateUser: function(userId, newRoom){
    return Users.update({_id: userId}, {$addToSet: {rooms:newRoom}});
  }
})
