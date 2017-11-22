/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppLocalStorage} from '../../utils/cookie'

import {createForm} from 'rc-form';
import {InputItem, Modal, Icon, Flex, Toast, List} from 'antd-mobile'

import * as user from 'actions/user'

require('./styles/jinDraw.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)
class WithDraw extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
            value: null
        }

    }

    componentWillMount(){
        const { getUserInfo} = this.props
        let user = AppLocalStorage.Cache.get('user')
        if (user && user.userInfo) {
            getUserInfo({
                uid: user.userInfo.id,
                version: "1.1.0"
            })
        }
    }

    _withdraw = () => {

        const {uid, fetchWithDraw, history, userInfo} = this.props

        const {getFieldsValue} = this.props.form;
        let exp =/^(0|[1-9]\d*)(\.\d{1,2})?$/

        let data = getFieldsValue(["bankname", "bankCard", "username", "phone"])
        if(this.state.value>userInfo.jftomoney){Toast.info("可提现金额不足！", 1);return false}
        if( this.state.value<=0){Toast.info("请输入正确的金额！",1);return false}
        if(!exp.test(this.state.value)){Toast.info("请输入正确的金额！",1);return false}

        console.log(data.bankname)

        if (data.bankname === undefined) {Toast.info("请输入银行名称！", 1);return false}

        if (data.bankCard === undefined || (data.bankCard.replace(/\s/g, '').length < 15)) {Toast.info("请输入正确的银行卡号！", 1);return false}

        if (data.username === undefined) {Toast.info("请输入卡主姓名！", 1);return false}

        if (data.phone === undefined || (data.phone.replace(/\s/g, '').length < 11)) {Toast.info("请输入正确的手机号！", 1);return false}


        let newdata={
            uid:uid,
            tiqumoney:this.state.value,
            money:userInfo.jftomoney,
            bankname:data.bankname,
            banknum:data.bankCard.replace(/\s/g, ''),
            bankusername:data.username,
            mobile:data.phone.replace(/\s/g, '')
        }
        fetchWithDraw(newdata,history)


    }

    render() {
        const {history, userInfo} = this.props
        const {getFieldProps} = this.props.form;
        return (
            <div className="jinwithdraw-container" style={{minHeight: document.documentElement.clientHeight, background: "#f3f3f1"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {history.goBack()}}/></Flex.Item>
                        <Flex.Item className="item-head center">提现</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                {
                    userInfo&&userInfo.id&&
                    <div><div className="top-info-wl">
                            <div className="title">提现金额：</div>
                            <div className="cnt">
                                <InputItem type="money"
                                           {...getFieldProps('number', {
                                               normalize: (v, prev) => {
                                                   if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                                       if (v === '.') {
                                                           return '0.';
                                                       }
                                                       return prev;
                                                   }
                                                   return v;
                                               },
                                           })}
                                           moneyKeyboardAlign="left"
                                           value={this.state.value}
                                           onChange={(v) => this.setState({
                                               value: v
                                           })}
                                           clear
                                           placeholder={ userInfo.jftomoney}>￥</InputItem>
                            </div>
                        </div>
                        <p className="more">最多可提现：{userInfo.jftomoney}元<span onClick={() => this.setState({value:userInfo.jftomoney})}>全部使用</span></p>
                    </div>
                }

                <List className="form">
                    <InputItem
                        {...getFieldProps('bankname')}
                        clear
                        placeholder="如：渤海银行"
                        ref={el => this.autoFocusInst = el}
                    >所属银行</InputItem>
                    <InputItem
                        {...getFieldProps('bankCard')}
                        type="bankCard"
                        placeholder="8888 8888 8888 8888"
                    >银行卡号</InputItem>

                    <InputItem
                        {...getFieldProps('username')}
                        clear
                        placeholder="银行卡绑定姓名"
                        ref={el => this.autoFocusInst = el}
                    >卡主姓名</InputItem>
                    <InputItem
                        {...getFieldProps('phone')}
                        type="phone"
                        placeholder="银行卡绑定手机号"
                    >手机号码</InputItem>
                </List>
                {/*<p className="more">*/}
                    {/*请如实填写并核对您提现的银行卡号和卡主姓名，如果提现打款不成功，客户会通过联系电话联系您。*/}

                {/*</p>*/}
                <div className="up-btn"
                     onClick={() => this._withdraw()}
                >
                    确定提现
                </div>


                <div className="msg-info">
                    <p>温馨提示</p>
                    <p> 1、请认真填写相关信息，若打款不成功，客服会通过联系电话联系您！</p>
                    <p> 2、打卡仅支持储蓄卡。</p>
                </div>

            </div>
        )
    }
}
export  default createForm()(WithDraw)