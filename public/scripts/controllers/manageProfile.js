app.controller('ManageProfileController', ['$firebaseAuth', '$http', 'authFactory', '$scope', '$location', function($firebaseAuth, $http, authFactory, $scope, $location) {
    console.log('mpc is running, dont let it get away');
    var auth = $firebaseAuth();
    var self = this;
    self.logOut = authFactory.logOut;

    self.newMusician = {};
    self.musicians = [];
    self.currentUser = authFactory.currentUser;
    console.log(self.currentUser);

    auth.$onAuthStateChanged(function(firebaseUser) {
        // firebaseUser will be null if not logged in
        self.currentUser = firebaseUser;
        if (firebaseUser) {
            // This is where we make our call to our server
            firebaseUser.getToken().then(function(idToken) {
                $http({
                    method: 'GET',
                    url: '/privateData',
                    headers: {
                        id_token: idToken,
                    },
                }).then(function(response) {
                    self.secretData = response.data;
                });
            });
        } else {
            console.log('Not logged in or not authorized.');
            self.secretData = [];
        }
        $scope.$apply();

    });

    self.addMusician = function() {
        console.log('add musician');
        $http.post('/musicians', self.newMusician)
            .then(function(response) {
                    self.musicians.push(response.data);
                    console.log(response);
                    alert('Profile Updated');
                    $location.path("/manageProfile");
                },
                function(response) {
                    console.log('post error:', response);
                }
            );
    };

}, ]);
