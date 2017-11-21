/**
 * Created by bear on 2017/9/15.
 */
/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Flex, Icon, InputItem, List, Modal, Toast} from 'antd-mobile'
import {createForm} from 'rc-form';
import {AppLocalStorage} from '../../utils/cookie'
import * as auth from 'actions/auth'
import {getQueryString} from  '../../utils/tools'
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'
const alert = Modal.alert;
const prompt = Modal.prompt;
require('./styles/login.less')
@connect(
    state => {
        return {...state.auth}
    },
    dispatch => bindActionCreators({...auth}, dispatch)
)
class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mobile: "",
            password: ""
        }
    }
    _login = () => {
        const {match, fetchLogin, form, history} = this.props
        const {getFieldValue} = form
        let openid = getQueryString("openid")||'';
        let toUrl = getQueryString("toUrl")
            let mobile = getFieldValue('number')
            let pwd = getFieldValue('password')
            if (mobile == undefined || pwd == undefined) {
                Toast.info('请输入账号或者密码！', 1);
            }
            else {
                let data = {
                    mobile: mobile,
                    password: pwd,
                }
                fetchLogin(data, history, toUrl, openid)
            }
    }

    render() {
        const {history} = this.props
        const {getFieldProps} = this.props.form;

        return (

            <div className="auth-login-container"
                 style={{width: "100%", height: document.documentElement.clientHeight, background: "white"}}>
                <div className="tab-nav"><Icon type="left" size="lg" onClick={() => {
                    history.goBack()
                }} style={{color: 'black'}}/></div>
                <div>
                    <Flex justify="center" align="center">
                        <Flex.Item className="logo"><img src={require('static/image/ic_logo.png')} alt="" style={{width:"1.5rem"}}/></Flex.Item>
                    </Flex>
                    <div className="login-form">
                        <List>
                            <InputItem
                                {...getFieldProps('number')}
                                type="number"
                                placeholder="输入手机号"
                                maxLength="11"
                            />
                            <InputItem
                                {...getFieldProps('password')}
                                type="password"
                                placeholder="输入密码"
                            />
                        </List>
                        <div className="login-btn" onClick={() => this._login()}>登录</div>
                        <div className="forget">
                            <span onClick={() => {
                                history.push('/updatePwd')
                            }}>忘记密码？</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export  default createForm()(Login)



