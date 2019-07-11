const firebase = require("firebase");

const initializeFirebase = config => {
  firebase.initializeApp(config);
};

const createUser = async ({ email, password }) => {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
};

const checkInitializationState = () => firebase.apps.length > 0;

module.exports = {
  checkInitializationState,
  createUser,
  initializeFirebase
};
