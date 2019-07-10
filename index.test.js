const firebase2FA = require("./index");

describe("Firebase2FA", () => {
  describe("initialization", () => {
    test("it returns methods initializeWithConfig, initializeWithInstance", () => {
      const actual = firebase2FA;
      const methodsArray = ["initializeWithConfig", "initializeWithInstance"];
      methodsArray.forEach(expected => expect(actual).toHaveProperty(expected));
    });

    test("initializeWithConfig fails when not provided a config object", () => {
      const expected = /Please provide a firebase app configuration./;
      const actual = firebase2FA.initializeWithConfig;
      expect(actual).toThrow(expected);
    });

    ["apiKey", "authDomain", "projectId", "appId"].forEach(key => {
      const config = {
        apiKey: "test",
        authDomain: "test",
        projectId: "test",
        appId: "test"
      };
      delete config[key];
      const actual = () => firebase2FA.initializeWithConfig(config);

      test(`intializeWithConfig fails when [${key}] config key is missing`, () => {
        const expected = `${key} value is required.`;
        expect(actual).toThrow(expected);
      });
    });

    test("initializeWithConfig fails when app has already been initialized", () => {
      const config = {
        apiKey: "test",
        authDomain: "test",
        projectId: "test",
        appId: "test"
      };
      firebase2FA.initializeWithConfig(config);
      const actual = () => firebase2FA.initializeWithConfig(config);
      const expected = /Firebase has already been initialized./;
      expect(actual).toThrow(expected);
    });

    test("initializeWithConfig succeeds when provided a valid config object", () => {
      const config = {
        apiKey: "test",
        authDomain: "test",
        projectId: "test",
        appId: "test"
      };
      const actual = () => firebase2FA.initializeWithConfig(config);
      const expected = "function";
      expect(typeof actual).toBe(expected);
    });
  });
});
