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
    ckeckAllState: true,
    banner: {}


}


export const car = (state = init, action) => {


    switch (action.type) {
        case types.GET_CAR_LIST:
            let list = state.checkData;
            let newList = []
            let ckeckInitAll = state.ckeckAllState

            let checkAllArr = []
            if (action.data.datalist && action.data.datalist.length > 0) {

                if (list.length === 0) {
                    newList = action.data.datalist.map((i, k) => ({list: i, checked: true}))
                    ckeckInitAll = true
                }
                if (list.length > 0 && list.length >= action.data.datalist.length) {
                    action.data.datalist.map((i, k) => {
                        list.map((j, n) => {
                            if (i.id === j.list.id) {
                                checkAllArr.push(j.checked)
                                newList.push({list: i, checked: j.checked})
                            }
                        })
                    })

                    let newArr = Array.from(new Set(checkAllArr))
                    ckeckInitAll = (newArr.length === 1 && newArr[0] == true);


                }

                if (list.length > 0 && list.length < action.data.datalist.length) {
                    newList = action.data.datalist.map((i, k) => ({list: i, checked: true}))

                    list.map((j, m) => {
                        newList.map((i, n) => {
                            if (j.list.id === i.list.id) {
                                newList[n].checked = list[m].checked

                                checkAllArr.push(newList[n].checked)
                            }
                        })
                    })

                    let newArr = Array.from(new Set(checkAllArr))
                    ckeckInitAll = (newArr.length === 1 && newArr[0] == true);
                }
            }


            return {
                ...state,
                pagesize: action.pagesize,
                pagenum: action.pagenum,
                data: action.data,
                isFetching: false,
                checkData: newList,
                ckeckAllState: ckeckInitAll,
            }

        case types.DEL_CAR_LIST:

            return {...state, isFetching: true}

        case 'CAR_BANNER':

            return {...state, banner: action.data}

        case types.UPDATE_CAR_NUM:

            return {...state, isFetching: true}


        case 'CAR_CHECK_ALL':

            let ckeckAllState = state.ckeckAllState
            let newData = state.checkData

            if (!ckeckAllState) {
                newData = newData.map((i, k) => ({...i, checked: true}))
            }

            if (ckeckAllState) {
                newData = newData.map((i, k) => ({...i, checked: false}))
            }

            return {...state, ckeckAllState: !ckeckAllState, checkData: newData}


        case 'CAR_CHECK':
            let id = action.id
            let checkData = state.checkData
            let checkArr = []
            checkData = checkData.map(i => {
                "use strict";
                if (i.list.id === id) {
                    return {...i, checked: !i.checked}
                }
                return {...i}
            })
            checkArr = checkData.map(i => (i.checked))
            let newArr = Array.from(new Set(checkArr))
            let isAllEqual = (newArr.length === 1 && newArr[0] == true);

            return {...state, checkData: checkData, ckeckAllState: isAllEqual}


        case 'CLEAR_ALL_STATE':

            return{...init}

        default:
            return state
    }

}