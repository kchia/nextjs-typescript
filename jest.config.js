const nextJest = require("next/jest");
// Under the hood, next/jest is automatically configuring Jest for you, including:
// Setting up transform using SWC
// Auto mocking stylesheets (.css, .module.css, and their scss variants) and image imports
// Loading .env (and all variants) into process.env
// Ignoring node_modules from test resolving and transforms
// Ignoring .next from test resolving
// Loading next.config.js for flags that enable SWC transforms

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
