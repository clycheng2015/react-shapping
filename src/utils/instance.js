/**
 * Created by admin on 2016/10/10.
 */
import axios from 'axios';
import {AppLocalStorage} from './cookie'
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'
let url = ''
if (isPro) {

    url = 'http://test.meilungo.com'

    // url = 'http://localhost:80/app'


} else {

    url = 'http://192.168.1.247:3011'
}

//封装好的get和post接口，调用方法情况action文件
let options = {
    baseURL: url, //设置默认api路径
    timeout: 5000, //设置超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
}
let user = AppLocalStorage.Cache.get('user')
let xToken = '';


if (user && user.userInfo) {

    xToken = user.userInfo.access_token

    console.log("xToken")

    options = {
        ...options, headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer' + xToken
        }
    }

}

console.log(xToken)
const instance = axios.create(options);


export default instance;