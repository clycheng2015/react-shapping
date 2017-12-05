
import instance from '../utils/instance'
import {active} from '../utils/api'
import * as types from '../utils/const'



const requestDisAcList = () => ({
    type: types.RECIEVE_ACTIVE_MOVEMENT
});


const receiveDisAcList = (data) => ({
    type: types.REQUEST_ACTIVE_MOVEMENT,
    data

})

export const movement = (data,resolve,reject) =>{
    return(dispatch, getState) =>{
        dispatch(requestDisAcList());
        instance.get(active.activeMoveMent,data)
            .then(res =>{
                if (res.data.code == 200) {
                    dispatch(receiveDisAcList(res.data.data))
                    if(resolve){
                        resolve()
                    }
                }

            })
            .catch(error =>{
                console.log('error: ', error)
                if(reject){
                    reject()
                }
            })
    }
}