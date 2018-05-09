
import instance from '../utils/instance'
import {active} from '../utils/api'
import * as types from '../utils/const'

//拿到写死的数据
const deadList = (data) => ({
    type: types.DEADLIST,
    data
})

export const recordScrollT=(scrollT)=>({

    type: 'ACTIVE_SCROLL',
    scrollT

})

export const getDeadList = (data) =>{

    return(dispatch) =>{

        dispatch(deadList(data))
    }
}

