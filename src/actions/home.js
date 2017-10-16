/**
 * Created by Administrator on 2016/7/2.
 */
import instance from '../utils/instance'
import {home} from '../utils/api'
import * as types from '../utils/const'
import qs from 'qs'






const requestList= tab => ({
    type:types.REQUEST_LIST,
    tab
});


const receiveHomeList = (tab, pagenum, pagesize, list) => ({
    type: types.GET_HOME_LIST,
    tab, pagenum, pagesize, list
})
const receiveTabs = (tabs) => ({
    type: types.GET_TABS,
    tabs
})
export const tabChange = (tab,cid,index) => ({
    type: types.TAB_CHANGE,
    tab,cid,index
})
export const getTabs = () => {
    return (dispatch, getState) => {
        instance.post(home.tabsUrl, {})
            .then(res => {
                console.log('获取tab成功')
                if(res.data.code==200){
                    dispatch(receiveTabs(res.data.data))
                    dispatch(getHomeList('推荐',{
                        pagenum:1,
                        pagesize:30,
                        cid:'',
                    }))
                }
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}

export const getHomeList = (tab, data,resolve, reject) => {
    data.boolean=true
    return (dispatch, getState) => {
        dispatch(requestList(tab));
        instance.post(home.homeUrl, qs.stringify(data))
            .then(res => {
                console.log('获取列表成功')
                dispatch(receiveHomeList(tab, data.pagenum, data.pagesize, res.data.data))
                // resolve()

            })
            .catch(error => {
                // reject()
                console.log('error: ', error)
            })
    }
}

