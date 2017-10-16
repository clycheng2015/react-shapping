/**
 * Created by bear on 2017/9/14.
 */
import instance from '../utils/instance'
import {item} from '../utils/api'
import * as types from '../utils/const'


const requestItemList= () => ({
    type:types.REQUEST_ITEM_LIST,
});


const receiveItemList = (list) => ({
    type: types.RECIEVE_ITEM_LIST,
    list
})

export const getItemList = ( ) => {
    return (dispatch, getState) => {
        dispatch(requestItemList());
        instance.post(item.itemListUrl, {})
            .then(res => {
                dispatch(receiveItemList(res.data.data))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

