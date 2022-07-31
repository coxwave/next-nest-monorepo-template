module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.ts?$': 'ts-jest' },

  collectCoverage: false,
  coverageDirectory: '<rootDir>/src/jest/coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

  globalTeardown: '<rootDir>/src/jest/teardown.ts',
};
