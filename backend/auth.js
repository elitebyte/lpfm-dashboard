const { db, fbauth } = require('./admin')

function addUser(email, password, callback) {

//	firebase.createUser({
//
//		email : email,
//		password : password
//	
//	}, function(error, userData) {
//		
//		callback(error, userData.uid);
//
//	});
}

function authenticate(email, password, callback) {
    return fbauth.signInWithEmailAndPassword(email, password)
        .then(function() {
            console.log("Successfully logged in with UID: " + fbauth.currentUser.uid)
            callback(true)
            return true

        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          if(errorMessage != "") {
              console.log("Firebase auth failed with error: " + errorMessage)
              return false
          }
          callback(false)
    });

}

function getUserObject() {
    return fbauth.currentUser
}

function isAuthenticated() {
    if(fbauth.currentUser == null) {
        return false
    }
    return true
}


module.exports = {

	addUser : addUser,
	authenticate : authenticate,
    isAuthenticated: isAuthenticated,
    getUserObject: getUserObject

}