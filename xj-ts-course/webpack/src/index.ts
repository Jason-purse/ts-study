
// 如果不使用模块化,那么这种不标准

// 我们通过模块化导出
// 通过tsConfig.json 开启模块化导出已经编译
// 指定我们的模块生成代码是那种类型
//  "module": "commonjs",
// 当然我们这里使用es6


// 下面则开始导入模块了 ...



// 如果不使用则是虚假导入,如果这个模块解析有错误不会提醒
// 需要导入这样的一个模块,我们还需要在webpack中配置,如何解析这样的模块
// 显然就是配置那种文件如何这个文件导入,查看webpack.config.js中的 ts-loader的配置
// resolve: {extensions: []} ...
import {User} from './a'

document.querySelector("#app")!.textContent = 'webpack1123'


console.log(User.value)

