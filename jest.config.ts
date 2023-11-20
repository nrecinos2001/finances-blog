module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.service.ts',
    '**/commons/helpers/*.{ts,js}',
    '**/*.resolver.ts',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@Common/(.*)': '<rootDir>/src/commons/$1',
    '@Config/(.*)': '<rootDir>/src/config/$1',
    '@Auth/(.*)': '<rootDir>/src/auth/$1',
    '@User/(.*)': '<rootDir>/src/user/$1',
    '@Constants/(.*)': '<rootDir>/src/constants/$1',
    '@Post/(.*)': '<rootDir>/src/post/$1',
    '@Likes/(.*)': '<rootDir>/src/likes/$1',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
