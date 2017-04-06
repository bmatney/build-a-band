app.factory("authFactory", function($firebaseAuth, $location, $http) {
    console.log('authFactory is running');
    var auth = $firebaseAuth();
    var currentUser = {};

    // This code runs whenever the user logs in
    function logIn() {
        auth.$signInWithPopup("google").then(function(firebaseUser) {
            console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
            currentUser = firebaseUser;
            firebaseUser.user.getToken().then(function(idToken) {
                $http({
                    method: 'GET',
                    url: '/users',
                    headers: {
                        id_token: idToken
                    }
                }).then(function(response) {
                    console.log("got response from login: ", response.data);
                    self.userData = response.data;
                });
            });
            $location.path("/manageProfile");

        }).catch(function(error) {
            console.log("Authentication failed: ", error);
        });
    };


    //   This code runs whenever the user logs out
    function logOut() {
        auth.$signOut().then(function() {
            console.log('Logging the user out!');
        });
        $location.path("/login");
    };

    var publicApi = {
        logIn: function() {
            return logIn();
        },
        logOut: function() {
            return logOut();
        },
        currentUser: currentUser
    }
    return publicApi;
});
