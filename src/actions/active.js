/**
 * Created by bear on 2017/9/14.
 */
import instance from '../utils/instance'
import {active} from '../utils/api'
import * as types from '../utils/const'


const requestAcList = () => ({
    type: types.REQUEST_ACTIVE_LIST,
});


const receiveAcList = (list,pagesize,pagenum) => ({
    type: types.RECIEVE_ACTIVE_LIST,
    list,pagesize,pagenum
})
const requestDisAcList = () => ({
    type: types.REQUEST_DISACTIVE_LIST,
});


const receiveDisAcList = (list,pagesize,pagenum) => ({
    type: types.RECIEVE_DSIACTIVE_LIST,
    list,pagesize,pagenum
})

export const fetchAcList = (data,resolve,reject) => {
    return (dispatch, getState) => {
        dispatch(requestAcList());
        instance.post(active.activeList, data)

            .then(res => {

                if (res.data.code == 200) {

                    dispatch(receiveAcList(res.data.data.datalist,data.pagesize,data.pagenum))
                    if(resolve){
                        resolve()
                    }
                }
            })
            .catch(error => {
                console.log('error: ', error)
                if(reject){
                    reject()
                }
            })
    }
}

export const fetchDisAcList = (data,resolve,reject) => {
    return (dispatch, getState) => {
        dispatch(requestDisAcList());
        instance.post(active.disList, data)

            .then(res => {

                if (res.data.code == 200) {

                    dispatch(receiveDisAcList(res.data.data.datalist,data.pagesize,data.pagenum))
                    if(resolve){
                        resolve()
                    }
                }
            })
            .catch(error => {
                console.log('error: ', error)

                if(reject){
                    reject()
                }
            })
    }
}

