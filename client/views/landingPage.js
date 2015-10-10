Template.landingPage.onCreated(function(){

  let instance = this;
  let cookie = Cookie.get('user');

  instance.ready = new ReactiveVar(false);
  instance.user = new ReactiveVar();

  let subscription = instance.subscribe('currentUser', cookie);

  instance.autorun( function(){
    subscription = instance.subscribe('currentUser', cookie);

    if (subscription.ready()){
      instance.ready.set(true);
    } else {
      instance.ready.set(false);
    }
  });

})


Template.landingPage.helpers({
  userRooms: function(){
    let user = Users.findOne(Users.findOne(user))

    if (user){
      return user.rooms;
    }
  }
})

Template.landingPage.events({
  'submit .create-room-form': function(e){
    e.preventDefault();

    let roomAttributes = {
      name: $('.room-name-field').val(),
      username: $('.room-username-field').val(),
      creatorId: Cookie.get('user')
    }

    Meteor.call('createRoom', roomAttributes, function(err, res){
      if (err){
        alert(err)
      } else {
        FlowRouter.go('/' + res);
      }
    } )

  },

  'submit .join-room-form': function(e){
    e.preventDefault();

    let roomId = $('.room-id-field').val();
    let userId = Cookie.get('user');

    Meteor.call('addUserToRoom', roomId, userId , function(err, res){
      if (err){
        alert(err)
      } else {
        FlowRouter.go('/' + roomId);
      }
    } )

  }
})
