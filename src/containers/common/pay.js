/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {AppLocalStorage} from '../../utils/cookie'
import { Modal, Icon, Toast, Radio, List, Flex} from 'antd-mobile'

const RadioItem = Radio.RadioItem;
import * as user from 'actions/user'
require('./styles/pay.less')
import {pay} from '../../utils/weipay'

let payData=[
    {value: 1, label: '余额支付', img: require('static/image/surpluse.png')},
    {value: 2, label: '金凤金服钱包', img: require('static/images/user/jin_icon.png')},
    {value: 0, label: '微信支付', img: require('static/image/img_order_pay_weixin.png')},
]

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
            value:0,
        }

    }
    componentDidMount() {
        const {getUserInfo} = this.props
        let user=AppLocalStorage.Cache.get("user")

        if(user){
            getUserInfo({uid:user.userInfo.id,version: "1.1.0"})
        }
    }

    onChange = (value) => {
        const {userInfo,match} = this.props
        let count = Number(match.params.id)

        if((value === 1&&userInfo.mymoney<count) || (value === 2&&userInfo.money<count)){
            Toast.info("余额不足请用微信支付！",1)
            this.setState({value:0});
            return
        }
        this.setState({value});
    };

    _topay = () => {
        const {fetchPay,history, newPayOrder,fetchExpPay,match,userInfo} = this.props
        let data={
            uid:userInfo.id,
            id: newPayOrder.id
        }

        if(this.state.value===0){
            //微信支付
            fetchPay({  order_id: newPayOrder.id,paytype:"H5"},history)
        }
        if(this.state.value===1){
            //余额支付
            fetchExpPay({...data,money: Number(match.params.id),type:'mymoney'},history)
        }

        if(this.state.value===2){
            //金凤余额支付
            fetchExpPay({...data,money: Number(match.params.id),type:'money'},history)
        }
    }
    render() {
        const {userInfo, history, match} = this.props
        const {value} = this.state;
        const count =  Number(match.params.id).toFixed(2)
        return (
            <div className="pay-container" style={{minHeight: document.documentElement.clientHeight, background: "#f3f3f1"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {history.goBack()}}/></Flex.Item>
                        <Flex.Item className="item-head center">订单支付</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div className="tot-info">￥{count}</div>
                <div className="pay-cmp">
                <List renderHeader={() => '支付方式'}>
                    {payData.map(i => (
                        <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)} thumb={i.img}>
                            {i.label}
                            {i.value===1&&<span className="exp">(可用余额：{userInfo.mymoney}元)</span>}
                            {i.value===2&&<span className="exp">(可用余额：{userInfo.money}元)</span>}
                        </RadioItem>
                    ))}
                </List>
                </div>
                <div className="pay-btn" onClick={() => {this._topay()}}>确认支付</div>
            </div>
        )
    }
}
