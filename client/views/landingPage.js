Template.landingPage.events({
  'submit .create-room-form': function(e){
    e.preventDefault();

    let roomAttributes = {
      name: $('.room-name-field').val()
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
