FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('layout', {header:'header', main: 'landingPage'});
    }
});

FlowRouter.route('/webcamTest', {
	action: function(){
		BlazeLayout.render('layout', {header: 'header', main: 'userWebcam'})
	}
})


FlowRouter.route('/:roomId', {
    action: function(params) {
        BlazeLayout.render('layout', {header:'header', main: 'roomPage'});
    }
});
