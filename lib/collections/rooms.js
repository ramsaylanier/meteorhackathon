Rooms = new Mongo.Collection('rooms');

Meteor.methods({
  createRoom: function(roomAttributes){

    if (!roomAttributes.name){
      throw new Meteor.Error(422, 'You must name your room, silly pants.');
    }
    
    return Rooms.insert(roomAttributes);
  }
})
