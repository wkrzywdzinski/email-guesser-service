const jestConfig = {
  verbose: true,
  testURL: 'http://localhost/',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
};

module.exports = jestConfig;
