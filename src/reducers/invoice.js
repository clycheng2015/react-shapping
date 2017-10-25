
import * as types from '../utils/const'


let init = {
    invoiceType: {
        type:0,
        voiType:0,
        msg:{
            cpname:'',
            number:"",
        }
    },

    saveInvoice:{
        type:0,
        voiType:0,
        msg:{
            cpname:'',
            number:"",
        }
    }
}

export function invoice(state = init, action) {

    switch (action.type) {
        case types.GET_INVOICE_TYPE:
            return {...state,invoiceType:action.data}

        case types.SAVE_INVOICE_TYPE:
            return {...state,saveInvoice:action.data}



        default:
            return state
    }

}