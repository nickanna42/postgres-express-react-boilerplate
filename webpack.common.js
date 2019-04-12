const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {},
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/js',
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['../**/*.bundle.*'],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /(\.jpg|\.jpeg|\.gif|\.png|\.svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 25600,
            fallback: 'file-loader',
            name: '[name].bundle.[ext]',
            outputPath: '../img',
            publicPath: '/img',
          },
        }],
      },
      {
        test:  /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 25600,
            fallback: 'file-loader',
            name: '[name].bundle.[ext]',
            outputPath: '../styles',
            publicPath: '/styles',
          },
        }],
      },
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                targets: [
                  'last 2 chrome versions',
                  'last 2 ff versions',
                  'last 2 edge versions',
                  'ie >= 10',
                  'safari >= 8'
                ]
              }
            ],
            '@babel/preset-react',
          ],
        },
      },
    ],
  },
};
