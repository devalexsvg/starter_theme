const path = require('path'),
      VueLoaderPlugin = require("vue-loader").VueLoaderPlugin,
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      pxr = require('@alexsvg/postcss-pxrem'),
      webpack = require('webpack'),
      poststylus = require('poststylus'),
      StyleEntriesFix = require("webpack-fix-style-only-entries"),
      TerserPlugin = require('terser-webpack-plugin'),
      OptimizeCSSAssetsPlugin  = require('optimize-css-assets-webpack-plugin'),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
      imageminMozjpeg = require('imagemin-mozjpeg'),
      ImageminPlugin = require('imagemin-webpack-plugin').default,
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin")
      

/**
 * Makes all variables from .env file available on `process.env` object
 * Make sure you DO NOT USE any back-end private credentials from the file!
 */
require('dotenv').config()

const safeEnvVars = ['WP_ENV', 'WP_HOME', 'WP_SITEURL']

function getSafeEnvVars() {
  const frontEnvVars = {
    ajaxurl: `/wp/wp-admin/admin-ajax.php`,
    MOBILE_MAX_WIDTH: 899,
  }
  safeEnvVars.forEach(name => {
    frontEnvVars[name] = process.env[name]
  })
  return frontEnvVars
}


module.exports = env => {

  const devServerPort = process.env.DEVSERVER_PORT || 9573,
        browserSyncPort = process.env.BROWSERSYNC_PORT || 3377

  function isDevelopment() {
    return process.env.NODE_ENV === 'development' || process.env.WP_ENV !== 'production'
  }

  function isProduction() {
    return process.env.NODE_ENV === 'production' || process.env.WP_ENV === 'production'
  }

  function isDevServer() {
    return !!process.env.DEV_SERVER
  }

  function themePath(append = '') {
    return 'assets' + (append.indexOf('/') === 0 ? append : `/${append}`)
  }

  return {

    mode: isDevelopment() ? 'development' : 'production',

    entry: {
      'dist/main': path.resolve(__dirname, 'front/main.ts'),
      'dist/admin': path.resolve(__dirname, 'front/admin.ts'),
      'dist/fonts-style': path.resolve(__dirname, 'front/fonts.styl'),
      'dist/main-style': path.resolve(__dirname, 'front/main.styl'),
      'dist/admin-style': path.resolve(__dirname, 'front/admin.styl'),
      'dist/editor-style': path.resolve(__dirname, 'front/editor.styl'),
    },

    output: {
      path: path.resolve(__dirname, 'assets'),
      publicPath: '/assets/',
      filename: '[name].js',
    },

    devServer: {
      contentBase: path.resolve(__dirname, '/'),
      publicPath: `http://localhost:${devServerPort}/`,
      compress: true,
      port: 2468,
      proxy: {
        '/wp/': process.env.WP_SITEURL
      },
      overlay: {
        warnings: true,
        errors: true,
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'vue$': 'vue/dist/vue.esm.js',
      },
      extensions: ['*', '.js', '.vue', '.json', '.ts', '.tsx']
    },


    module: {
      rules: [

        // ----- STYLES ----- //

        {
          test: /\.styl(us)?$/,
          include: [
            path.resolve(__dirname, 'front'),
          ],
          use: (function() {
            const loaders = [
              'vue-style-loader',
              'css-loader',
              'postcss-loader',
              {
                loader: 'stylus-loader',
                options: {
                  chunks: ['app'],
                  use: [poststylus([pxr({ defFontSize: 16 })])],
                  'include css': true
                }
              },
            ]
            // Disable CSS extractor when in devserver mode
            if (!isDevServer()) {
              loaders.splice(1, 0, {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: isDevelopment()
                },
              })
            }
            return loaders
          }()),
        },
        {
          test: /\.css$/,
          use: (function() {
            const loaders = [
              'vue-style-loader',
              'css-loader',
              'postcss-loader',
            ]
            if (!isDevServer()) {
              loaders.splice(1, 0, {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: isDevelopment()
                },
              })
            }
            return loaders
          }())
        },
        {
          test: /\.sc|ass$/,
          use: (function() {
            const loaders = [
              'vue-style-loader',
              "css-loader", // translates CSS into CommonJS
              'postcss-loader',
              "sass-loader" // compiles Sass to CSS
            ]
            if (!isDevServer()) {
              loaders.splice(1, 0, {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: isDevelopment()
                },
              })
            }
            return loaders
          }())
        },


        // ----- SCRIPTS ----- //

        {
          test: /\.vue$/,
          include: [path.join(__dirname, 'front')],
          use: [
            {
              loader: 'vue-loader',
              options: {
                loaders: {}
              }
            }
          ],
        },
        {
          test: /\.js$/,
          include: [path.resolve(__dirname, './node_modules'), path.join(__dirname, 'front')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              }
            },
          ]
        },
        {
          test: /\.tsx?$/,
          include: [path.join(__dirname, 'front')],
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: process.env.TS_TRANSPILE_ONLY,
                appendTsSuffixTo: [/\.vue$/],
              }
            },
          ],
        },
        {
                test:/\.jsx$/,
                loader:'webpack-px-to-rem',
                 query:{
                    basePx:10,
                    min:1,
                    floatWidth:3
                }

            },


        // ----- ASSETS ----- //
        
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          include: [path.join(__dirname, 'images')],
          loader: 'file-loader',
          options: {
            emitFile: true, // Don't forget emit images
            name: `images/[name].[ext]?[hash]`
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
          options: {
            name: `fonts/[name].[ext]?[hash]`
          }
        }
      //   imagemin( ['img/**/**.{jpg,png,jpeg}'], {
      //     destination: 'assets/img/', // RESOLVE
      //     plugins: [
      //         webp( { quality: 60 } )
      //     ]
      // } )
      ]
    },


    plugins: [

      new BrowserSyncPlugin({
        host: 'localhost',
        port: browserSyncPort,
        proxy: process.env.WP_HOME,
        open: false,
      }),

      new MiniCssExtractPlugin({
        filename: `[name].css`,
      }),

      new StyleEntriesFix({
        extensions: ['less', 'sass', 'scss', 'css', 'styl', 'stylus']
      }),

      new webpack.DefinePlugin({
        'process.env': JSON.stringify(getSafeEnvVars())
      }),

      new CopyWebpackPlugin([{
        from: 'img/**/**',
        to: path.resolve(__dirname, 'assets')
      }]),

      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: ({quality: [50]}),
        plugins: [
          imageminMozjpeg({quality: 50})
        ]
      }),
      new ImageminWebpWebpackPlugin({
        config: [{
          test: /\.(jpe?g|png)/,
          options: {
            quality:  50
          }
        }],
        overrideExtension: true,
        detailedLogs: false,
        silent: false,
        strict: true
      }),

      new VueLoaderPlugin()

    ],
    

    optimization: {

      minimize: isProduction(),

      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],

      splitChunks: {
        cacheGroups: {
          // commons: {
          //   test: /[\\/]node_modules[\\/]/,
          //   name(module, chunks, cacheGroupKey) {
          //     // console.log(chunks.map(it => it.name).join(' + '))
          //     // const allChunksNames = chunks.map((item) => item.name).join('~')
          //     console.log(`${chunks[0].name}.vendor`)
          //     return `${chunks[0].name}.vendor`;
          //   },
          //   chunks: "initial",
          // },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
  }
}
