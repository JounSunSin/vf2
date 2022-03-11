const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().admin.db_url 
  //"https://sun-vf2-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database(); 

exports.createUser = functions.auth.user().onCreate(async (user) => {
    const { uid, email, displayName, photoURL } = user;
    const logUser = {
        email,
        displayName,
        photoURL,
        createdAt: new Date().getTime,
        level: email === functions.config().admin.email ? 0 : 5
    }

    db.ref('users').child(uid).set(logUser);
  });

  exports.deleteUser = functions.auth.user().onDelete(async (user) => {
    const { uid } = user;
    db.ref('users').child(uid).remove();
  });
