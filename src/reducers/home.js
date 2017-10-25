import * as types from '../utils/const'

let init = {
    pagesize: 30,
    pagenum: 1,
    isFetching: false,
    success: false,
    scrollT: 0,
    list: [],
    homeList: {},
    tabs: [],
    tab: "推荐",
    cid:"",
    tabIndex:'',
    //改版
    bannerList:[],
    centerList:[],
    moreList:[],
    hamMore:false,


}

export const home = (state = init, action) => {


    switch (action.type) {

        case types.GET_TABS:
            let tabs = []
            if (action.tabs.length > 0) {
                action.tabs.forEach(i => {
                    "use strict";
                    tabs.push({
                        title: i.cname,
                        cid: i.id
                    })
                })
            }
            return {...state, tabs: tabs}

        case types.TAB_CHANGE:
            //初始化状态
            return {
                ...state,
                tab: action.tab,
                tabIndex:action.index,
                cid:action.cid,
                pagesize: 30,
                pagenum: 1,
                isFetching: false,
                success: false,
                scrollT: 0,
                list: [],
                // bannerList:[],
                // centerList:[],
                moreList:[],

            }


        case types.REQUEST_LIST:


            return {...state, isFetching: true}


        case types.GET_HOME_LIST:


            let hasMore=false

            if(action.list[2].dataList.length===0){

                hasMore=true
            }

            return {
                ...state,
                isFetching: false,
                success: true,
                pagesize: action.pagesize,
                pagenum: action.pagenum,
                list: action.list,
                moreList:state.moreList.concat(action.list[2].dataList),
                homeList: {
                    ...state.homeList,
                    [action.tab]: {
                        list: action.list,
                        bannerList:action.list[0].dataList,
                        centerList:action.list[1].dataList,
                        moreList:state.moreList.concat(action.list[2].dataList),
                        isFetching: false,
                        success: true,
                        pagesize: action.pagesize,
                        pagenum: action.pagenum,
                        hasMore:hasMore
                    }
                }
            }
        default:
            return state
    }
}

