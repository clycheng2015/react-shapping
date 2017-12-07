/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'
import {Toast} from 'antd-mobile'

let init = {
    data: {},
    isFetching: false,
    pagesize: 100,
    pagenum: 1,
    checkData: [],
    owCheckData: [],
    osCheckData: [],
    ckeckAllState: true,
    osCkeckAllState: false,
    owCkeckAllState: false,
    banner: {},
    activeInfo:[],
    mjprice:0,


}


export const car = (state = init, action) => {
    switch (action.type) {
        case types.GET_CAR_LIST:
            let owCheckData = state.owCheckData
            let osCheckData = state.osCheckData

            let newOwCheckData = []
            let newOsCheckData = []

            let osCkeckAllState = state.osCkeckAllState
            let owCkeckAllState = state.owCkeckAllState

            let oscheckAllArr = []
            let owcheckAllArr = []

            if (action.data.datalist && action.data.datalist.length > 0) {
                if ((osCheckData.length + owCheckData.length) === 0) {


                    action.data.datalist.map(i => {
                        if (i.isown === 2) {
                            newOsCheckData.push({list: i, checked: false, type: 1})
                            osCkeckAllState = false
                        }
                        if (i.isown === 1) {
                            newOwCheckData.push({list: i, checked: false, type: 0})
                            owCkeckAllState = false
                        }
                    })
                }

                if ((osCheckData.length + owCheckData.length) > 0 && (osCheckData.length + owCheckData.length) >= action.data.datalist.length) {
                        action.data.datalist.map(i => {
                            if (i.isown === 1) {
                                owCheckData.map((j, n) => {
                                    if (i.id === j.list.id) {
                                        owcheckAllArr.push(j.checked)
                                        newOwCheckData.push({list: i, checked: j.checked, type: 0})
                                    }
                                })
                                let newArr = Array.from(new Set(owcheckAllArr))
                                owCkeckAllState = (newArr.length === 1 && newArr[0] == true);

                            }

                            if (i.isown === 2) {
                                osCheckData.map((j, n) => {
                                    if (i.id === j.list.id) {
                                        oscheckAllArr.push(j.checked)
                                        newOsCheckData.push({list: i, checked: j.checked, type: 1})
                                    }
                                })
                                let newArr = Array.from(new Set(oscheckAllArr))
                                osCkeckAllState = (newArr.length === 1 && newArr[0] == true);
                            }

                        })


                }
                //
                if ((osCheckData.length + owCheckData.length) > 0 && (osCheckData.length + owCheckData.length) < action.data.datalist.length) {

                    action.data.datalist.map(i => {
                        if (i.isown === 2) {newOsCheckData.push({list: i, checked: false, type: 1})}
                        if(i.isown === 1){  newOwCheckData.push({list: i, checked: false, type: 0})}
                    })

                    owCheckData.map((j, m) => {
                        newOwCheckData.map((i, n) => {
                            if (j.list.id === i.list.id) {
                                newOwCheckData[n].checked = owCheckData[m].checked
                                owcheckAllArr.push(newOwCheckData[n].checked)
                            }
                        })
                    })

                    let newArr = Array.from(new Set(owcheckAllArr))

                    owCkeckAllState = (newArr.length === 1 && newArr[0] == true);



                    osCheckData.map((j, m) => {
                        newOsCheckData.map((i, n) => {
                            if (j.list.id === i.list.id) {
                                newOsCheckData[n].checked = osCheckData[m].checked

                                oscheckAllArr.push(newOsCheckData[n].checked)
                            }
                        })
                    })

                    let newArr1 = Array.from(new Set(oscheckAllArr))
                    osCkeckAllState = (newArr.length === 1 && newArr1[0] == true);


                }

            }

            return {
                ...state,
                pagesize: action.pagesize,
                pagenum: action.pagenum,
                data: action.data,
                isFetching: false,
                owCheckData: newOwCheckData,
                osCheckData: newOsCheckData,
                osCkeckAllState: osCkeckAllState,
                owCkeckAllState: owCkeckAllState,
                activeInfo: action.data.datalist&& action.data.datalist.length>0&&action.data.datalist[0].fullActivityDto!==null?action.data.datalist[0].fullActivityDto:[]
            }

        case types.DEL_CAR_LIST:



            return {...state, isFetching: true}



        case 'CAR_BANNER':

            return {...state, banner: action.data}

        case types.UPDATE_CAR_NUM:

            return {...state, isFetching: true}


        case 'CAR_CHECK_ALL':
            let allowCheckData = state.owCheckData
            let allosCheckData = state.osCheckData
            let type = action.state
            let allosCkeckAllState = state.osCkeckAllState
            let allowCkeckAllState = state.owCkeckAllState


            let ckeckAllState = state.ckeckAllState
            let newData = state.checkData

            if (type === 1) {
                if (!allosCkeckAllState) {

                    let expCheckArr = allowCheckData.map(i => (i.checked))
                    let isHas = false;
                    expCheckArr.map(i => {
                        "use strict";
                        if (i === true) {
                            isHas = i
                        }
                    })
                    if (isHas) {
                        Toast.info('亲，不同种类的商品不能同时购买哟!', 1)
                        allowCheckData = allowCheckData.map(i => {
                            return {...i, checked: false}
                        })
                        allowCkeckAllState = false
                    }
                    allosCheckData = allosCheckData.map((i, k) => ({...i, checked: true, type: type}))
                }
                if (allosCkeckAllState) {
                    allosCheckData = allosCheckData.map((i, k) => ({...i, checked: false, type: type}))
                }
            }
            if (type === 0) {
                if (!allowCkeckAllState) {

                    let expCheckArr = allosCheckData.map(i => (i.checked))
                    let isHas = false;
                    expCheckArr.map(i => {
                        "use strict";
                        if (i === true) {
                            isHas = i
                        }
                    })
                    if (isHas) {
                        Toast.info('亲，不同种类的商品不能同时购买哟!', 1)
                        allosCheckData = allosCheckData.map(i => {
                            return {...i, checked: false}
                        })
                        allosCkeckAllState = false
                    }
                    allowCheckData = allowCheckData.map((i, k) => ({...i, checked: true, type: type}))
                }
                if (allowCkeckAllState) {
                    allowCheckData = allowCheckData.map((i, k) => ({...i, checked: false, type: type}))
                }
            }
            if (!ckeckAllState) {
                newData = newData.map((i, k) => ({...i, checked: true}))
            }
            if (ckeckAllState) {
                newData = newData.map((i, k) => ({...i, checked: false}))
            }

            return {
                ...state,
                ckeckAllState: !ckeckAllState,
                checkData: newData,
                osCkeckAllState: type === 1 ? !allosCkeckAllState : allosCkeckAllState,
                owCkeckAllState: type === 0 ? !allowCkeckAllState : allowCkeckAllState,
                owCheckData: allowCheckData,
                osCheckData: allosCheckData,

            }


        case 'CAR_CHECK':

            let id = action.id
            let cktype = action.state
            let ckowCheckData = state.owCheckData
            let ckosCheckData = state.osCheckData
            let checkArr = []
            let checkData = state.checkData

            if (cktype === 0) {
                let expCheckArr = ckosCheckData.map(i => (i.checked))
                let isHas = false;
                expCheckArr.map(i => {
                    "use strict";
                    if (i === true) {
                        isHas = i
                    }
                })
                if (isHas) {
                    Toast.info('亲，不同种类的商品不能同时购买哟!', 1)
                    ckosCheckData = ckosCheckData.map(i => {
                        return {...i, checked: false}
                    })


                }
                ckowCheckData = ckowCheckData.map(i => {
                    "use strict";
                    if (i.list.id === id) {
                        return {...i, checked: !i.checked}
                    }
                    return {...i}
                })
                checkArr = ckowCheckData.map(i => (i.checked))


            }

            if (cktype === 1) {

                let expCheckArr = ckowCheckData.map(i => (i.checked))
                let isHas = false;
                expCheckArr.map(i => {
                    "use strict";
                    if (i === true) {
                        isHas = i
                    }
                })
                if (isHas) {
                    Toast.info('亲，不同种类的商品不能同时购买哟!', 1)
                    ckowCheckData = ckowCheckData.map(i => {
                        return {...i, checked: false}
                    })
                }

                ckosCheckData = ckosCheckData.map(i => {
                    "use strict";
                    if (i.list.id === id) {
                        return {...i, checked: !i.checked}
                    }
                    return {...i}
                })
                checkArr = ckosCheckData.map(i => (i.checked))
            }

            let newArr = Array.from(new Set(checkArr))

            let isAllEqual = (newArr.length === 1 && newArr[0] == true);

            return {
                ...state,

                owCheckData: ckowCheckData,
                osCheckData: ckosCheckData,
                osCkeckAllState: cktype === 1 ? isAllEqual : false,
                owCkeckAllState: cktype === 0 ? isAllEqual : false,
                checkData: checkData,
                ckeckAllState: isAllEqual

            }


        case 'CLEAR_ALL_STATE':

            return {...init}

        default:
            return state
    }

}
// export const car = (state = init, action) => {
//     switch (action.type) {
//         case types.GET_CAR_LIST:
//             let list = state.checkData;
//             let newList = []
//             let ckeckInitAll = state.ckeckAllState
//             let checkAllArr = []
//
//             if (action.data.datalist && action.data.datalist.length > 0) {
//
//                 if (list.length === 0) {
//                     newList = action.data.datalist.map((i, k) => ({list: i, checked: true}))
//                     ckeckInitAll = true
//                 }
//                 if (list.length > 0 && list.length >= action.data.datalist.length) {
//                     action.data.datalist.map((i, k) => {
//                         list.map((j, n) => {
//                             if (i.id === j.list.id) {
//                                 checkAllArr.push(j.checked)
//                                 newList.push({list: i, checked: j.checked})
//                             }
//                         })
//                     })
//
//                     let newArr = Array.from(new Set(checkAllArr))
//                     ckeckInitAll = (newArr.length === 1 && newArr[0] == true);
//
//
//                 }
//
//                 if (list.length > 0 && list.length < action.data.datalist.length) {
//                     newList = action.data.datalist.map((i, k) => ({list: i, checked: true}))
//
//                     list.map((j, m) => {
//                         newList.map((i, n) => {
//                             if (j.list.id === i.list.id) {
//                                 newList[n].checked = list[m].checked
//
//                                 checkAllArr.push(newList[n].checked)
//                             }
//                         })
//                     })
//
//                     let newArr = Array.from(new Set(checkAllArr))
//                     ckeckInitAll = (newArr.length === 1 && newArr[0] == true);
//                 }
//             }
//             return {
//                 ...state,
//                 pagesize: action.pagesize,
//                 pagenum: action.pagenum,
//                 data: action.data,
//                 isFetching: false,
//                 checkData: newList,
//                 ckeckAllState: ckeckInitAll,
//             }
//
//         case types.DEL_CAR_LIST:
//
//             return {...state, isFetching: true}
//
//         case 'CAR_BANNER':
//
//             return {...state, banner: action.data}
//
//         case types.UPDATE_CAR_NUM:
//
//             return {...state, isFetching: true}
//
//
//         case 'CAR_CHECK_ALL':
//
//             let ckeckAllState = state.ckeckAllState
//             let newData = state.checkData
//
//             if (!ckeckAllState) {
//                 newData = newData.map((i, k) => ({...i, checked: true}))
//             }
//
//             if (ckeckAllState) {
//                 newData = newData.map((i, k) => ({...i, checked: false}))
//             }
//
//             return {...state, ckeckAllState: !ckeckAllState, checkData: newData}
//
//
//         case 'CAR_CHECK':
//             let id = action.id
//             let checkData = state.checkData
//             let checkArr = []
//             checkData = checkData.map(i => {
//                 "use strict";
//                 if (i.list.id === id) {
//                     return {...i, checked: !i.checked}
//                 }
//                 return {...i}
//             })
//             checkArr = checkData.map(i => (i.checked))
//             let newArr = Array.from(new Set(checkArr))
//             let isAllEqual = (newArr.length === 1 && newArr[0] == true);
//
//             return {...state, checkData: checkData, ckeckAllState: isAllEqual}
//
//
//         case 'CLEAR_ALL_STATE':
//
//             return{...init}
//
//         default:
//             return state
//     }
//
// }