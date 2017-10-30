/**
 * Created by bear on 2017/9/14.
 */

import qs from 'qs'
import instance from '../utils/instance'
import {auth} from '../utils/api'
import * as types from '../utils/const'
import {Toast} from 'antd-mobile'

import {AppLocalStorage} from '../utils/cookie'


import {keys} from '../utils/appkeys'
import {hex_sha1} from   '../utils/sha1'


const login = (userInfo) => ({

    type: types.AUTH_LOGIN,
    userInfo

});


const reg = (data) => ({
    type: types.AUTH_REG,
    data
})

const updatePwd = (mobile, password) => ({
    type: types.AUTH_UPDATE_PWD,
    mobile, password
})


const sendSmsCode = (data) => ({
    type: types.AUTH_SEND_SMS_CODE,
    data

})


export const fetchLogin = (data, history, toUrl) => {

    let newData = {
        ...data,
        appkey: keys.APP_KEY,
        timestamp: keys.TIMESTAMP,
        machine: keys.APP_MACHINE
    };
    let arr = Object.keys(newData).sort().map((key) => newData[key])

    let signData = {
        ...newData,

        sign: hex_sha1(arr.join('') + keys.APP_SECRET)
    }

    return (dispatch, getState) => {
        instance.post(auth.loginUrl, qs.stringify(signData))
            .then(res => {
                console.log(res)
                if (res.data.code == 200) {

                    dispatch(login(res.data.data))
                    Toast.success("登录成功", 1)
                    // AppLocalStorage.Cache.clear()

                    AppLocalStorage.Cache.put("user",{
                        userInfo:res.data.data,
                        // openid:data.openid
                        openid:'ocR4-0qtFtZ3VOn_mGrfMSrLtB64'

                    },res.data.data.expires_in)

                    // localItem('userInfo', JSON.stringify(res.data.data))
                    // history.push(`/${toUrl ? toUrl : ''}`)

                }
                else {


                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {
                Toast.fail("服务器错误，请稍后重试！", 1)
                console.log('error: ', error)
            })
    }
}

export const fetchReg = (data, history) => {
    return (dispatch, getState) => {

        instance.post(auth.regUrl, qs.stringify(data))
            .then(res => {

                if (res.data.code == 200) {

                    dispatch(updatePwd(data.mobile, data.password))
                    Toast.info(res.data.msg, 1)
                    history.push('/login')

                } else {


                    Toast.info(res.data.msg, 1)

                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

export const fetchUpdate = (data, history) => {

    return (dispatch, getState) => {

        instance.post(auth.resetPwdUrl, qs.stringify(data))
            .then(res => {

                if (res.data.code == 200) {

                    dispatch(updatePwd(data.mobile, data.password))
                    Toast.info(res.data.msg, 1)
                    history.push('/login')

                } else {
                    Toast.info(res.data.msg, 1)
                }
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

export const sendCode = (data) => {
    return (dispatch, getState) => {

        instance.post(auth.sendCodeUrl, qs.stringify(data))
            .then(res => {
                if (res.data.code == 200) {
                    Toast.info(res.data.msg, 1)
                    dispatch(sendSmsCode(data))
                } else {

                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

export const sendRegCode = (data) => {
    return (dispatch, getState) => {

        instance.post(auth.regCodeUrl, qs.stringify(data))
            .then(res => {

                if (res.data.code == 200) {
                    Toast.info(res.data.msg, 1)
                    dispatch(sendSmsCode(data))
                } else {

                    Toast.info(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}



