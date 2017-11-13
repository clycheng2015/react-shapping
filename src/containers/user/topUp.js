/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'


import {InputItem, Modal, Icon, Flex,Toast, Radio, List} from 'antd-mobile'

import * as user from 'actions/user'

require('./styles/topUp.less')
const alert = Modal.alert;

const RadioItem = Radio.RadioItem;
const   data = [

    {value: 1, label: '微信支付', img: require('static/images/user/wechat_icon.png')},

    // {value: 1, label: '支付宝', img: require('static/images/user/alipay_icon.png')},
    // {value: 2, label: '银联支付', img: require('static/images/user/bank_icon.png')},
];
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)

export default class TopUP extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
            value:null,
            bannerState:1
        }

    }
    _topUp=()=>{

        const {fetchTopUp,history}=this.props




        let  exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;



        if(!exp.test(this.state.value) || this.state.value<1){

            Toast.info("请输入正确的金额！",1)
            return false

        }


        if(this.state.value>10000){

            Toast.info("本次充值最大金额为10000",1)

            return false
        }
        fetchTopUp({money:this.state.value},history)

    }
    render() {

        const { history,userInfo} = this.props

        return (
            <div className="topUp-container"

                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f3f3f1"
                 }}
            >
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">充值中心</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>

                <div style={{height:"1rem"}}>

                </div>

                {
                    this.state.bannerState===888&&
                    <div className="banner-info">

                    <img src={require('static/images/user/ban_icon.png')} alt=""/>
                    {
                        Number(userInfo.mymoney)>=500 && '充值500元以上，享受专享优惠'
                    }

                    {
                        Number(userInfo.mymoney)<500 && `您还差${(500-Number(userInfo.mymoney)).toFixed(2)}元，享受专享优惠`
                    }

                    <img src={require('static/images/user/close_icon.png')} alt="" onClick={()=>this.setState({bannerState:0})}/>

                    </div>
                }

                <div className="count-info">
                    <p className="title">

                        充值金额：
                    </p>
                    <div className="cnt">
                        <InputItem type="number"

                                   value={this.state.value}

                                   onChange={(v)=>this.setState({
                                       value:v
                                   })}
                                   placeholder="请输入充值金额">￥</InputItem>
                    </div>
                </div>

                <div className="pay-cmp">


                    <List renderHeader={() => '支付方式'}>
                        {data.map(i => (
                            <RadioItem key={i.value} checked={1 === i.value}
                                // extra="123213"
                                       onChange={() => this.onChange(i.value)}
                                       thumb={i.img}>
                                {i.label}

                            </RadioItem>
                        ))}
                    </List>
                </div>
                <Flex  className="deal-info">
                    <Flex.Item style={{ padding: '15px 0', color: '#888', flex: 'none' }}>
                        <Radio className="my-radio"  checked={true} onChange={e => console.log('checkbox', e)}> &nbsp;选择勾选，</Radio>
                        则代表您同意 <span style={{color:"#2aa2e2"}} onClick={()=>history.push('/protocol/2')}>《美纶购充值协议》</span></Flex.Item>
                </Flex>
                <div className="up-btn"
                onClick={()=>this._topUp()}
                >
                    立即充值
                </div>
            </div>
        )
    }
}
