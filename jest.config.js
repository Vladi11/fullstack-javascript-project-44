export default {
  testEnvironment: "node",
  transform: {},
  clearMocks: true,
  restoreMocks: true,
  collectCoverageFrom: ["src/**/*.js"],
  coverageThreshold: {
    global: { statements: 95, branches: 90, functions: 100, lines: 95 },
  },
};
