/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'


import {Button, Modal, Icon, Card, Toast, WhiteSpace, Flex, List} from 'antd-mobile'
let alert=Modal.alert
import * as user from 'actions/user'
import * as global from 'actions/global'
require('./styles/index.less')

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

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }
    componentWillMount(){
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
        var wxopenid = getcookie('wxopenid');

            console.log(wxopenid)


        let userInfo = localItem('userInfo')

        if (typeof userInfo == 'string') {
            // console.log(JSON.parse(userInfo))
            getUserInfo({uid: JSON.parse(userInfo).id})
        }
    }

    render() {
        const {userInfo, history} = this.props
        console.log(userInfo)


        const info = () => {

            if (userInfo && userInfo.id) {
                return (
                    <div>
                        <Card className='head' style={{paddingTop: "1rem"}}>

                            <Link to={{
                                pathname: "/userCenter",
                                state: {userInfo: userInfo}
                            }}>
                                <Card.Header
                                    title={<div className="username"><p>{userInfo.realname}</p><span
                                        className={userInfo.isvip == 0 ? 'uslVip' : 'lvVip'}>{userInfo.isvip == 0 ? '普通会员' : "高级会员"}</span>
                                    </div> }
                                    thumb={userInfo.headpic}
                                    thumbStyle={{
                                        width: '1rem',
                                        height: '1rem',
                                        borderRadius: '1rem'
                                    }
                                    }
                                />
                            </Link>
                            <Card.Body style={{border: 'none'}}>
                                <div className="wallet">
                                    <Flex>

                                        <Flex.Item>
                                            <p className="title">我的钱包（元）</p>
                                            <p className="count">{userInfo.money}</p>

                                        </Flex.Item>
                                        <Flex.Item>
                  <span className="draw-btn"

                  onClick={()=>history.push('/topUp')}
                  >
                    <img style={{width: '.2rem', paddingLeft: '.1rem'}}
                         src={require('../../static/image/icon_bill_blue.png')} alt=""/>
                     充值
                  </span>

                                        </Flex.Item>
                                    </Flex>
                                    <WhiteSpace size="lg"/>

                                    <Flex>

                                        <Flex.Item>
                                            <p className="title">累计可提现（元）</p>
                                            <p className="e-count">{userInfo.jftomoney}</p>

                                        </Flex.Item>
                                        <Flex.Item>
                                            {
                                                userInfo.istixian == 0 ?
                                                    <span className="draw-btn-not"
                                                          onClick={()=>Toast.info('返现时间为每周二（9:00-18:00）')}


                                                    ><img
                                                        style={{width: '.2rem', paddingLeft: '.1rem'}}
                                                        src={require('../../static/image/ic_reflect.png')}
                                                        alt=""/>提现</span>
                                                    :
                                                    <span className="draw-btn"
                                                          onClick={()=>history.push(

                                                              {
                                                                  pathname:"/withdraw",

                                                                  state:{expCount:userInfo.jftomoney}

                                                              }
                                                          )}

                                                    ><img
                                                        style={{width: '.2rem', paddingLeft: '.1rem'}}
                                                        src={require('../../static/image/ic_reflect.png')}
                                                        alt=""/>提现</span>
                                            }

                                        </Flex.Item>
                                    </Flex>
                                    <WhiteSpace size="lg"/>
                                </div>
                            </Card.Body>
                        </Card>

                        <List style={{paddingTop: '.2rem'}}>
                            <List.Item thumb={require('../../static/image/ic_my_order.png')} arrow="horizontal"
                                       onClick={() => {

                                           history.push(`/myOrder/${userInfo.id}`);
                                           const { orderTabChange} = this.props

                                           orderTabChange('待收款',1, 0)
                                       }}
                            >

                                我的订单

                            </List.Item>
                            <List.Item thumb={require('../../static/image/ic_bill.png')}
                                       onClick={() => {

                                           history.push('/bill')
                                       }}
                                       arrow="horizontal">账单</List.Item>
                            <List.Item thumb={require('../../static/image/ic_pos.png')}
                                       arrow="horizontal"
                                       onClick={() => {

                                           history.push('/address')
                                       }}

                            >收货地址</List.Item>
                            <List.Item thumb={require('../../static/image/ic_phone.png')}
                                       onClick={() => {

                                           history.push('/phone')
                                       }}
                                       arrow="horizontal">绑定手机号</List.Item>
                        </List>


                        <List style={{paddingTop: '.1rem'}}>
                            <List.Item thumb={require('../../static/image/kefuicon.png')} arrow="horizontal"
                                       onClick={() => {


                                           alert('联系客服', <div>请选择咨询客服</div>, [
                                               {text: '购物咨询', onPress: () => {location.href='tel:400-1080-305'}},
                                               {text: '招商咨询', onPress: () =>  location.href='tel:028-8593-8032'},
                                               {text: '取消', onPress: () => {}},
                                           ])

                                       }}
                            >

                                联系客服

                            </List.Item>
                            <List.Item thumb={require('../../static/image/ic_set.png')} arrow="horizontal"
                                       onClick={() => {

                                           history.push('/setting')
                                       }}
                            >

                                设置

                            </List.Item>
                        </List>


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
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.push('/')
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">个人中心</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>


                </div>

                {info()}

            </div>
        )
    }
}
