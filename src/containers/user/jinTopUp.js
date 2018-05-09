/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {AppLocalStorage} from '../../utils/cookie'
import {InputItem, Modal, Icon, Flex, Toast, Radio, List} from 'antd-mobile'
import * as user from 'actions/user'
require('./styles/jinTopUp.less')
const alert = Modal.alert;
const RadioItem = Radio.RadioItem;
const data = [

    {value: 0, label: '微信支付', img: require('static/images/user/wechat_icon.png')},
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
            value: null
        }

    }
    componentDidMount() {
        const {fetchIcBaner} = this.props
        fetchIcBaner()
    }

    _topUp = () => {
        const {fetchTopUp, history, match} = this.props

        let  exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;



        if(!exp.test(this.state.value) || this.state.value<1){

            Toast.info("请输入正确的金额！",1)
            return false

        }

        if (this.state.value > 1000000000) {
            Toast.info("本次充值最大金额为100000000", 1)
            return false
        }
        fetchTopUp({money: this.state.value, goods_id: match.params.id}, history)
    }

    render() {
        const {history,userInfo, IcBanner} = this.props
        return (
            <div className="jinTopUp-container" style={{minHeight: document.documentElement.clientHeight, background: "#f3f3f1"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {history.goBack()}}/></Flex.Item>
                        <Flex.Item className="item-head center">充值中心</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div className="banner-info" style={{background:"white"}}>
                    {/*<img src={require('static/images/user/ban_icon.png')} alt=""/>*/}
                    {/*{Number(userInfo.money) >= 500 && '充值500元以上，享受专享优惠'}*/}
                    {/*{Number(userInfo.money) < 500 && `您还差${(500 - Number(userInfo.money)).toFixed(2)}元，享受专享优惠`}*/}
                    {/*<img src={require('static/images/user/close_icon.png')} alt=""/>*/}
                </div>
                <div className="count-info">
                    <p className="title">充值金额：</p>
                    <div className="cnt">
                        <InputItem type="number" value={this.state.value} onChange={(v) => this.setState({value: v})} placeholder="请输入充值金额">￥</InputItem>
                    </div>
                </div>
                <div className="pay-cmp">
                    <List renderHeader={() => '支付方式'}>
                        {data.map(i => (
                            <RadioItem key={i.value} checked={0 === i.value} onChange={() => this.onChange(i.value)} thumb={i.img}>{i.label}</RadioItem>
                        ))}
                    </List>
                </div>
                {/*<div className="msg-info">*/}
                {/*<p>温馨提示</p>*/}
                {/*<p> 1、余额与金凤余额充值累计达到500元，即可升级成为VIP，享受VIP专属价格;</p>*/}
                {/*<p> 2、若一次充值超过500元，立返20%。实际到账=充值金额+充值；</p>*/}
                {/*<p> 3、充值的金额，每天都由返的钱÷365进行返现，每周二进行提现。</p>*/}
                {/*</div>*/}
                <Flex className="deal-info">
                    <Flex.Item style={{padding: '15px 0', color: '#888', flex: 'none'}}>
                        <Radio className="my-radio" checked={true} onChange={e => console.log('checkbox', e)}> &nbsp;
                            选择勾选，</Radio>
                        则代表您同意 <span style={{color: "#2aa2e2"}}
                                     onClick={() => history.push('/protocol/3')}>《金凤金服充值协议》</span></Flex.Item>
                </Flex>
                <div className="up-btn"
                     onClick={() => this._topUp()}
                >
                    立即充值
                </div>
            </div>
        )
    }
}
