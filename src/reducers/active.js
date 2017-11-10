/**
 * Created by bear on 2017/9/14.
 */

import * as types from '../utils/const'

let init = {
    list: [],
    disList:[],
    pagenum:1,
    pagesize:20,
    isFetching:false,
    disIsFetching:false,
    skillHasMore:true,
    disHasMore:true,
    scrollT:0
}


export const active = (state = init, action) => {


    switch (action.type) {

        case 'ACTIVE_SCROLL':

            return {...state,scrollT:action.scrollT}


        case types.REQUEST_ACTIVE_LIST:

            return {...state,isFetching:true}



        case types.RECIEVE_ACTIVE_LIST:

            let list=[]

           if(state.pagenum<action.pagenum){

               list=state.list.concat(action.list)

           }else {

               list=action.list

           }

            let skillstate=true

            if(action.list.length===0){
                skillstate=false
            }

            return {...state,isFetching:false,pagesize:action.pagesize,pagenum:action.pagenum,list:list,skillHasMore:skillstate}


        case types.REQUEST_DISACTIVE_LIST:

            return {...state,disIsFetching:true}

        case types.RECIEVE_DSIACTIVE_LIST:
            let dislist=[]

            if(state.pagenum<action.pagenum){

                dislist=state.list.concat(action.list)

            }else {

                dislist=action.list

            }

            let disstate=true

            if(action.list.length===0){
                disstate=false
            }

            return {...state,disIsFetching:false,pagesize:action.pagesize,pagenum:action.pagenum,disList:dislist,disHasMore:disstate}

        default:
            return state
    }

}