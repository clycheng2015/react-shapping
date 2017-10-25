/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'

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

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    componentDidMount() {
        // const {getUserInfo} = this.props
        //
        // let userInfo = localItem('userInfo')
        //
        // if (typeof userInfo == 'string') {
        //     // console.log(JSON.parse(userInfo))
        //     getUserInfo({uid: JSON.parse(userInfo).id})
        // }
    }


    _withdraw = () => {

        const {uid, fetchWithDraw, history, location} = this.props

        console.log(uid)
        const {getFieldsValue} = this.props.form;

        // if (this.state.value > location.state.expCount) {
        //
        //     Toast.info("可提现金额为" + location.state.expCount, 1)
        //     return false
        // }
        let data = getFieldsValue(["bankname", "bankCard", "username", "phone"])

        if (data.bankname == '') {

            Toast.info("请输入银行名称！", 1)
            return false

        }
        if (data.username == '') {

            Toast.info("请输入银行名称！", 1)
            return false

        }
        if (data.bankCard == '' || (data.bankCard.replace(/\s/g, '').length < 15)) {

            Toast.info("请输入正确的银行卡号！", 1)
            return false

        }
        if (data.phone == '' || (data.phone.replace(/\s/g, '').length < 11)) {

            Toast.info("请输入正确的手机号！", 1)
            return false

        }

        let newdata={
            uid:uid,
            tiqumoney:this.state.value,
            money:location.state.expCount,
            bankname:data.bankname,
            banknum:data.bankCard.replace(/\s/g, ''),
            bankusername:data.username,
            mobile:data.phone.replace(/\s/g, '')
        }
        fetchWithDraw(newdata,history)


    }

    render() {
        const {history, topUp, location} = this.props
        const {getFieldProps} = this.props.form;
        return (
            <div className="jinwithdraw-container"

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
                        <Flex.Item className="item-head center">提现</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div className="top-info">
                    <div className="title">
                        提现金额：
                    </div>
                    <div className="cnt">
                        <InputItem type="'number"
                                   {...getFieldProps('number')}
                                   value={this.state.value}

                                   onChange={(v) => this.setState({

                                       value: v
                                   })}
                                   placeholder="12.80">￥</InputItem>
                    </div>
                </div>

                {/*<p className="more">*/}
                    {/*最多可提现：*/}
                    {/*{*/}
                        {/*location.state && location.state.expCount ? location.state.expCount : 0.00*/}
                    {/*}*/}
                    {/*元*/}
                    {/*<span onClick={() => this.setState({*/}

                        {/*value: location.state && location.state.expCount ? location.state.expCount : 0*/}
                    {/*})}>全部使用</span>*/}
                {/*</p>*/}

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
                    <p> 1、余额与金凤余额充值累计达到500元，即可升级成为VIP，享受VIP专属价格;</p>
                    <p> 2、若一次充值超过500元，立返20%。实际到账=充值金额+充值；</p>
                    <p> 3、充值的金额，每天都由返的钱÷365进行返现，每周二进行提现。</p>
                </div>

            </div>
        )
    }
}


export  default createForm()(WithDraw)