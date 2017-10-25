/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'


import { Modal, Icon,Toast, WhiteSpace, Flex, List} from 'antd-mobile'

import * as user from 'actions/user'
import * as global from 'actions/global'
require('./styles/setting.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user, ...global}, dispatch)
)

export default class Setting extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
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

    _loginOut = () => {
        const {loginOut, history} = this.props
        removeLocalItem("userInfo")
        loginOut()
        Toast.loading('正在退出...', 1, () => {

            console.log('Load complete !!!');


        });
        setTimeout(() => {
            history.push("/")
        }, 2000)




    }

    render() {
        const {userInfo, history} = this.props
        // console.log(userInfo)


        return (
            <div className="setting-container"

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
                        <Flex.Item className="item-head center">设置</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>


                <div style={{paddingTop: "1rem"}}>
                    <List.Item arrow="" onClick={() => alert('提示', '清除本地缓存成功', [
                        {text: '确定', onPress: () => console.log('ok')},
                    ])}>
                        清除本地缓存

                    </List.Item>


                    <List.Item arrow="" onClick={() => {
                        history.push('/about')
                    }}> 关于</List.Item>
                </div>
                <WhiteSpace/>
                <div>

                    <List.Item arrow="" onClick={() => {
                        this._loginOut()
                    }}>安全退出</List.Item>
                </div>

                {/*<Button onClick={() => {*/}
                {/*removeLocalItem("userInfo")*/}
                {/*}}>清除</Button>*/}
                {/*<TabBarMain history={history} page="user"/>*/}
            </div>
        )
    }
}
