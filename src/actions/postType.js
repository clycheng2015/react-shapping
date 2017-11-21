/**
 * Created by bear on 2017/9/14.
 */
import * as types from '../utils/const'


export const getPostType = (data) => ({

    type: types.GET_POST_TYPE,
    data,

});


export const savePost=(data)=>({

    type: types.SAVE_POST_TYPE,data
})



export const clearPostType=()=>({

    type: 'CLEAR_POST_TYPE'
})


