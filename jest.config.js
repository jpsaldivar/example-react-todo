module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageThreshold: {
    "./src/**/*.tsx": {
      branches: 80,
      functions: 50,
      lines: 80,
      statements: -10,
    },
  },
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
      https://jestjs.io/docs/webpack#mocking-css-modules */
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    /* Handle image imports
      https://jestjs.io/docs/webpack#handling-static-assets */
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",

    /* Manage absolute imports and Module path aliases*/
    "^@assets/(.*)$": "<rootDir>/assets/$1",
    "^@ui/(.*)$": "<rootDir>/src/ui/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testURL: "http://localhost",
};
