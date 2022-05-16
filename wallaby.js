module.exports = function (wallaby) {
  return {
    files: ["package.json", "tsconfig.json", "src**/*.ts", "!src**/*.test.ts"],

    tests: ["src**/*.test.ts"],

    env: {
      type: "node",
      params: {
        runner: "--experimental-vm-modules",
      },
    },

    testFramework: "ava",
  };
};
