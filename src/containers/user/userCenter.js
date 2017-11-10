/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppLocalStorage} from '../../utils/cookie'


import {Modal, Icon, Toast, WhiteSpace, Flex, List} from 'antd-mobile'

import * as user from 'actions/user'
import * as global from 'actions/global'
require('./styles/userCenter.less')
const prompt = Modal.prompt;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)

export default class UserCenter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

        const {getUserInfo} = this.props
        let user = AppLocalStorage.Cache.get('user')

        if (user) {
            getUserInfo({uid: user.userInfo.id,version:'1.1.0'})
        }

    }
    _updateName = (value, uid) => {
        const {fetchUpdateName} = this.props
        if (value == '') {
            Toast.info("昵称不能为空", 1)
        }
        else {
            fetchUpdateName({
                realname: value,
                uid: uid
            })
        }
    }

    render() {
        const {userInfo, history} = this.props


        const list = () => {

            if (userInfo && userInfo.id) {

                return (
                    <div>
                        <List style={{paddingTop: "1rem"}}>
                            <List.Item arrow="horizontal"
                                       extra={<img src={userInfo.headpic} alt="" className="headpic"/>}>头像</List.Item>
                        </List>
                        <List>

                            <List.Item arrow="horizontal" extra={<span>{userInfo.realname}</span>}
                                       onClick={() => prompt('修改昵称', '请输入您的昵称',
                                           [
                                               {text: '取消'},
                                               {
                                                   text: '保存',
                                                   onPress: value => new Promise((resolve) => {
                                                       setTimeout(() => {
                                                           resolve();
                                                           this._updateName(value, userInfo.id)
                                                       }, 600);

                                                   }),
                                               },
                                           ], 'default', null, ['输入昵称'])}
                            >昵称</List.Item>
                        </List>
                        <List>
                            <List.Item arrow="" extra={<span
                                style={{paddingRight: '.4rem'}}>{userInfo.id}</span>}>美纶购ID</List.Item>
                        </List>
                    </div>

                )

            } else {

                <div></div>
            }
        }
        return (
            <div className="userCenter-container"
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
                        <Flex.Item className="item-head center">个人信息</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>

                {list()}
            </div>
        )
    }
}
