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

    Meteor.call('updateUser', roomAttributes.creatorId, roomId, roomAttributes.name, function(err, res){
      if (err){
        throw new Meteor.Error(422, err.reason);
      } else {
        console.log('user updated!');
      }
    })

    return roomId;
  },
  addUserToRoom: function(roomId, userId, roomName){
    Rooms.update({_id: roomId}, {$addToSet: {users: userId}});
    var roomName = roomName || Rooms.findOne({_id: roomId}).name;

    Meteor.call('updateUser', userId, roomId, roomName, function(err, res){
      if (err){
        throw new Meteor.Error(422, err.reason);
      } else {
        console.log('user updated!');
      }
    })
  },
  removeUser: function(roomId, userId){

  }
})
