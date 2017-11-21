/**
 * Created by bear on 2017/9/14.
 */
import * as types from '../utils/const'


export const getInvoice = (data) => ({

    type: types.GET_INVOICE_TYPE,

    data,

});

export const saveInvoices = (data) => ({

    type: types.SAVE_INVOICE_TYPE,

    data,

});

export const clearInvoice=()=>({

    type:"CLEAR_INVOICE"


})

