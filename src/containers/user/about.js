/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon,Flex} from 'antd-mobile'

import * as user from 'actions/user'
import * as global from 'actions/global'
require('./styles/about.less')

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

    render() {
        const { history} = this.props
        return (
            <div className="about-container" ref='wrapper'

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
                        <Flex.Item className="item-head center">关于我们</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <ul className="list">
                    <li className="head">特别说明</li>
                    <li className="cnt">
                        美伦购在此声明，您通过本软件参加的商业活动第三方无关。

                    </li>
                    <li className="head">商务合作</li>
                    <li className="cnt">
                        <p>美伦购公众号 <span>meilungou</span></p>
                        <p>联系电话 <span>17394969275</span></p>

                    </li>
                    <li className="head">版本号 <span>V1.0.0</span></li>

                </ul>
            </div>
        )
    }
}
