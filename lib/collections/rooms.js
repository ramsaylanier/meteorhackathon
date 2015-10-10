Rooms = new Mongo.Collection('rooms');

Meteor.methods({
  createRoom: function(roomAttributes){

    if (!roomAttributes.name){
      throw new Meteor.Error(422, 'You must name your room, silly pants.');
    }

    if (!roomAttributes.username){
      throw new Meteor.Error(422, 'You must have a username.');
    }

    let roomId = Rooms.insert(roomAttributes);

    let newRoom = {
      roomId: roomId,
      name: roomAttributes.name
    }

    Meteor.call('updateUser', roomAttributes.creatorId, newRoom, function(err, res){
      if (err){
        throw new Meteor.Error(422, err.reason);
      } else {
        console.log('user updated!');
      }
    })

    return roomId;
  }
})
