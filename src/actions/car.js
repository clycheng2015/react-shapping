/**
 * Created by bear on 2017/9/14.
 */

import qs from 'qs'
import instance from '../utils/instance'
import {car} from '../utils/api'
import * as types from '../utils/const'


const getCarList = (pagesize, pagenum, data) => ({
    type: types.GET_CAR_LIST,
    pagesize, pagenum, data
});


const delCar = () => ({
    type: types.DEL_CAR_LIST,

});


const updateCarNum = () => ({
    type: types.UPDATE_CAR_NUM,

});


export const fetchCarList = (data) => {

    return (dispatch, getState) => {


        instance.post(car.carList, qs.stringify(data))
            .then(res => {

                if (res.data.code == 200) {

                    dispatch(getCarList(data.pagesize, data.pagenum, res.data.data))

                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}


export const fetchDelCar = (data) => {

    return (dispatch, getState) => {
        instance.post(car.delCarList, qs.stringify(data))
            .then(res => {

                if (res.data.code == 200) {
                    dispatch(delCar())
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

export const fetchUpdateCarNum = (data) => {

    return (dispatch, getState) => {
        instance.post(car.updateCarNum, qs.stringify(data))
            .then(res => {

                if (res.data.code == 200) {
                    dispatch(updateCarNum())
                }

            })
            .catch(error => {

                console.log('error: ', error)
            })
    }
}

