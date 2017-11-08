
import axios from 'axios';
const nodeEnv = process.env.NODE_ENV || 'development'

 axios.create({
    baseURL: 'http://app.meilungo.com', //设置默认api路径
    timeout: 5000, //设置超时时间
    headers: {'Content-Type': 'application/x-www-form-urlencoded',},
});



// http request 拦截器

axios.interceptors.request.use(
    config => {
        let user = AppLocalStorage.Cache.get('user')
        if (user && user.userInfo) {
            xToken = user.userInfo.access_token
            config.headers.Authorization = `Bearer ${xToken}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    console.log('401')
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });



export default axios;