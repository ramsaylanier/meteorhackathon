Meteor.publish('roomlist', function(){
  return Rooms.find();
})
