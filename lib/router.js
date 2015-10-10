FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('layout', {header:'header', main: 'landingPage'});
    }
});


FlowRouter.route('/:roomId', {
    action: function(params) {
        BlazeLayout.render('layout', {header:'header', main: 'roomPage'});
    }
});
