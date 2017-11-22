/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {AppLocalStorage} from '../../utils/cookie'
import {Icon, Flex} from 'antd-mobile'

import * as car from 'actions/car'

require('./styles/index.less')


import TabBarMain from 'containers/common/tabbar'
import CarList from '../../components/car/carList'


@connect(
    state => {
        return {...state.car}
    },
    dispatch => bindActionCreators({...car}, dispatch)
)
export default class BuyCar extends React.Component {

    constructor(props) {
        super(props);
        this.user = AppLocalStorage.Cache.get('user')

    }

    componentDidMount() {
        const {fetchCarList, pagesize, pagenum, fetchCarBanner} = this.props
        if (this.user) {
            fetchCarList({
                pagesize: pagesize,
                pagenum: pagenum
            })

            fetchCarBanner()
        }
    }

    componentWillReceiveProps(nextProps) {
        const {fetchCarList, pagesize, pagenum, isFetching} = nextProps
        if (isFetching) {
            fetchCarList({pagesize: pagesize, pagenum: pagenum})
        }
    }

    render() {
        const {data, history, match, banner} = this.props

        return (
            <div className="car-container"
                 style={{
                     height: document.documentElement.clientHeight,
                     background: "#f7f6f6"
                 }}>
                <div key={this.props.location.pathname}>
                    <div className="nav-tab">
                        <Flex justify="center" align="center">
                            {
                                match.params.state === 'dltocar' ?
                                    <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                                        history.goBack()
                                    }}/></Flex.Item> : <Flex.Item className="item-head left"><span></span></Flex.Item>
                            }
                            <Flex.Item className="item-head center">购物车</Flex.Item>
                            <Flex.Item className="item-head right"><span></span></Flex.Item>
                        </Flex>
                    </div>

                    {
                        data && data.datalist && data.datalist.length > 0 ?
                            <div>
                                <div className="banner-info">
                                    <img src={require('static/images/user/car_icon.png')} alt=""/>
                                    {banner && banner.id && banner.name}
                                    {/*<img src={require('static/images/user/close_icon.png')} alt=""/>*/}
                                </div>
                                <CarList {...this.props}/>

                            </div>
                            :
                            <div className="empty-info"
                                 style={{
                                     height: document.documentElement.clientHeight - 130,
                                     background: "#f7f6f6"
                                 }}
                            >
                                <img src={require('static/images/empty/tmp_shopcar@2x.png')} alt=""/>
                                <p> 您的购物车空空如也</p>
                                <p onClick={() => {
                                    history.push("/")
                                }}> 去逛逛</p>
                            </div>
                    }
                </div>
                {
                    match.params.state !== 'dltocar' && <TabBarMain history={history} page="buyCar"/>
                }
            </div>
        )
    }
}
