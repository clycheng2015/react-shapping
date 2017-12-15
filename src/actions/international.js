
import instance from '../utils/instance'
import {nation} from '../utils/api'
import * as types from '../utils/const'


const requestInter = () => ({
    type: types.RECIEVE_INTER,
});

const receiveInter = () => ({
    type: types.REQUEST_INTER,

})

export const getInter = () =>{
    return(dispatch, getState) =>{
        dispatch(requestInter());
        instance.get(nation.nationList)
            .then(res =>{
                if (res.data.code == 200) {
                    dispatch(receiveInter())

                }

            })
            .catch(error =>{
                console.log('error: ', error)

            })
    }
}