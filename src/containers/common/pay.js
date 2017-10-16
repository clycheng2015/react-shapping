/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'


import {Button, NavBar, Modal, Icon, Card, Toast, Radio, List, Checkbox, Flex} from 'antd-mobile'

const RadioItem = Radio.RadioItem;
import * as user from 'actions/user'
require('./styles/pay.less')
import {pay} from '../../utils/weipay'

const alert = Modal.alert;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)

export default class Pay extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
            value: 0,
            value2: 0,
            value3: 0,
            value4: 0,
        }

    }

    componentDidMount() {
        const {fetchPay, uid, newPayOrder, getUserInfo} = this.props

        getUserInfo({uid: uid})

    }

    onChange = (value) => {
        const {fetchPay, uid, newPayOrder, userInfo,location} = this.props
        let count = location.state.count

        if (value === 1) {
            console.log("in1231323")
            if(userInfo.money<count){
                console.log("dasdsadasdasdasdasdads")

                Toast.info("余额不足请用微信支付！",1)

                this.setState({
                    value:0
                });

            }else {
                this.setState({
                    value,
                });

            }
        }else {

            this.setState({
                value,
            });

        }

    };
    onChange2 = (value) => {
        console.log('checkbox');
        this.setState({
            value2: value,
        });
    };
    _topay = () => {

        const {fetchPay, uid,history, newPayOrder,fetchExpPay,location} = this.props
        if(this.state.value==0){

        //微信支付

         fetchPay({
             uid:uid?uid:JSON.parse(localItem('userInfo')).id,
             id: newPayOrder.id
         },history)


     }else {
         //余额支付

            fetchExpPay({
                uid:uid?uid:JSON.parse(localItem('userInfo')).id,
                id: newPayOrder.id,
                money:location.state.count
            },history)


     }

    }

    render() {
        const {userInfo, history, location} = this.props
        const {value} = this.state;
        const count = location.state.count
        let data=[]
        if(location && location.state&&location.state.topup=='topup'){

            data=[

                // {value: 1, label: '余额支付', img: require('static/image/surpluse.png')},

                {value: 0, label: '微信支付', img: require('static/image/img_order_pay_weixin.png')},
            ];

        }else {
            data = [

                {value: 1, label: '余额支付', img: require('static/image/surpluse.png')},

                {value: 0, label: '微信支付', img: require('static/image/img_order_pay_weixin.png')},
            ];

        }

        return (
            <div className="pay-container"

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
                        <Flex.Item className="item-head center">支付订单</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>


                <div className="tot-info">
                    ￥{count}
                </div>
                <div className="pay-cmp">


                <List renderHeader={() => '支付方式'}>
                    {data.map(i => (
                        <RadioItem key={i.value} checked={value === i.value}
                                   // extra="123213"
                                   onChange={() => this.onChange(i.value)}
                                   thumb={i.img}>
                            {i.label}

                            {
                                i.value==1?<span className="exp">(可用余额：{userInfo.money}元)</span>:''
                            }

                        </RadioItem>
                    ))}
                </List>
                </div>
                <div className="pay-btn"
                     onClick={() => {
                         this._topay()
                     }}
                >
                    确认支付
                </div>

            </div>
        )
    }
}
