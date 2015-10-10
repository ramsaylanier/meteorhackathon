Meteor.startup(function(){
  let cookie = Cookie.get('user');

  if (!cookie){
    Meteor.call('createUser', function(err, res){
      if (err){
        alert(err)
      } else {
        Cookie.set('user', res);
      }
    });
  }


})
