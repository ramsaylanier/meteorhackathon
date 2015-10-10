Rooms = new Mongo.Collection('rooms');

Meteor.methods({
  createRoom: function(roomAttributes){

    if (!roomAttributes.name){
      throw new Meteor.Error(422, 'You must name your room, silly pants.');
    }

    if (!roomAttributes.username){
      throw new Meteor.Error(422, 'You must have a username.');
    }

    let room = Rooms.insert(roomAttributes);

    Meteor.call('createUser', roomAttributes.cookie, roomAttributes.username);

    return
  }
})
