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
        index: "0",
        state: 1
    },
    {
        icon: require('static/images/user/send_icon.png'),
        text: "待发货",
        index: "1",
        state: 2

    },
    {
        icon: require('static/images/user/rec_icon.png'),
        text: "待收货",
        index: "2",
        state: 3
    },
    {
        icon: require('static/images/user/cha_icon.png'),
        text: "退/换货",
        index: "3",
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
        // document.title = '个人中心';
        // const iframe = document.createElement('iframe');
        // iframe.style.cssText = 'display: none; width: 0; height: 0;';
        // iframe.src = 'http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/05/0F/ChMkJ1erCriIJ_opAAY8rSwt72wAAUU6gMmHKwABjzF444.jpg';
        //
        // const listener = () => {
        //     setTimeout(() => {
        //         iframe.removeEventListener('load', listener);
        //         setTimeout(() => {
        //             document.body.removeChild(iframe);
        //         }, 0);
        //     }, 0);
        // };
        // iframe.addEventListener('load', listener);
        // document.body.appendChild(iframe);
    }

    componentDidMount() {
        const {getUserInfo} = this.props

        // AppLocalStorage.Cache.clear()
        let user = AppLocalStorage.Cache.get('user')

        console.log(user)

        if (user && user.userInfo) {

            // console.log(JSON.parse(userInfo))
            getUserInfo({
                uid: user.userInfo.id,
                version:"1.1.0"
            })


        }
    }


    _tabChange = (tab, index, state) => {
        const {userInfo, orderTabChange, history} = this.props
        orderTabChange(tab, state, index)
        history.push(`/myOrder/${userInfo.id}`);


    }

    render() {
        const {userInfo, history} = this.props
        console.log(userInfo)
        const info = () => {

            if (userInfo && userInfo.id) {
                return (
                    <div>
                        <Card className='head'>


                            <Card.Header
                                title={<div className="username">
                                    <p>{userInfo.realname}
                                    <span className={userInfo.isvip == 0 ? 'uslVip' : 'lvVip'}>{userInfo.isvip == 0 ? '' : "vip"}</span>
                                    </p>
                                    <div className="wallet-info" onClick={() => {

                                        history.push("/wallet")
                                    }}>

                                        <p className="title">我的钱包</p>
                                        <p className="count">￥{Number(userInfo.money).toFixed(2)}</p>

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

                                           orderTabChange('待收款', 1, 0)
                                       }}
                            >

                                我的订单
                            </List.Item>

                            <Grid data={orderData} hasLine={false}
                                  onClick={(el) => this._tabChange(el.text, el.index, el.state)}/>
                        </div>

                        <div className="jin-info">
                            <List.Item
                                extra={<img src={require('static/images/user/jin_icon.jpg')} alt="" style={{width:'.64rem',height:".36rem"}}/>}
                                onClick={() => {

                                    history.push(`/jinfu`)
                                }}
                            >

                                金凤金服 <span className="count">￥{Number(userInfo.money).toFixed(2)}</span>
                            </List.Item>

                        </div>


                        <div className="other-list">

                            <List.Item
                                // thumb={require('../../static/image/ic_pos.png')}
                                //        arrow="horizontal"
                                extra={<img src={require('static/images/user/ads_icon.png')} alt=""/>}

                                onClick={() => {

                                    history.push('/address')
                                }}

                            >收货地址</List.Item>

                            <List.Item
                                extra={<img src={require('static/images/user/ser_icon.png')} alt=""/>}

                                onClick={() => {


                                    alert('联系客服', <div>请选择咨询客服</div>, [
                                        {
                                            text: '购物咨询', onPress: () => {
                                            location.href = 'tel:400-1080-305'
                                        }
                                        },
                                        {text: '招商咨询', onPress: () => location.href = 'tel:028-8593-8032'},
                                        {
                                            text: '取消', onPress: () => {
                                        }
                                        },
                                    ])
                                }}
                            >
                                联系客服
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
                )
            }
        }
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

                {info()}
                <TabBarMain history={history} page="user"/>
            </div>
        )
    }
}
