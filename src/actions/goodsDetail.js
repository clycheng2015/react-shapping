/**
 * Created by bear on 2017/9/14.
 */

import qs from 'qs'
import instance from '../utils/instance'
import {goodsDetail} from '../utils/api'
import * as types from '../utils/const'
import {Toast} from 'antd-mobile'

const requestItemList = () => ({
    type: types.REQUEST_GOODS_DETAIL,
});


const receiveItemList = (data) => ({
    type: types.RECIEVE_GOODS_DETAIL,
    data
})


const addCar = () => ({

    type: types.ADD_TO_CAR,


})

export const removeDetail=()=>({

    type:'DETAIL_REMOVE'

})


export const getGoodsDetail = (data) => {
    return (dispatch, getState) => {
        dispatch(requestItemList());
        instance.post(goodsDetail.detailUrl, qs.stringify(data))
            .then(res => {
                dispatch(receiveItemList(res.data.data))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}





export const fetchAddCar = (data) => {
    return (dispatch, getState) => {
        dispatch(requestItemList());
        instance.post(goodsDetail.addCarUrl, qs.stringify(data))

            .then(res => {
                if (res.data.code == 200) {
                    Toast.success("加入成功!", 1)

                    dispatch(addCar())
                }
                else {

                    Toast.fail(res.data.msg, 1)
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}










