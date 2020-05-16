const path = require("path");

module.exports = (env, argv) => {
  return {
    mode: "development",
    entry: {
      index: path.join(__dirname, "src", "index.ts"),
    },
    output: {
      path: path.join(__dirname, "www"),
      filename: "index.js",
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [{ loader: "ts-loader" }],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      modules: ["node_modules"],
    },
  };
};
