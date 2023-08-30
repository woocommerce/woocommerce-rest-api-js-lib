module.exports = {
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "mjs"],
  transform: {
    "^.+\\.(js|mjs)$": ["@swc/jest"],
  },
  testEnvironment: "node",
};
