Rooms = new Mongo.Collection('rooms');

Meteor.methods({
  createRoom: function(roomAttributes){

    if (!roomAttributes.name){
      throw new Meteor.Error(422, 'You must name your room, silly pants.');
    }

    if (!roomAttributes.username){
      throw new Meteor.Error(422, 'You must have a username.');
    }

    let roomName = roomAttributes.name;
    let users = [roomAttributes.creatorId];

    let roomId = Rooms.insert({name: roomName, users: users});

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
  },
  addUserToRoom: function(roomId, userId){
    Rooms.update({_id: roomId}, {$addToSet: {users: userId}});
  },
  removeUser: function(roomId, userId){

  }
})
