import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {AppLocalStorage} from '../../utils/cookie'
import {Button, Flex, Icon,Modal} from 'antd-mobile'
import * as global from 'actions/global'
require('./styles/index.less')
import {getQueryString} from  '../../utils/tools'

const alert = Modal.alert;
@connect(
    state => {
        return {...state.global}
    },
    dispatch => bindActionCreators({...global}, dispatch)
)
export default class Auth extends React.Component {

    constructor(props) {
        super(props);
    }
    componentWillMount(){



    }
    componentDidMount() {

        let openid = getQueryString("openid");



    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }
    render() {
        const {data, history} = this.props
        return (
            <div className="auth-container" style={{
                width: "100%",
                height: document.documentElement.clientHeight,
                background:"white"
                // background: 'url(' + require('static/image/regist_bg.png') + ') center center /  100%  100%  no-repeat'
            }}>
                <div className="tab-nav">
                    <Icon type="left" size="lg" onClick={() => {
                        history.goBack()
                    }} style={{color: 'black'}}/>
                </div>
                <div>
                    <Flex justify="center" align="center">
                        <Flex.Item className="logo">
                            <img src={require('static/image/ic_logo.png')} alt="" style={{width:"1.5rem"}}/>
                            <br/>
                            {/*<img src={require('static/image/ic_logo_name.png')} alt=""/>*/}
                        </Flex.Item>
                    </Flex>
                    <Flex justify="center" align="center" direction="column" className="auth-form">
                        {/*<Flex.Item className='info'>*/}
                            {/*<div >微信认证</div>*/}

                        {/*</Flex.Item>*/}
                        <Flex.Item className='info'>
                            <div onClick={()=>{history.push('/login')}}>已有账号？立即登录</div>

                        </Flex.Item>
                        <Flex.Item className="info">
                            <div className="reg-btn" onClick={()=>{history.push('/reg')}}>手机注册</div>

                        </Flex.Item>
                        <Flex.Item className="info">

                            <div className="fog-btn" onClick={()=>{history.push('/updatePwd')}}>忘记密码？</div>
                        </Flex.Item>

                    </Flex>
                </div>
            </div>

        )
    }
}
