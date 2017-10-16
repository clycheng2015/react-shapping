/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'


import {Modal, Icon, Toast, WhiteSpace, Flex, List} from 'antd-mobile'

import * as user from 'actions/user'
import * as global from 'actions/global'
require('./styles/bill.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user, ...global}, dispatch)
)

export default class Bill extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}

    }

    componentDidMount() {
        const {fetchMyBill, bill, uid} = this.props

        console.log(this.props)


        const {pagesize, pagenum} = bill

        fetchMyBill({
            pagesize: pagesize,
            pagenum: pagenum,
            uid: uid
        })
    }


    render() {
        const {bill, history} = this.props
        const {data} = bill

        console.log(data)


        if (data && data.datalist && data.datalist.length > 0) {

            return (
                <div className="bill-container"

                     style={{
                         // minHeight: document.documentElement.clientHeight,
                         // background: "#f3f3f1"
                     }}
                >

                    <div className="nav-tab">
                        <Flex justify="center" align="center">
                            <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                                history.goBack()
                            }}/></Flex.Item>
                            <Flex.Item className="item-head center">账单</Flex.Item>
                            <Flex.Item className="item-head right"><span></span></Flex.Item>
                        </Flex>
                    </div>


                    <List style={{paddingTop: ".8rem"}} key="k">

                        {
                            data.datalist.map((i, key) => {

                                switch (i.type) {

                                    case 'TX':

                                        return (
                                                <List.Item arrow=""
                                                           thumb={ require('static/image/icon_bill_red.png')}
                                                           key={key}
                                                           extra={"-" + i.usermoney}
                                                >
                                                    提现
                                                    <List.Item.Brief>
                                                        {i.addtime}
                                                    </List.Item.Brief>
                                                </List.Item>

                                        )

                                    case 'RECHARGE':

                                        return (

                                                <List.Item arrow=""
                                                           thumb={ require('static/image/icon_bill_blue.png')}
                                                           key={key}
                                                           extra={"+" + i.usermoney}
                                                >
                                                    充值
                                                    <List.Item.Brief>
                                                        {i.addtime}
                                                    </List.Item.Brief>
                                                </List.Item>

                                        )

                                    case 'GOODS':

                                        return (

                                                <List.Item arrow=""
                                                           thumb={ require('static/image/icon_bill_blue.png')}
                                                           key={key}
                                                           extra={"+" + i.usermoney}
                                                >
                                                    商品抵消
                                                    <List.Item.Brief>
                                                        {i.addtime}
                                                    </List.Item.Brief>
                                                </List.Item>

                                        )

                                    case 'FAN':

                                        return (

                                                <List.Item arrow=""
                                                           thumb={ require('static/image/icon_bill_blue.png')}
                                                           key={key}
                                                           extra={"+" + i.usermoney}
                                                >
                                                    返现
                                                    <List.Item.Brief>
                                                        {i.addtime}
                                                    </List.Item.Brief>
                                                </List.Item>

                                        )


                                }
                            })}

                    </List>


                </div>
            )


        } else {


            return (
                <div className="bill-container"

                     style={{
                         // minHeight: document.documentElement.clientHeight,
                         // background: "#f3f3f1"
                     }}
                >

                    <div className="nav-tab">
                        <Flex justify="center" align="center">
                            <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                                history.goBack()
                            }}/></Flex.Item>
                            <Flex.Item className="item-head center">账单</Flex.Item>
                            <Flex.Item className="item-head right"><span></span></Flex.Item>
                        </Flex>
                    </div>
                    <div style={{width: '100%', textAlign: "center", marginTop: "3rem"}}>

                        暂无账单信息
                    </div>

                </div>
            )
        }

    }
}
