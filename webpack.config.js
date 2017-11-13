var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var argv = require('yargs').argv
const webpackServerConfig = require('./webpackServerConfig')
const pxtorem = require('postcss-pxtorem')
//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'

console.log('当前运行环境：', isPro ? 'production' : 'development')

const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ' '),  // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, 'src/utils/Scroller/lib/fonts'),  // 2. 自己私人的 svg 存放目录
]

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
    }),
    new webpack.DefinePlugin({
        // 定义全局变量
        'process.env': {
            'NODE_ENV': JSON.stringify(nodeEnv)
        }
    })
]

// plugins.push(['import', { libraryName: 'antd-mobile', style: 'css' }])
var app = ['./entry']
if (isPro) {
    plugins.push(
        new ExtractTextPlugin({filename: 'styles.css'}),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false,
            ie8: true
        })
    )
} else {
    app.unshift('react-hot-loader/patch', `webpack-dev-server/client?http://${webpackServerConfig.host}:${webpackServerConfig.port}`, 'webpack/hot/only-dev-server')
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    )
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: isPro ? '' : 'inline-source-map',
    // devtool: isPro ? 'source-map' : 'inline-source-map',
    entry: {
        vendor: ['react', 'react-dom'],
        app: app
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: isPro ? './build/' : '/build/',
        chunkFilename: '[name].[chunkhash:5].min.js'
    },
    // BASE_URL是全局的api接口访问地址
    plugins,
    // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
    resolve: {
        extensions: [' ', '.web.js', '.js', '.json', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            'actions': path.resolve(__dirname, 'src/actions'),
            'components': path.resolve(__dirname, 'src/components'),
            'containers': path.resolve(__dirname, 'src/containers'),
            'reducers': path.resolve(__dirname, 'src/reducers'),
            'utils': path.resolve(__dirname, 'src/utils')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.(less|scss|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader']

            },
            {
                test: /\.(svg)$/i,
                use: 'svg-sprite-loader',
                include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: ['url-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]'],

            },

        ]
    },

}