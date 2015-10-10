Template.landingPage.events({
  'submit .create-room-form': function(e){
    e.preventDefault();

    let roomAttributes = {
      name: $('.room-name-field').val(),
      username: $('.room-username-field').val(),
      cookie: Cookie.get('user')
    }

    Meteor.call('createRoom', roomAttributes, function(err, res){
      if (err){
        alert(err)
      } else {
        FlowRouter.go('/' + res);
      }
    } )

  }
})
