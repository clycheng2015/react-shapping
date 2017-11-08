/**
 * Created by bear on 2017/9/14.
 */

import qs from 'qs'
import instance from '../utils/instance'
import {user} from '../utils/api'
import * as types from '../utils/const'

/**
 *
 * @param data
 * @returns {function(*, *)}
 *
 *
 */
const getProtocol = (data,id) => ({
    type: 'GET_PROTOCOL',
    data,id

})


//type > 用户注册协议 传REGISTER , 商城购买协议 GOODS, 平台充值协议 RECHARGE ,金凤充值协议 JFRECHARGE钱包使用协议 MONEY,金凤钱包使用协议 JFMONEY

export const fetchProtocol = (data) => {
    return (dispatch, getState) => {
        instance.get(user.protoUrl+'?'+qs.stringify(data))
            .then(res => {
                console.log(res)
                if (res.data.code == 200) {

                    dispatch(getProtocol(res.data.data,data.type))
                }
            })
            .catch(error => {

                console.log('error: ', error)

            })
    }
}

