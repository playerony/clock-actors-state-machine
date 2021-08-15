module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  modulePathIgnorePatterns: ['node_modules'],
  testMatch: ['**/?(*.)+(spec|test).+(js|jsx)'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.js'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@app': '<rootDir>/src/app',
    '@machines/(.*)': '<rootDir>/src/machines/$1',
    '@machines': '<rootDir>/src/machines',
    '@ui/(.*)': '<rootDir>/src/ui/$1',
    '@ui': '<rootDir>/src/ui',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@utils': '<rootDir>/src/utils',
  },
};
