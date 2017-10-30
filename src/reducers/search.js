import * as types from '../utils/const'


let init = {
    pagesize: 20,
    pagenum: 0,
    list: [],
    isFetching: false,
    hamMore: true,
    word:''


}

export function search(state = init, action) {


    switch (action.type) {

        case types.REQUEST_SEARCH_LIST:

            return {...state, isFetching: true}

        case types.RECIEVE_SEARCH_LIST:

            let pages = action.data.pages
            let hasMore = true
            let dataList = state.list
            if (action.pagenum > pages) {
                hasMore = false
            } else if (action.pagenum > state.pagenum) {
                dataList = dataList.concat(action.data.datalist)
            }
            else if (action.pagenum === 0) {
                dataList = action.data.datalist
            }
            return {...state,hamMore:hasMore, isFetching: false, list: dataList,pagesize:action.pagesize,pagenum:action.pagenum,word:action.word}


        default:
            return state
    }

}