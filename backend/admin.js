// admin.js

const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyAdR8W0VFSrTamOG2y7Ua8Ut9eoWmYpnVg",
    authDomain: "lpfm-elitebytetech.firebaseapp.com",
    databaseURL: "https://lpfm-elitebytetech.firebaseio.com",
    projectId: "lpfm-elitebytetech",
    storageBucket: "lpfm-elitebytetech.appspot.com",
    messagingSenderId: "195897383171",
    appId: "1:195897383171:web:3e5224c5eb89eaba"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.database()
const fbauth = firebase.auth()


module.exports = {
    db, fbauth
}