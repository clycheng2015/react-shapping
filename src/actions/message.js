/**
 * Created by bear on 2017/9/14.
 */
import instance from '../utils/instance'
import {msg} from '../utils/api'
import qs from 'qs'
import * as types from '../utils/const'
const getMessageList = (data) => ({

    type: types.GET_MESSAGE_LIST,

    data,

});


const getTlmeList = (data) => ({

    type: types.GRT_LOGISTICS_LIST,

    data,

});

const getIsRead = (data) => ({

    type: types.GET_MSG_IS_READE,

    data,

});




export const fetchMessageList = (uid) => {


    let data={
        pagesize:100,
        pagenum:1,
        uid:uid
    }

    return (dispatch, getState) => {

        instance.get(msg.msgListurl+'?'+qs.stringify(data))
            .then(res => {
                dispatch(getMessageList(res.data.data))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


export const fetchTlmeList = () => {
    let data={
        pagesize:100,
        pagenum:1,

    }
    return (dispatch, getState) => {

        instance.get(msg.tlmeUrl+'?'+qs.stringify(data))
            .then(res => {
                dispatch(getTlmeList(res.data.data))
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


export const fetchIsRead = (id,uid) => {

    return (dispatch, getState) => {

        instance.get(msg.readUrl+'?'+qs.stringify({id:id}))
            .then(res => {
                dispatch(getIsRead(res.data.data))
                if(id===0){

                    dispatch(fetchMessageList(uid))
                }
            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


