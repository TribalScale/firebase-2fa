const firebase2FA = require('./index')
const fb = require('./src/firebase')

describe('Firebase2FA', () => {
  describe('Initialization', () => {
    test('it returns methods initializeWithConfig, initializeWithInstance', () => {
      const actual = firebase2FA
      const methodsArray = ['initializeWithConfig', 'initializeWithInstance']
      methodsArray.forEach(expected => expect(actual).toHaveProperty(expected))
    })

    test('initializeWithConfig fails when not provided a config object', () => {
      const expected = /Please provide a firebase app configuration./
      const actual = firebase2FA.initializeWithConfig
      expect(actual).toThrow(expected)
    })
    ;['apiKey', 'authDomain', 'projectId', 'appId'].forEach(key => {
      const config = {
        apiKey: 'test',
        authDomain: 'test',
        projectId: 'test',
        appId: 'test'
      }
      delete config[key]
      const actual = () => firebase2FA.initializeWithConfig(config)

      test(`intializeWithConfig fails when [${key}] config key is missing`, () => {
        const expected = `${key} value is required.`
        expect(actual).toThrow(expected)
      })
    })

    test('initializeWithConfig fails when app has already been initialized', () => {
      const config = {
        apiKey: 'test',
        authDomain: 'test',
        projectId: 'test',
        appId: 'test'
      }
      firebase2FA.initializeWithConfig(config)
      const actual = () => firebase2FA.initializeWithConfig(config)
      const expected = /Firebase has already been initialized./
      expect(actual).toThrow(expected)
    })

    test('initializeWithConfig succeeds when provided a valid config object', () => {
      const config = {
        apiKey: 'test',
        authDomain: 'test',
        projectId: 'test',
        appId: 'test'
      }
      const actual = () => firebase2FA.initializeWithConfig(config)
      const expected = 'function'
      expect(typeof actual).toBe(expected)
    })
  })

  describe('User', () => {
    describe('Account Creation', () => {
      test('createAccountWithEmail fails when email is not provided', () => {
        const userObj = {
          email: '',
          password: 'test'
        }
        const actual = () => firebase2FA.createAccountWithEmail(userObj)
        const expected = /Email is required./
        expect(actual).toThrow(expected)
      })

      test('createAccountWithEmail fails when password is not provided', () => {
        const userObj = {
          email: 'test',
          password: ''
        }
        const actual = () => firebase2FA.createAccountWithEmail(userObj)
        const expected = /Password is required./
        expect(actual).toThrow(expected)
      })

      test('createAccountWithEmail is successful when email & password are provided', () => {
        const userObj = {
          email: 'test',
          password: 'testpassword'
        }

        const spy = jest.spyOn(fb, 'createUser')
        spy.mockReturnValue('mocked')

        firebase2FA.createAccountWithEmail(userObj)
        expect(spy).toHaveBeenCalledWith(userObj)
        spy.mockRestore()
      })
    })
  })
})
