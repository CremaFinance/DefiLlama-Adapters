module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  automock: false,
  setupFilesAfterEnv: [
    "./setupJest.js"
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};