console.log('other page')

import './assets/style/style2.less'
import './assets/style/style3.css'

import moment from 'moment'
import "moment/locale/zh-cn"    //  2. webpack.IgnorePlugn 配置后, 此处手动引入 moment 的中文包
moment.locale('zh-cn')  //  设置语言为中文
console.log('locale', moment.locale())
console.log('date', moment().format('ll'))

import { sum } from './math'
const sumRes = sum(2, 1)
console.log('sumRes', sumRes)