/**
 * Created by bear on 2017/9/14.
 */
import instance from '../utils/instance'
import {item} from '../utils/api'
import * as types from '../utils/const'

const requestItemList = () => ({
    type: types.REQUEST_ITEM_LIST,
});

const receiveItemList = (list) => ({
    type: types.RECIEVE_ITEM_LIST,
    list
})

export const tabChange = (tab, index) => ({
    type: "ITEM_TAB_CHANGE", tab, index
})

export const recordScroll = (scrollT) => ({
    type: "ITEM_SCROLL", scrollT
})

export  const  scrollTabH=(data)=>({

    type:"ITEM_SAVE_TAB_H",data
})

export const getItemList = () => {
    return (dispatch, getState) => {
        dispatch(requestItemList());
        instance.get(item.itemListUrl, {})
            .then(res => {
                dispatch(receiveItemList(res.data.data))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

