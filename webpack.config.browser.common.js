// Copyright (c) 2014-2019, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
"use strict"
//
const path = require('path')
//
module.exports = 
{
	devtool: "source-map",
	context: __dirname,
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "myqueenero-core.js",
        library: "myqueenero_core_js",
        libraryTarget: "umd"
	},
	cache: false,
	resolve: {
		alias: {
			"fs": "html5-fs"
		},
		extensions: ['.js', '.jsx', '.wasm', '.css', '.json', 'otf', 'ttf', 'eot', 'svg'],
		modules: [
			'node_modules'
		]
	},
	stats: {
		colors: true
	},
	module: {
		rules: [
			{
				test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{ loader: 'file-loader' }
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style!css!postcss' }
				]
			},
			{
				test: /\.styl$/,
				use: [
					{ loader: 'style!css!postcss!stylus?paths=node_modules' }
				]
			},
			{
				test: /\.js$/,
				exclude: {
					test: [
						path.join(__dirname, 'node_modules')
					],
					exclude: [
						'queenero_utils/MyQueeneroCoreCpp_ASMJS.asm.js',
						'queenero_utils/MyQueeneroCoreCpp_ASMJS.wasm'
					]
				},
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: false
							// ,
							// presets: [ "es2015" ],
							// plugins: ["transform-runtime"]
						}
					}
				]
			}
		]
	},
	externals: [
		(function () {
			var IGNORES = [
				'electron'
			];
			return function (context, request, callback) {
				if (IGNORES.indexOf(request) >= 0) {
					return callback(null, "require('" + request + "')");
				}
				return callback();
			};
		})()
	]
}