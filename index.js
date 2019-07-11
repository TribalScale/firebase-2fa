const firebase = require('firebase')
const fb = require('./src/firebase')

const requiredConfigFields = ['apiKey', 'authDomain', 'projectId', 'appId']

const Firebase2FA = () => {
  /**
   * @param {Object} config the configuration object needed to initialize the firebase SDK
   * @param {string} config.apiKey the API key tied to the firebase account
   * @param {string} config.authDomain the unique URL for the firebase project
   * @param {string} config.projectId the project identifier for the firebase project
   * @param {string} config.appId the generated app ID for the firebase project
   */
  const initializeWithConfig = config => {
    const appHasBeenInitialized = fb.checkInitializationState()

    if (!config) {
      throw new Error('Please provide a firebase app configuration.')
    }
    if (appHasBeenInitialized) {
      throw new Error('Firebase has already been initialized.')
    }
    requiredConfigFields.forEach(field => {
      if (!config[field]) {
        throw new Error(`${field} value is required.`)
      }
    })

    try {
      fb.initializeFirebase(config)
    } catch (err) {
      console.error(err)
    }
  }

  const initializeWithInstance = instance => {}

  /**
   * This function attempts to create a new firebase user with email/password
   * @param {string} [email=""] the email for the user account
   * @param {string} [password=""] the password for the user account
   * @param {boolean} [sendVerificationEmail=false] whether or not to send a verification email upon account creation
   */
  const createAccountWithEmail = ({
    email = '',
    password = '',
    sendUserVerification = false
  }) => {
    if (!email || !password) {
      throw new Error(`${!email ? 'Email' : 'Password'} is required.`)
    }
    return fb.createUser({ email, password }).catch(getErrorMessage)
  }

  return {
    createAccountWithEmail,
    initializeWithConfig,
    initializeWithInstance
  }
}

module.exports = Firebase2FA();
