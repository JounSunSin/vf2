const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().admin.db_url 
});

const db = admin.database(); 
const fdb = admin.firestore(); 

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user;
  const logUser = {
      email,
      displayName,
      photoURL,
      createdAt: new Date().getTime(),
      level: email === functions.config().admin.email ? 0 : 5
  }

  db.ref('users').child(uid).set(logUser);
});

exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  const { uid } = user;
  db.ref('users').child(uid).remove();
});

// eslint-disable-next-line no-unused-vars
exports.incrementBoardCount = functions.firestore.document('board/{bid}').onCreate(async (snap, context) => {
    
  try {
    await fdb.collection('meta').doc('board').update('count', admin.firestore.FieldValue.increment(1))
  } catch (e) {
    await fdb.collection('meta').doc('board').set({ count: 1 })
  }
});

// eslint-disable-next-line no-unused-vars
exports.decrementBoardCount = functions.firestore.document('board/{bid}').onDelete(async(snap, context) => {
    await fdb.collection('meta').doc('board').update('count', admin.firestore.FieldValue.increment(-1))
});
