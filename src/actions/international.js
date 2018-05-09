
import instance from '../utils/instance'
import {nation} from '../utils/api'
import * as types from '../utils/const'

import * as search from './search'


const requestInter = () => ({
    type: types.RECIEVE_INTER,
});

const receiveInter = (data) => ({
    type: types.REQUEST_INTER,
    data
})

export const getInter = () =>{

    let data={
    pagesize: 100, pagenum: 1 ,isown:2
    }
    return(dispatch, getState) =>{
        dispatch(requestInter());
        instance.get(nation.nationList)
            .then(res =>{

                if (res.data.code == 200) {

                    dispatch(receiveInter(res.data.data));

                    res.data.data.mlgjCategoryDto[0].id ===1?dispatch(search.getMlSearchList({...data,ischoice:1})): dispatch(search.getMlSearchList({...data,cid:res.data.data.mlgjCategoryDto[0].category_id}))





                }

            })
            .catch(error =>{
                console.log('error: ', error)

            })
    }
}