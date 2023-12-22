const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return {
    resolver: {
      sourceExts: [
        ...defaultConfig.resolver.sourceExts,
        "jsx",
        "js",
        "ts",
        "tsx",
      ], // Add your desired file extensions
      extraNodeModules: {
        src: `${__dirname}/src`, // This maps 'src' to the actual path
      },
    },
  };
})();
