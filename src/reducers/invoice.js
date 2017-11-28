import * as types from '../utils/const'


let init = {
    invoiceType: {
        type: 0,
        voiType: 1,
        msg: {
            cpname: '',
            number: "",
            username: ''
        }
    },

    saveInvoice: {
        type: 0,
        voiType: 1,
        msg: {
            cpname: '',
            number: "",
            username: ''
        }
    }
}

export function invoice(state = init, action) {

    switch (action.type) {
        case types.GET_INVOICE_TYPE:
            return {...state, invoiceType: action.data}

        case types.SAVE_INVOICE_TYPE:
            return {...state, saveInvoice: action.data}

        case 'CLEAR_ALL_STATE':

            return {...init}
        case 'CLEAR_INVOICE':

            return {...init}

        default:
            return state
    }

}