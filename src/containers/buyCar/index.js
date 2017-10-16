/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {localItem} from '../../utils/cookie'
import {Icon, Flex} from 'antd-mobile'
/*actions*/
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
        this.userInfo = localItem('userInfo')

    }
    componentDidMount() {
        const {fetchCarList, pagesize, pagenum} = this.props
        let userInfo = this.userInfo
        if ((typeof userInfo) == 'string') {

            fetchCarList({
                uid: JSON.parse(userInfo).id,
                pagesize: pagesize,
                pagenum: pagenum
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        const {fetchCarList, pagesize, pagenum, isFetching} = nextProps

        console.log(isFetching)
        if (isFetching) {
            let userInfo = this.userInfo
            if ((typeof userInfo) == 'string') {

                fetchCarList({
                    uid: JSON.parse(userInfo).id,
                    pagesize: pagesize,
                    pagenum: pagenum
                })
            }


        }
    }
    render() {
        const {data, history, fetchDelCar, fetchUpdateCarNum, match} = this.props


        return (
            <div className="car-container"
                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f3f3f1"
                 }}>
                <div key={this.props.location.pathname}>
                    <div className="nav-tab">
                        <Flex justify="center" align="center">

                            {
                                match.params.state == 'dltocar' ?
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
                            <CarList history={history} list={data.datalist} fetchDelCar={fetchDelCar}
                                     fetchUpdateCarNum={fetchUpdateCarNum} match={match}/>
                            :
                            <Flex justify="center" align="center" style={{width: "100%", height: "100%"}}>
                                <Flex.Item >
                                    <div style={{width: "100%", textAlign: "center", paddingTop: "2.8rem"}}>
                                        <img style={{width: "3rem",}}

                                             src={require('static/image/caricon.png')} alt=""/>

                                        <p style={{
                                            color:"grey",
                                            paddingTop:".5rem"
                                        }}>哎呀，购物车是空的！</p>
                                    </div>

                                </Flex.Item>
                            </Flex>
                    }
                </div>
                {
                    match.params.state == 'dltocar' ?'' :

                        <TabBarMain history={history} page="buyCar"/>

                }

            </div>
        )
    }
}
