/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppLocalStorage} from '../../utils/cookie'
import {Button, Modal, Badge, Card, Toast, WhiteSpace, Flex, List, Grid} from 'antd-mobile'
let alert = Modal.alert
import * as user from 'actions/user'
import * as global from 'actions/global'
import TabBarMain from 'containers/common/tabbar'
require('./styles/index.less')


const orderData = [
    {
        icon: require('static/images/user/pay_icon.png'),
        text: "待付款",
        index: 1,
        state: 1,
        count:0
    },
    {
        icon: require('static/images/user/send_icon.png'),
        text: "待发货",
        index: 2,
        state: 2,
        count:0

    },
    {
        icon: require('static/images/user/rec_icon.png'),
        text: "待收货",
        index: 3,
        state: 3,
        count:0
    },
    {
        icon: require('static/images/user/cha_icon.png'),
        text: "退款/售后",
        index: 4,
        state: 4,
        count:0
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
        const {getUserInfo, fetchBadge} = this.props
        let user = AppLocalStorage.Cache.get('user')
        if (user && user.userInfo) {
            getUserInfo({
                uid: user.userInfo.id,
                version: "1.1.0"
            })
        }

        fetchBadge()
    }

    _tabChange = ( i) => {
        const {userInfo, orderTabChange, history} = this.props

        orderTabChange(i.text, i.state, i.index)
        history.push(`/myOrder`);
    }


    _getBdage=(state)=>{
        const {badgeData}=this.props
        switch (state){
            case 1:return Number(badgeData.nopay);break;
            case 2:return Number(badgeData.payed);break;
            case 3:return Number(badgeData.noconfirm);break;
            case 4:return Number(badgeData.refund);break;
            default:return 0
        }
    }
    render() {
        const {userInfo, history, currentAnimate, badgeData} = this.props

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
                        <div style={{background: "white"}}>
                            <div className="new-card">
                                <Card className='head' style={{
                                    background: 'url(' + require('static/images/user/user_bg.png') + ') center center /  100%  100%  no-repeat'
                                }}>
                                    <Card.Header
                                        title={
                                            <div className="username">
                                                <p>
                                                    {userInfo.realname}
                                                    {/*<span className={userInfo.isvip == 0 ? 'uslVip' : 'lvVip'}>{userInfo.isvip == 0 ? '' : "vip"}</span>*/}
                                                </p>
                                                <p className="id">会员ID：{userInfo.id}</p>
                                                <div style={{height: ".2rem"}}/>
                                                <div className="wallet-info" onClick={() => {
                                                    history.push("/wallet");
                                                }}>
                                                    <p className="title">我的钱包</p>
                                                    <p className="count">￥{Number(userInfo.mymoney).toFixed(2)}</p>
                                                </div>
                                            </div> }
                                        extra={<div
                                            onClick={() => {
                                                history.push({
                                                    pathname: "/userCenter",
                                                    state: {userInfo: userInfo}
                                                })
                                            }}
                                            style={{
                                                width: "1.4rem",
                                                height: "1.4rem",
                                                borderRadius: "1rem",
                                                boxShadow: "0px 8px 20px #d19f06",

                                            }}
                                        >
                                            <img src={userInfo.headpic} alt="" className="headpic"
                                                 style={{width: "1.4rem", height: "1.4rem", borderRadius: "1rem",}}/>
                                        </div>

                                        }
                                        thumbStyle={{
                                            width: '1rem',
                                            height: '1rem',
                                            borderRadius: '1rem'
                                        }
                                        }
                                    />
                                </Card>
                            </div>
                        </div>
                        <div className="order-info">
                            <List.Item arrow="horizontal"
                                       extra="全部订单"
                                       onClick={() => {
                                           history.push(`/myOrder`);
                                           const {orderTabChange} = this.props
                                           orderTabChange('全部订单', -1, 0)
                                       }}
                            >
                                我的订单
                            </List.Item>

                            <Flex className="new-gird-info" justify="center" align="center">
                                {
                                     orderData.map((i, k) => (
                                        <Flex.Item key={k} style={{position: "relative"}} onClick={() => this._tabChange(i)} >
                                            { badgeData && typeof (badgeData.noconfirm) !=='undefined'&&<Badge text={Number(this._getBdage(i.state))} overflowCount={99} className="badge"/>}
                                            <img src={i.icon} alt=""/>
                                            <p>{i.text}</p>
                                        </Flex.Item>
                                    ))
                                }
                            </Flex>


                            {/*<Grid data={orderData} hasLine={false}*/}
                            {/*onClick={(el) => this._tabChange(el.text, el.index, el.state)}/>*/}


                        </div>

                        <div className="jin-info">
                            <List.Item
                                extra={<img src={require('static/images/user/jin_icon.jpg')} alt=""
                                            style={{width: '.64rem', height: ".36rem"}}/>}
                                onClick={() => {
                                    history.push(`/jinfu`);
                                    currentAnimate('left')
                                }}
                            >
                                金凤金服 <span className="count">￥{Number(userInfo.money).toFixed(2)}</span>
                            </List.Item>
                        </div>
                        <div className="other-list">
                            <List.Item
                                extra={<img src={require('static/images/user/ads_icon.png')} alt=""/>}
                                onClick={() => history.push({pathname: `/address/${0}`})}
                            >收货地址</List.Item>
                            <List.Item
                                extra={<img src={require('static/images/user/ser_icon.png')} alt=""/>}
                                onClick={() => history.push('/help')}
                            >
                                帮助中心
                            </List.Item>
                            <List.Item
                                extra={<img src={require('static/images/user/set_icon.png')} alt=""/>}
                                onClick={() => {
                                    history.push('/setting')
                                }}
                            >
                                设置
                            </List.Item>
                        </div>
                    </div>
                }
                <div style={{height: "1rem"}}/>
                <TabBarMain history={history} page="user"/>
            </div>
        )
    }
}
