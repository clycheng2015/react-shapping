
import * as types from '../utils/const'


export  const saveParams= (data) => ({
    type:types.SAVE_LOCATION_STATE,
    data
});

export  const savePayParams= (data) => ({
    type:types.SAVE_PAY_STATE,
    data
});



export  const saveActiveParams= (data) => ({
    type:types.SAVE_ACTIVE_STATE,
    data
});

