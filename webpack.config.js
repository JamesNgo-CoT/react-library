const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = (env, { mode }) => {
	const isProduction = mode === 'production';

	return {
		mode: isProduction ? 'production' : 'development',
		entry: path.resolve(__dirname, 'src/index.js'),
		output: {
			clean: isProduction,
			path: path.resolve(__dirname, 'dist'),
			filename: 'index.js',
			library: {
				name: 'ReactLibrary',
				type: 'umd'
			}
		},
		externals: {
			react: {
				commonjs: 'react',
				commonjs2: 'react',
				amd: 'react',
				root: 'React'
			},
			'prop-types': {
				commonjs: 'prop-types',
				commonjs2: 'prop-types',
				amd: 'prop-types',
				root: 'PropType'
			}
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							cacheCompression: false,
							envName: isProduction ? 'production' : 'development'
						}
					}
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				{
					test: /\.s[ac]ss$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2
							}
						},
						'resolve-url-loader',
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				},
				{
					test: /\.(png|jpg|gif)$/i,
					use: {
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'file/[name].[hash].[ext]'
						}
					}
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack']
				},
				{
					test: /\.(eot|otf|ttf|woff|woff2)$/,
					loader: require.resolve('file-loader'),
					options: {
						name: 'file/[name].[hash].[ext]'
					}
				}
			]
		},
		plugins: [],
		resolve: {
			extensions: ['.js', '.jsx']
		},
		optimization: {
			minimize: isProduction,
			minimizer: [
				new TerserWebpackPlugin({
					terserOptions: {
						compress: {
							comparisons: false
						},
						mangle: {
							safari10: true
						},
						output: {
							comments: false,
							ascii_only: true
						},
						warnings: false
					}
				}),
				new CssMinimizerPlugin()
			]
		}
	};
};
