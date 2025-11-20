const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", { targets: "defaults" }],
                                ["@babel/preset-react", { runtime: "automatic" }], // вот это нужно
                                "@babel/preset-typescript"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    devServer: {
        static: "./dist",
        hot: true,
        historyApiFallback: true,
        port: 3000,
        open: true,
        proxy: [
            {
                context: ["/api"],
                target: "https://api.comfortkino.ru",
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/api": "/app" }
            }
        ]
    },
    mode: "development"
}
