import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import OrderList from 'components/user/orderList'
import {Tabs, Modal, Icon, WhiteSpace, Flex} from 'antd-mobile'
import * as user from 'actions/user'
require('./styles/myOrder.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)
export default class MyOrder extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {fetchOrderList, order, match, fetchGetPostage} = this.props
        const {isFetching, orderState, pagesize, pagenum, tab} = order
        //邮费
        fetchGetPostage()
        if (!isFetching) {
            fetchOrderList(tab, { state: orderState, pagesize: pagesize, pagenum: pagenum})
        }
    }

    _tabChange = (tab, index) => {
        const { orderTabChange} = this.props
        orderTabChange(tab.title, tab.state, index)

    }

    _refresh = () => {
        const {fetchOrderList, order} = this.props
        const { orderState, pagesize, pagenum, tab} = order
        //邮费
        fetchOrderList(tab, { state: orderState, pagesize: pagesize, pagenum: 0})

    }

    componentWillReceiveProps(nextProps) {

        const { fetchOrderList, order, } = nextProps

        const {tab, isFetching, orderState,  pagesize, pagenum,orderListInfo, isHandle} = order

        if ((!isFetching && tab != this.props.tab && !orderListInfo[tab])) {

            fetchOrderList(tab, { state: orderState, pagesize: pagesize, pagenum: pagenum})
        }
        if (isHandle) {
            fetchOrderList(tab, { state: orderState, pagesize: pagesize, pagenum: pagenum})
        }
    }

    render() {

        const {uid, fetchOrderList, order, history, fetchDelOrder, savePayOrder, match, postageData, fetchComfirm} = this.props
        const {tab, success, isFetching, tabs, orderList, orderState, pagesize, pagenum, tabIndex, orderListInfo} = order

        console.log(orderListInfo[tab])

        return (
            <div className="myOrder-container"

                 style={{
                     height: document.documentElement.clientHeight,
                     background: "#f3f3f1"
                 }}
            >
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">我的订单</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div>
                    <WhiteSpace />
                    <div >
                        <Tabs
                            tabs={tabs}
                            onChange={this._tabChange}
                            initialPage={tabIndex}
                            swipeable={false}

                        >
                            {
                                <div className="list-info" style={{
                                    minHeight: document.documentElement.clientHeight,

                                }}>

                                    {
                                        orderListInfo && orderListInfo[tab] &&
                                        <OrderList list={orderListInfo[tab]} fetchDelOrder={fetchDelOrder}

                                                   history={history} savePayOrder={savePayOrder}
                                                   postageData={postageData}
                                                   fetchComfirm={fetchComfirm}
                                                    refresh={this._refresh}
                                        />
                                    }

                                    {  !orderListInfo[tab] &&


                                    <div className="empty-info"
                                         style={{
                                             height: document.documentElement.clientHeight - 130,
                                             background: "#f3f3f1"
                                         }}
                                    >
                                        <img src={require('static/images/empty/tmp_order@2x.png')} alt=""/>
                                        <p></p>
                                        <p>暂无相关订单</p>
                                    </div>
                                    }
                                </div>


                            }
                        </Tabs>

                    </div>
                </div>
            </div>
        )
    }
}