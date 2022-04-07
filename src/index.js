import axios from 'axios'
import { sum } from './math'
//  样式使用
import "./assets/style/style1.css"
import "./assets/style/style2.less"

console.log('index page')

//  三方模块使用
let axiosRes = null
try {
    axios.get('/api1/user/getInfo?userId=1').then(resp => {
        axiosRes = resp.data
    }).catch(err => {
        console.warn('请求失败')
        axiosRes = {
            error: 1,
            msg: '请求失败',
            data: null
        }

        console.log('axiosRes', axiosRes)
    })
} catch (error) {
    console.error("请求失败")
}

//  公共方法使用
const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

//  引用动态数据 - 懒加载(异步加载), 异步加载的代码再被打包时会被单独产出一个 chunk
setTimeout(() => {
    import('./dynamic-data').then(res => {
        console.log(res.default.message)
    })
}, 1500);


//  处理 Vue
import { createApp } from 'vue';
import Hello from './Hello.vue'
const app = createApp(Hello)
app.mount('#hello')

//  热更新处理: 修改 js 文件会刷新页面, 导致状态丢失.
//  此处需要进行授权于单个(多个)文件允许热更新
if (module.hot) {
    module.hot.accept(['./math'], () => {
        console.log('hot..')
    })
}

console.log('window.ENV', ENV)
