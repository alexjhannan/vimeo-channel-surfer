var webpack = require('webpack');
var path = require('path');

// note that __dirname is implicit in these path.resolves
const APP_DIR = path.resolve('src/app');
const BUILD_DIR = path.resolve('src/public');

var config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'	// output location is src/public/bundle.js
	},
	module: {
		loaders: [
			{
				loader: 'babel',	// run babel loader
				test: '/\.jsx?/',	// on .js and .jsx files
				include: APP_DIR	// in this directory
			}
		]
	}
};

module.exports = config;