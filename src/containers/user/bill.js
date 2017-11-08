/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppLocalStorage} from '../../utils/cookie'
import {ymd} from '../../utils/tools'


import {Modal, Icon, Toast, WhiteSpace, Flex, List} from 'antd-mobile'

import * as user from 'actions/user'
import * as global from 'actions/global'
require('./styles/bill.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)

export default class Bill extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}

    }

    componentDidMount() {
        const {fetchMyBill, bill,match} = this.props
       const {params}=match
        const {pagesize, pagenum} = bill
        fetchMyBill({
            pagesize: pagesize,
            pagenum: pagenum,
            type:params.id
        })
    }
    render() {
        const {bill, history} = this.props
        const {data} = bill
            return (
                <div className="bill-container"

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
                            <Flex.Item className="item-head center">资金记录</Flex.Item>
                            <Flex.Item className="item-head right"><span></span></Flex.Item>
                        </Flex>
                    </div>

                    {
                        data && data.datalist && data.datalist.length > 0?
                            <List style={{paddingTop: "1rem"}} key="k"

                                  // renderHeader={() => '2017年9月'}
                            >

                            {
                                data.datalist.map((i, key) => {

                                    switch (i.type) {

                                        case 'TX':

                                            return (
                                                <List.Item arrow=""
                                                           thumb={ require('static/image/icon_bill_red.png')}
                                                           key={key}
                                                           extra={"-" + i.money}
                                                >
                                                    提现
                                                    <List.Item.Brief>
                                                        {ymd(i.addtime,'-',':')}
                                                    </List.Item.Brief>
                                                </List.Item>

                                            )

                                        case 'RECHARGE':

                                            return (

                                                <List.Item arrow=""
                                                           thumb={ require('static/image/icon_bill_blue.png')}
                                                           key={key}
                                                           extra={"+" + i.money}
                                                >
                                                    充值
                                                    <List.Item.Brief>
                                                        {ymd(i.addtime,'+',':')}
                                                    </List.Item.Brief>
                                                </List.Item>

                                            )

                                        case 'GOODS':

                                            return (

                                                <List.Item arrow=""
                                                           thumb={ require('static/image/icon_bill_blue.png')}
                                                           key={key}
                                                           extra={"+" + i.money}
                                                >
                                                    消费
                                                    <List.Item.Brief>
                                                        {ymd(i.addtime,'-',':')}
                                                    </List.Item.Brief>
                                                </List.Item>

                                            )

                                        case 'TXTUI':

                                            return (

                                                <List.Item arrow=""
                                                           thumb={ require('static/image/icon_bill_blue.png')}
                                                           key={key}
                                                           extra={"+" + i.money}
                                                >
                                                    提现退款
                                                    <List.Item.Brief>
                                                        {ymd(i.addtime,'+',':')}
                                                    </List.Item.Brief>
                                                </List.Item>

                                            )
                                        case 'TUI':

                                            return (

                                                <List.Item arrow=""
                                                           thumb={ require('static/image/icon_bill_blue.png')}
                                                           key={key}
                                                           extra={"+" + i.money}
                                                >
                                                    退款
                                                    <List.Item.Brief>
                                                        {ymd(i.addtime,'+',':')}
                                                    </List.Item.Brief>
                                                </List.Item>

                                            )


                                    }
                                })}

                        </List>

                            :

                            <div className="empty-info"
                                 style={{
                                     height: document.documentElement.clientHeight - 130,
                                     background: "#f3f3f1"
                                 }}
                            >

                                <img src={require('static/images/empty/tmp_order@2x.png')} alt=""/>
                                <p> </p>
                                <p > 您还没有账单信息</p>
                            </div>

                    }
                </div>
            )


    }
}
