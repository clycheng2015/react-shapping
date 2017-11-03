/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {

    data: {},
    isFetching: false,
    pagesize: 100,
    pagenum: 1,
    checkData: [],
    ckeckAllState:true,


}


export const car = (state = init, action) => {


    switch (action.type) {
        case types.GET_CAR_LIST:
            let list=state.checkData

            if(action.data.datalist&&action.data.datalist.length>0){

                list=action.data.datalist.map((i,k)=>({
                    list:i,
                    checked: true
                }))
            }



            return {...state,
                pagesize: action.pagesize,
                pagenum: action.pagenum,
                data: action.data,
                isFetching: false,
                checkData:list,
                ckeckAllState:true,
            }

        case types.DEL_CAR_LIST:

            return {...state, isFetching: true}

        case types.UPDATE_CAR_NUM:

            return {...state, isFetching: true}


        case 'CAR_CHECK_ALL':

            let ckeckAllState=state.ckeckAllState
            let newData=state.checkData

            if(!ckeckAllState){
                newData=newData.map((i,k)=>({...i,checked: true}))
            }

            if(ckeckAllState){
                newData=newData.map((i,k)=>({...i, checked: false}))
            }

            return {...state, ckeckAllState: !ckeckAllState,checkData:newData}


        case 'CAR_CHECK':
            let id=action.id
            let checkData=state.checkData
            let checkArr=[]
            checkData=checkData.map(i=>{
                "use strict";
                if(i.list.id===id){
                    return {...i,checked:!i.checked}
                }
                return {...i}
            })
            checkArr=checkData.map(i=>(i.checked))
            let newArr = Array.from(new Set(checkArr))
            let isAllEqual = (newArr.length === 1 && newArr[0] == true);

            return {...state,checkData:checkData,ckeckAllState:isAllEqual}


        default:
            return state
    }

}