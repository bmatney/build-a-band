app.controller('MusicianListController', ['$http', 'authFactory', function($http, authFactory) {
    console.log('mlc is running, dont let it get away');
    var self = this;

    self.logOut = function() {
        authFactory.logOut();
    };
    self.musicians = [];
    getMusicians();


    function getMusicians() {
        $http.get('/musicians')
            .then(function(response) {
                console.log(response.data);
                self.musicians = response.data;
            });
    }
}, ]);
