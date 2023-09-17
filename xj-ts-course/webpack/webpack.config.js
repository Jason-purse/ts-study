const path = require('path')
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/dist'),

        // 当进行 开发命令的时候,数据打包到内存中,所以我们需要告诉 这个内存数据应该放在那个位置
        // 这个地址是一个相对于public的地址,并且需要写绝对路径
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /nodule_modules/,
                resolve: {
                    extensions: ['.ts','.tsx','.js']
                }
            }
        ]
    }
}