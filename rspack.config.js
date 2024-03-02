const path = require("path");
const rspack = require("@rspack/core");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");
const fs = require("fs");
const isProduction = process.env.NODE_ENV === "production";
const isLocalExist = fs.existsSync(path.resolve(__dirname, ".env.local"));
require("dotenv").config({
  path: isLocalExist
    ? path.resolve(__dirname, ".env.local")
    : path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  experiments: {
    rspackFuture: {
      disableTransformByDefault: true,
    },
  },
  entry: {
    main: "./src/main.tsx",
  },
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "source-map",
  entry: { main: "./src/main.tsx" },
  devServer: {
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    proxy: {
      "/api/": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: "builtin:swc-loader",
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                  development: !isProduction,
                  refresh: !isProduction,
                },
              },
            },
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset",
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "sass-loader",
          },
        ],
        type: "css",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {},
                  autoprefixer: {},
                },
              },
            },
          },
        ],
        type: "css",
      },
      {
        test: /\.module\.scss$/i,
        type: "css/module", // this is enabled by default for module.css,   so you don't need to specify it
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimization: {
    minimize: false, // Disabling minification because it takes too long on CI
  },
  output: {
    publicPath: "/",
    filename: "[name].[contenthash].bundle.js",
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: "./index.html" }),
    new rspack.DefinePlugin({ "process.env.NODE_ENV": "'development'" }),
    !isProduction && new ReactRefreshPlugin(),
    new rspack.DefinePlugin({
      "process.env": {
        ...process.env,
      },
    }),
  ].filter(Boolean),
};
