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


const receiveItemGoodsList = (data,pagesize,pagenum,id) => ({
    type: types.RECIEVE_ITEM_GOODS_LIST,
    data,pagesize,pagenum,id
})

export const removeList=()=>({

    type:'ITEM_REMOVE'

})

export const recordScrollT=(id,scrollT)=>({

    type:'RECORD_SCROLL',id,scrollT

})


export const getItemGoodsList = ( data) => {
    return (dispatch, getState) => {
        dispatch(requestItemGoodsList());
        instance.get(itemList.detailUrl+'?'+qs.stringify(data))
            .then(res => {
                dispatch(receiveItemGoodsList(res.data.data,data.pagesize,data.pagenum,data.cid))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

