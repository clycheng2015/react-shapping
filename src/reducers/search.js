import * as types from '../utils/const'


let init = {
    pagesize: 20,
    pagenum: 1,
    list: [],
    isFetching: false,
    hasMore: true,
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
            else if (action.pagenum === 1) {
                dataList = action.data.datalist


                if(action.pagenum === pages){
                    hasMore = false
                }
            }


            return {...state,hasMore:hasMore, isFetching: false, list: dataList,pagesize:action.pagesize,pagenum:action.pagenum,word:action.word}

        case 'CLEAR_ALL_STATE':

            return{...init}

        default:
            return state
    }

}