/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon,Flex,List} from 'antd-mobile'

import * as user from 'actions/user'
import * as global from 'actions/global'
require('./styles/wallet.less')

@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user,}, dispatch)
)



export default class Wallet extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
        }


    }

    render() {
        const { history,userInfo} = this.props
        return (
            <div className="wallet-container" ref='wrapper'

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
                        <Flex.Item className="item-head center">钱包</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div style={{height:".8rem"}}>

                </div>
                <div className="count-info" style={{
                    background:'url('+require('static/images/user/mlg_waleet_bg.png')+') center center /  100%  100%  no-repeat'
                }}>

                    <p>单位(元)</p>
                    <p className="count">{Number(userInfo.money).toFixed(2)}</p>

                </div>
                <List.Item
                    thumb={require('../../static/images/user/top_icon.png')} arrow="horizontal"
                    onClick={() => {

                history.push('/topUp')
                }}
               >充值</List.Item>
                <List.Item
                     thumb={require('../../static/images/user/record_icon.png')}
                            arrow="horizontal"
                    onClick={() => {

                        history.push(`/bill/${0}`)
                    }}

                >资金记录</List.Item>
            </div>
        )
    }
}
