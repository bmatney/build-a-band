app.controller("homeController", function(authFactory) {
    console.log('homeController is running');
    var self = this;

    self.logIn = function() {
        authFactory.logIn();
    };
});
