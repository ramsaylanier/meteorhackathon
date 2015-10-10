FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('layout', {header:'header', main: 'list'});
    }
});
