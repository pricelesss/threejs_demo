process.env.NODE_ENV = 'development';
var webpack = require('webpack');
var path = require("path");
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');




function getEntry() {
    var entry = {};
    glob.sync(process.cwd() + '/entry/*.js').forEach(function (name) {
        var n = name.match(/([^/]+?)\.js/)[1];
        entry[n] = './entry/'+n+'.js';
    });
    console.log(entry)
    return entry;
}
module.exports = {
    devtool: "eval-source-map",
    refreshEntry: function () {
        this.entry = getEntry();
    },
    entry: getEntry(),
    output: {
        path: 'build/',
        filename: '[name].js',
        sourceMapFilename: '/[file].map'
    },
    resolve: {
        alias: {
            plugins:path.join(process.cwd(),'public/common/js/plugins')
        },
        extensions: ['', '.js', '.jsx']
    },
    externals: [

    ],
    sassLoader:{
        includePaths:path.join(__dirname, "public/common/scss")
    },
    resolveUrlLoader: {
        root:process.cwd()
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query:{
                    env:''
                }
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.scss/,
                loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
            }, {
                test: /\.(css)$/,
                loaders: ['style', 'css', 'resolve-url']
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query:{
                    limit:10000,
                    name:'../build_wap/buildImg/[name].[ext]'
                }
            },{
                test: /\.(gif|swf)$/,
                loader:  'file-loader?name=build/buildImg/[name].[ext]'
            },{
                test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
                loader: 'file-loader?name=build/buildImg/[name].[ext]'
            },
            { test: /\.glsl$/, loader: 'raw-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),

        new HtmlWebpackPlugin({
                filename:'index.html',
                template:'view/index.ejs',
                inject:false
            })
    ],
    node: {
        global: 'window',
        process: true,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};



