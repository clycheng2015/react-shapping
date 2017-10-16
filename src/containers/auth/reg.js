/**
 * Created by bear on 2017/9/15.
 */
/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Button, Flex, Icon, InputItem, List, Toast} from 'antd-mobile'
import {createForm} from 'rc-form';
/*actions*/
import * as auth from 'actions/auth'
import * as global from 'actions/global'

//scroll 听说不错  试试

// import BScroll from 'better-scroll'


require('./styles/reg.less')

@connect(
    state => {
        return {...state.auth}
    },
    dispatch => bindActionCreators({...auth, ...global}, dispatch)
)
class Reg extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 60,
            state: false,
            txt: "发送"

        }

        this.timer = null;
    }


    countTime = () => {
        this.timer = setInterval(() => {

            this.setState({

                data: this.state.count--

            });

            if (this.state.count <= 0) {

                this.timer && clearInterval(this.timer);
            }
        }, 1000);
    }

    componentDidMount() {


        // const {match, getGoodsDetail} = this.props
        // const {params} = match
        // getGoodsDetail({
        //     pagesize: 1,
        //     pagenum: 10,
        //     id: parseInt(params.id)
        // })


    }


    _getCode = () => {

        const {match, sendRegCode, form, history} = this.props
        const {getFieldValue} = form

        let mobile = getFieldValue('mobile')
        console.log(mobile)
        if (mobile == undefined) {

            Toast.info('请输入手机号！', 1);

        } else {
            sendRegCode({mobile: mobile})

        }


    }
    _submite = () => {


        const {match, form, history, fetchReg} = this.props
        const {getFieldValue} = form

        let mobile = getFieldValue('mobile')
        let smscode = getFieldValue('code')
        let password = getFieldValue('password')


        let test = /^(\w){6,12}$/;


        if (mobile == undefined || password == undefined || smscode == undefined) {

            Toast.info('请输入您的账号信息！', 1);
        }
        else if (password !== undefined && !test.exec(password)) {


            Toast.info('请输入6-12位数字或者字母密码！', 1);


        } else {
            let data = {
                mobile: mobile,
                smscode: smscode,
                password: password
            }
            fetchReg(data,history)

        }

    }

    render() {
        const {data, history} = this.props

        const {getFieldProps} = this.props.form;

        return (

            <div className="auth-reg-container" style={{
                width: "100%",
                height: document.documentElement.clientHeight,
                // background: 'url(' + require('static/image/login_bg.png') + ') center center /  100%  100%  no-repeat'
            }}>

                {/*<img src={require('static/image/regist_bg.png')}*/}
                     {/*style={{*/}
                         {/*width: document.documentElement.clientWidth,*/}
                         {/*height: document.documentElement.clientHeight,*/}
                         {/*position:'absolute',*/}
                         {/*zIndex:-9999*/}
                     {/*}}*/}
                     {/*alt=""/>*/}

                <div className="tab-nav">
                    <Icon type="left" size="lg" onClick={() => {
                        history.goBack()
                    }} style={{color: 'black'}}/>
                </div>

                <div>

                    <Flex justify="center" align="center">
                        <Flex.Item className="logo">
                            手机注册

                        </Flex.Item>

                    </Flex>

                    <div className="form">


                        <List>
                            <InputItem
                                {...getFieldProps('mobile')}
                                type="number"
                                placeholder="输入手机号"
                                maxLength="11"

                            />
                            <InputItem
                                {...getFieldProps('code')}
                                type="number"
                                placeholder="输入验证码"
                                style={{width: "70%"}}
                                extra={
                                    <div className="send" onClick={() => {
                                        this._getCode()
                                    }}>

                                        发送

                                    </div>}
                            />
                            <InputItem
                                {...getFieldProps('password')}
                                type="password"
                                placeholder="请输入6-12位数字或者字母密码"
                            />
                        </List>

                        <div className="login-btn" onClick={()=>{this._submite()}}>
                            完成
                        </div>


                        {/*<div className="forget" onClick={() => {*/}
                        {/*history.push('/updatePwd')*/}
                        {/*}}>*/}
                        {/*忘记密码？*/}
                        {/*</div>*/}

                    </div>

                </div>
            </div>

        )
    }
}

export  default createForm()(Reg)



