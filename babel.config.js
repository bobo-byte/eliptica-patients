module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          verbose: true,
          allowUndefined: false,
        },
      ],
      [
        "@babel/plugin-proposal-private-methods",
        {
          loose: true,
          assumptions: {
            privateFieldsAsProperties: true,
            setPublicClassFields: true,
          },
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
