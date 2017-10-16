/**
 * Created by admin on 2016/10/10.
 */
import axios from 'axios';

const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'
let url = ''
if (isPro) {

    url = 'http://worldwideapp.chinazjtc.com/app'

    // url = 'http://localhost:80/app'
} else {

    url = 'http://localhost:3011/app'
}


//封装好的get和post接口，调用方法情况action文件
const instance = axios.create({
    baseURL: url, //设置默认api路径
    timeout: 5000, //设置超时时间
    headers: {'Content-Type': 'application/x-www-form-urlencoded',},
});

export default instance;