Template.roomList.onCreated(function(){
	var instance = this;

	instance.ready = new ReactiveVar(false);
	instance.rooms = new ReactiveVar();

	let subscription = instance.subscribe('roomList');

	instance.autorun( function(){
		subscription = instance.subscribe('roomList');

		if (subscription.ready()){
			instance.ready.set(true);
			instance.rooms.set(Rooms.find());
		} else {
	      instance.ready.set(false);
	    }
	});
})
