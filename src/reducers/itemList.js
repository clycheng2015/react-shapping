/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {
    data: {},
    pagesize: 20,
    pagenum: 0,
    list: [],
    isFetching: false,
    hasMore: true,
    scrollT: 0,
    priceSort:''
}


export const itemList = (state = init, action) => {
    switch (action.type) {
        case types.REQUEST_ITEM_GOODS_LIST:
            return {...state, isFetching: true}
        case types.RECIEVE_ITEM_GOODS_LIST:
            let pages = action.data.pages
            let id = action.id
            let hasMore = true
            let dataList = []
            if (state.list[id]) {

                dataList = state.list[id].dataList
            }


            if (action.pagenum > pages) {
                hasMore = false
            } else if (action.pagenum > state.pagenum) {
                dataList = dataList.concat(action.data.datalist)
            }
            else if (action.pagenum === 0) {
                dataList = action.data.datalist
            }
            return {
                ...state,
                isFetching: false,
                list: {
                    ...state.list,
                    [id]: {
                        ...state.list[id],
                        dataList: dataList,
                        pagesize: action.pagesize,
                        pagenum: action.pagenum,
                        hasMore: hasMore
                    }
                }
            }
        case 'RECORD_SCROLL':

            let cid=action.id

            return {
                ...state, list: {
                    ...state.list,
                    [cid]: {
                        ...state.list[cid],
                        scrollT:action.scrollT

                    }
                }
            }


        default:
            return state
    }

}