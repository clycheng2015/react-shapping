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

export const leftBtn=(id)=>({

    type:'ITEM_LEFT_BTN'

})

export const rightBtn=(id)=>({

    type:'ITEM_RIGHT_BTN'

})

export const sortBtn=(id)=>({

    type:'ITEM_SORT_BTN'

})







export const getItemGoodsList = ( data) => {
    return (dispatch, getState) => {
        dispatch(requestItemGoodsList());
        instance.get(itemList.detailUrl+'?'+qs.stringify(data))
            .then(res => {
                console.log(res.data.data)
                dispatch(receiveItemGoodsList(res.data.data,data.pagesize,data.pagenum,data.cid))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

