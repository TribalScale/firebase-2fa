const firebase = require("firebase");

const requiredConfigFields = ["apiKey", "authDomain", "projectId", "appId"];

const Firebase2FA = () => {
  let fb = firebase;

  const appHasBeenInitialized = () => fb.apps.length;

  const initializeWithConfig = config => {
    if (!config) {
      throw new Error("Please provide a firebase app configuration.");
    }
    if (appHasBeenInitialized()) {
      throw new Error("Firebase has already been initialized.");
    }
    requiredConfigFields.forEach(field => {
      if (!config[field]) {
        throw new Error(`${field} value is required.`);
      }
    });

    try {
      !appHasBeenInitialized() && fb.initializeApp(config);
    } catch (err) {
      console.error(err);
    }
  };

  const initializeWithInstance = instance => {};

  return {
    initializeWithConfig,
    initializeWithInstance
  };
};

module.exports = Firebase2FA();
