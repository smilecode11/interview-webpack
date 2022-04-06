console.log('index page')

import "./assets/style/style1.css"
import "./assets/style/style2.less"

import { sum } from './math'

import axios from 'axios'

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


const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

console.log('window.ENV', ENV)
