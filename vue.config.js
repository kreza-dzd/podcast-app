module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/podcast-app/" : "/",
};
