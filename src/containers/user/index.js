/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppLocalStorage} from '../../utils/cookie'
import {Button, Modal, Icon, Card, Toast, WhiteSpace, Flex, List, Grid} from 'antd-mobile'
let alert = Modal.alert
import * as user from 'actions/user'
import * as global from 'actions/global'
import TabBarMain from 'containers/common/tabbar'
require('./styles/index.less')


const orderData = [
    {
        icon: require('static/images/user/pay_icon.png'),
        text: "待付款",
        index: 0,
        state: 1
    },
    {
        icon: require('static/images/user/send_icon.png'),
        text: "待发货",
        index: 1,
        state: 2

    },
    {
        icon: require('static/images/user/rec_icon.png'),
        text: "待收货",
        index: 2,
        state: 3
    },
    {
        icon: require('static/images/user/cha_icon.png'),
        text: "退/换货",
        index: 3,
        state: 4
    },
]

@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user, ...global}, dispatch)
)

export default class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        const {getUserInfo} = this.props
        let user = AppLocalStorage.Cache.get('user')
        if (user && user.userInfo) {
            getUserInfo({
                uid: user.userInfo.id,
                version: "1.1.0"
            })
        }
    }
    _tabChange = (tab, index, state) => {
        const {userInfo, orderTabChange, history} = this.props
        orderTabChange(tab, state, index)
        history.push(`/myOrder/${userInfo.id}`);
    }
    render() {
        const {userInfo, history,currentAnimate} = this.props
        return (
            <div className="user-container"
                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f3f3f1"
                 }}
            >

                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"></Flex.Item>
                        <Flex.Item className="item-head center">我的</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                {
                    userInfo && userInfo.id &&
                    <div>
                        <Card className='head'>
                            <Card.Header
                                title={
                                    <div className="username">
                                        <p>
                                            {userInfo.realname}
                                            {/*<span className={userInfo.isvip == 0 ? 'uslVip' : 'lvVip'}>{userInfo.isvip == 0 ? '' : "vip"}</span>*/}
                                        </p>
                                        <div className="wallet-info" onClick={() => {
                                            history.push("/wallet");
                                        }}>
                                            <p className="title">我的钱包</p>
                                            <p className="count">￥{Number(userInfo.mymoney).toFixed(2)}</p>
                                        </div>
                                    </div> }
                                extra={<img onClick={() => {
                                    history.push({
                                        pathname: "/userCenter",
                                        state: {userInfo: userInfo}
                                    })
                                }} src={userInfo.headpic} alt="" className="headpic" style={{
                                    width: "1.6rem",
                                    height: "1.6rem",
                                    borderRadius: "1rem",
                                    boxShadow: "0 0 3px black"
                                }}/>}
                                thumbStyle={{
                                    width: '1rem',
                                    height: '1rem',
                                    borderRadius: '1rem'
                                }
                                }
                            />
                        </Card>
                        <div className="order-info">
                            <List.Item arrow="horizontal"
                                       extra="全部订单"
                                       onClick={() => {
                                           history.push(`/myOrder/${userInfo.id}`);
                                           const {orderTabChange} = this.props
                                           orderTabChange('待付款', 1, 0)
                                       }}
                            >
                                我的订单
                            </List.Item>
                            <Grid data={orderData} hasLine={false}
                                  onClick={(el) => this._tabChange(el.text, el.index, el.state)}/>
                        </div>

                        <div className="jin-info">
                            <List.Item
                                extra={<img src={require('static/images/user/jin_icon.jpg')} alt=""
                                            style={{width: '.64rem', height: ".36rem"}}/>}
                                onClick={() => {history.push(`/jinfu`);currentAnimate('left')}}
                            >
                                金凤金服 <span className="count">￥{Number(userInfo.money).toFixed(2)}</span>
                            </List.Item>
                        </div>
                        <div className="other-list">
                            <List.Item
                                extra={<img src={require('static/images/user/ads_icon.png')} alt=""/>}
                                onClick={() => history.push({pathname:`/address/${0}`})}
                            >收货地址</List.Item>
                            <List.Item
                                extra={<img src={require('static/images/user/ser_icon.png')} alt=""/>}
                                onClick={() => history.push('/help')}
                            >
                                帮助中心
                            </List.Item>
                            <List.Item
                                extra={<img src={require('static/images/user/set_icon.png')} alt=""/>}
                                onClick={() => {history.push('/setting')}}
                            >
                                设置
                            </List.Item>
                        </div>
                    </div>
                }
                <TabBarMain history={history} page="user"/>
            </div>
        )
    }
}
