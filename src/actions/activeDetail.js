/**
 * Created by bear on 2017/9/26.
 */
/**
 * Created by bear on 2017/9/14.
 */

import qs from 'qs'
import instance from '../utils/instance'
import {goodsDetail} from '../utils/api'
import * as types from '../utils/const'
import {Toast} from 'antd-mobile'

const requestItemList = () => ({
    type: types.REQUEST_ATGOODS_DETAIL,
});


const receiveItemList = (data) => ({
    type: types.RECIEVE_ATGOODS_DETAIL,
    data
})


export const fetchSkillDetail = (data) => {
    return (dispatch, getState) => {
        dispatch(requestItemList());
        instance.get(goodsDetail.killUrl+'?'+ qs.stringify(data))
            .then(res => {
                dispatch(receiveItemList(res.data.data))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


export const removeAcDetail=()=>({

    type:'ACDETAIL_REMOVE'

})


export const fetchDisDetail = (data) => {
    return (dispatch, getState) => {
        dispatch(requestItemList());
        instance.get(goodsDetail.dislUrl+'?'+qs.stringify(data))
            .then(res => {
                dispatch(receiveItemList(res.data.data))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}








