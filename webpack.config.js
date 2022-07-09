const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  MiniCssExtractPlugin  =  require ( "mini-css-extract-plugin" ) ; 

module.exports = {
    entry:{
        index:path.resolve(__dirname,"./Src/Js/index.js"),
        sudo:path.resolve(__dirname,"./Src/Js/sudo.js"),
        dejavu:path.resolve(__dirname,"./Src/Js/dejavu.js"),
        MagicCard:path.resolve(__dirname,"./Src/Js/MagicCard.js"),
        LightButton:path.resolve(__dirname,"./Src/Js/LightButton.js"),

    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename:'./Js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'sass-loader']
            },

        ],
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
        }
    },

    devtool: false,
    plugins:[
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename:"./css/[name].css"
        }),
        new HtmlWebpackPlugin({
            title:"index",
            template: "./Src/Html/index.html",
            filename: './Html/index.html',
            chunks:["index"]
        }),
        new HtmlWebpackPlugin({
            title:"sudo",
            template: "./Src/Html/sudo.html",
            filename: './Html/sudo.html',
            chunks:["sudo"]
        }),
        new HtmlWebpackPlugin({
            title:"dejavu",
            template: "./Src/Html/dejavu.html",
            filename: './Html/dejavu.html',
            chunks:["dejavu"]
        }),
        new HtmlWebpackPlugin({
            title:"MagicCard",
            template: "./Src/Html/MagicCard.html",
            filename: './Html/MagicCard.html',
            chunks:["MagicCard"]
        }),
        new HtmlWebpackPlugin({
            title:"LightButton",
            template: "./Src/Html/LightButton.html",
            filename: './Html/LightButton.html',
            chunks:["LightButton"]
        }),
        new webpack.DefinePlugin({
            // Drop Options API from bundle
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true,

        }),
    ]

}
