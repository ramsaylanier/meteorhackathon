videoStream = new Meteor.Stream('videoStream');
chat = new Meteor.Stream('chat')

Streamy.BroadCasts.allow = function(data, from) {
  // from is the socket object
  // data contains raw data you can access:
  //  - the message via data.__msg
  //  - the message data via data.__data

  return true;
};

Streamy.on('broadcastRequest', function(data){
	var roomId = data.roomId
	Streamy.broadcast(roomId, data)
})

