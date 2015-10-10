Meteor.publish('roomlist', function(){
  return Rooms.find();
});

Meteor.publish('currentUser', function(userId){
  return Users.find({_id: userId});
});
