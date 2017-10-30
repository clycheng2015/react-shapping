/**
 * Created by bear on 2017/9/14.
 */

import qs from 'qs'
import instance from '../utils/instance'
import {itemList} from '../utils/api'
import * as types from '../utils/const'


const requestItemGoodsList= () => ({
    type:types.REQUEST_ITEM_GOODS_LIST,
});


const receiveItemGoodsList = (data) => ({
    type: types.RECIEVE_ITEM_GOODS_LIST,
    data
})

export const removeList=()=>({

    type:'ITEM_REMOVE'

})
export const getItemGoodsList = ( data) => {
    return (dispatch, getState) => {
        dispatch(requestItemGoodsList());
        instance.get(itemList.detailUrl+'?'+qs.stringify(data))
            .then(res => {
                dispatch(receiveItemGoodsList(res.data.data))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

