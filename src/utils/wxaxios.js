/**
 * Created by bear on 2017/9/22.
 */
/**
 * Created by admin on 2016/10/10.
 */
import axios from 'axios';

const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'
let url = ''
if (isPro) {

    url = 'http://worldwideapp.chinazjtc.com/'
} else {

    url = 'http://localhost:3011'
}


//封装好的get和post接口，调用方法情况action文件
const wxaxios = axios.create({
    baseURL: 'http://worldwideapp.chinazjtc.com', //设置默认api路径
    timeout: 5000, //设置超时时间
    headers: {'Content-Type': 'application/x-www-form-urlencoded',},
});

export default wxaxios;