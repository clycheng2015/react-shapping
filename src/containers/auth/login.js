/**
 * Created by bear on 2017/9/15.
 */
/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Flex, Icon, InputItem, List, Modal, Toast} from 'antd-mobile'
import PropTypes from 'prop-types'
import {createForm} from 'rc-form';
import {removeLocalItem} from '../../utils/cookie'
import * as auth from 'actions/auth'
import {getQueryString} from  '../../utils/tools'

const alert = Modal.alert;
const prompt = Modal.prompt;
require('./styles/login.less')



@connect(
    state => {
        return {...state.auth}
    },
    dispatch => bindActionCreators({ ...auth}, dispatch)
)
class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mobile: "",
            password: ""
        }

    }

    componentDidMount() {
        const {match, fetchLogin, form, mobile, password} = this.props
        // if (mobile && password) {
        //     this.setState({
        //         mobile: mobile,
        //         password: password
        //
        //     })
        // }


    }

    _login = () => {
        const {match, fetchLogin, form, history} = this.props
        const {getFieldValue} = form
        let openid = getQueryString("openid");
        let toUrl=getQueryString("toUrl")
        // if(true){
        // if (openid && openid.length > 0) {
            let mobile = getFieldValue('number')
            let pwd = getFieldValue('password')
            if (mobile == undefined || pwd == undefined) {
                Toast.info('请输入账号或者密码！', 1);
            }
            else {
                let data = {
                    mobile: mobile,
                    password: pwd,
                    // openid:'ocR4-0qtFtZ3VOn_mGrfMSrLtB64'
                }
                fetchLogin(data, history,toUrl)
            }
        // }
        // else {
        //
        //     let url=window.location.href
        //
        //     url= url.match(/#(\S*)/)[1];
        //
        //     url=url.replace('/','')
        //
        //     alert('微信授权', <div></div>, [
        //         {
        //             text: '立即授权', onPress: () => {
        //             // removeLocalItem("userInfo")
        //             location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://www.worldwideapp.chinazjtc.com/app/user/wxgetopenid?url=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        //         }
        //         },
        //         {text: '微信搜索"美纶购"公众号', onPress: () => console.log('第1个按钮被点击了')},
        //         {text: '取消登录', onPress: () => history.goBack()},
        //     ])
        //
        //
        // }


    }

    render() {
        const {data, history} = this.props

        const {getFieldProps} = this.props.form;

        return (

            <div className="auth-login-container" style={{
                width: "100%",
                height: document.documentElement.clientHeight,
                // background: 'url(' + require('static/image/login_bg.png') + ') center center /  100%  100%  no-repeat'
            }}>


                {/*<img src={require('static/image/regist_bg.png')}*/}
                     {/*style={{*/}
                         {/*width: document.documentElement.clientWidth,*/}
                         {/*height: document.documentElement.clientHeight,*/}
                         {/*position: 'absolute',*/}
                         {/*zIndex: -9999*/}
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
                            <img src={require('static/image/ic_logo.png')} alt=""/>

                        </Flex.Item>

                    </Flex>

                    <div className="login-form">


                        <List>
                            <InputItem
                                {...getFieldProps('number')}
                                type="number"
                                placeholder="输入手机号"
                                maxLength="11"
                                // value={this.state.mobile}
                            />
                            <InputItem
                                {...getFieldProps('password')}
                                type="password"
                                placeholder="输入密码"
                                // value={this.state.password}
                            />
                        </List>

                        <div className="login-btn" onClick={() => {
                            this._login()
                        }}>
                            登录
                        </div>


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



