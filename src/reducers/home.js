import * as types from '../utils/const';

let init = {
  pagesize: 20,
  pagenum: 1,
  scrollT: 0,
  hasMore: true,
  isFetching: false,
  homeData: {},
  moreData: {},
  dataList: [],
  headState: 0,
  errorData: {},

  msgCount: 0
};
export const home = (state = init, action) => {
  switch (action.type) {
    case types.RECEIVE_HOME:
      return {
        ...state,
        homeData: action.data
      };
    case types.HEAD_STATE:
      return {
        ...state,
        headState: action.headState
      };
    case types.RECORD_SCROLLT:
      return {
        ...state,
        scrollT: action.scrollT
      };
    case types.REQUEST_HOME_MORE_LIST:
      return { ...state, isFetching: true };

    case types.RECEIVE_HOME_MORE_LIST:
      let pages = action.data.pages;
      let hasMore = true;
      let dataList = state.dataList;
      if (action.pagenum > pages) {
        hasMore = false;
      } else if (action.pagenum > state.pagenum) {
        dataList = dataList.concat(action.data.datalist);
      } else if (action.pagenum === 1) {
        dataList = action.data.datalist;
      }

      return {
        ...state,
        isFetching: false,
        hasMore: hasMore,
        moreData: action.data,
        dataList: dataList,
        pagesize: action.pagesize,
        pagenum: action.pagenum
      };

    case types.SEVER_ERROR:
      return { ...state, errorData: action.data };

    case types.GET_MSG_COUNT:
      return { ...state, msgCount: action.data };

    case 'CLEAR_ALL_STATE':
      return { ...init };

    default:
      return { ...state };
  }
};
