/**
 * Created by Administrator on 2016/7/2.
 */
import instance from '../utils/instance'
import {home} from '../utils/api'
import * as types from '../utils/const'
import qs from 'qs'
import {endRefresh} from '../utils/native-sdk'
export const severError=(data)=>({


    type:types.SEVER_ERROR,data

})


const receiveHome = (data) => ({

    type: types.RECEIVE_HOME, data
})

const requestHomeList= () => ({
    type:types.REQUEST_HOME_MORE_LIST,
});


const receiveHomeList = (pagenum, pagesize, data) => ({

    type: types.RECEIVE_HOME_MORE_LIST,
    pagenum, pagesize, data
})

export const recordScrollT=(scrollT)=>({

   type: types.RECORD_SCROLLT,scrollT



})


export const headChange =(headState)=>({
    type:types.HEAD_STATE,headState
})

export const fetchHome = (type) => {
    return (dispatch, getState) => {
        instance.get(home.homeUrl)

            .then(res => {
               if(res.data.code===200){
                   let result=res.data.data
                   dispatch(receiveHome(result))

                   if(type==='refresh'){
                       endRefresh()
                   }


               }else {

                   if(type==='refresh'){
                       endRefresh()
                   }

               }



            })
            .catch(error => {
                console.log('error: ', error)
                if(type==='refresh'){
                    endRefresh()
                }
            })
    }
}
export  const fetchHomeList=(data)=>{
    "use strict";
    return (dispatch, getState) => {
        dispatch( requestHomeList())
        instance.get(home.moreListUrl+'?'+qs.stringify(data))
            .then(res => {
                if(res.data.code===200){
                    let result=res.data.data
                    dispatch(receiveHomeList( data.pagenum, data.pagesize, result))
                }
                else {
                    dispatch(severError(res.data))
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }



}
