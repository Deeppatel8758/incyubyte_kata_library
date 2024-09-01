module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    verbose: true,
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "test/"
    ],
    coverageReporters: ["html", "text-summary"],
  };