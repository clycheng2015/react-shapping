/**
 * Created by admin on 2016/10/10.
 */
import axios from 'axios';
import createHistory from 'history/createHashHistory'
const history = createHistory()
import {Modal} from 'antd-mobile'

const alert=Modal.alert


import {AppLocalStorage} from './cookie'
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'
let url = '',xToken = ''
if (isPro) {url = 'http://app.meilungo.com'} else {url = 'http://192.168.1.223:3011'}
axios.defaults.baseURL = url;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

// http request 拦截器

axios.interceptors.request.use(
    config => {

        if(config.url.indexOf('/v2/pay/api')>0){

            let user = AppLocalStorage.Cache.get('user')
            if (user && user.userInfo) {
                xToken = user.userInfo.access_token
                config.headers.Authorization = `Bearer${xToken}`;
            }
        }

        if(config.url.indexOf('open')<0){
            let user = AppLocalStorage.Cache.get('user')
            if (user && user.userInfo) {
                xToken = user.userInfo.access_token
                config.headers.Authorization = `Bearer${xToken}`;
            }
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
                    alert('提示', '网络状态改变，请重新登录！', [
                        { text: '取消', onPress: () =>history.goBack(), style: 'default' },
                        { text: '前往登录', onPress: () => {
                            let url=window.location.href
                            url= url.match(/#(\S*)/)[1];
                            url=url.replace('/','')
                            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://app.meilungo.com/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                        }},
                    ]);
            }
        }
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });


export default axios;