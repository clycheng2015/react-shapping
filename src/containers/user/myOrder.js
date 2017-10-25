

/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

//
import OrderList from 'components/user/orderList1'
// import OrderList from 'components/user/orderList'


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
        this.state = {
            refreshing: true,
        }

    }
    componentDidMount() {
        const {uid, fetchOrderList, order, match, fetchGetPostage} = this.props


        const {isFetching, orderState, pagesize, pagenum, tab} = order
        //邮费
        fetchGetPostage()
        if (!isFetching) {

            fetchOrderList(tab, {uid: match.params.id, state: orderState, pagesize: pagesize, pagenum: pagenum})

        }


    }

    _tabChange = (tab, index) => {
        const {uid, orderTabChange} = this.props
        orderTabChange(tab.title, tab.state, index)

    }

    componentWillReceiveProps(nextProps) {

        const {uid, fetchOrderList, order, match} = nextProps

        const {tab, isFetching, orderState, success, pagesize, pagenum, delFetching, state, orderListInfo,isHandle} = order

        if ((!isFetching && tab != this.props.tab && ! orderListInfo[tab]) ) {

            fetchOrderList(tab, {uid: match.params.id, state: orderState, pagesize: pagesize, pagenum: pagenum})
        }
        if(isHandle){
            fetchOrderList(tab, {uid: match.params.id, state: orderState, pagesize: pagesize, pagenum: pagenum})
        }
    }
    render() {

        const {uid, fetchOrderList, order, history, fetchDelOrder, savePayOrder, match, postageData, fetchComfirm} = this.props
        const {tab, success, isFetching, tabs, orderList, orderState, pagesize, pagenum, tabIndex, orderListInfo} = order


        console.log(orderListInfo)
        return (
            <div className="myOrder-container"

                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f6f6f4",
                     marginBottom:"1rem"
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
                <div style={{paddingTop: ".65rem"}}>
                    <WhiteSpace />
                    <div>
                        <Tabs
                            tabs={tabs}
                            onChange={this._tabChange}
                            initialPage={tabIndex}
                        >
                            {
                                orderListInfo&&orderListInfo[tab]&&
                                <OrderList list={orderListInfo[tab]} fetchDelOrder={fetchDelOrder} uid={match.params.id}
                                           history={history} savePayOrder={savePayOrder} postageData={postageData}
                                           fetchComfirm={fetchComfirm}/>
                            }
                        </Tabs>


                    </div>
                </div>
            </div>
        )



    }
}

// /**
//  * Created by Administrator on 2016/7/1.
//  */
// import React from 'react'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'
//
//
// import OrderList from 'components/user/orderList1'
// // import OrderList from 'components/user/orderList'
//
//
// import {Tabs, Modal, Icon, WhiteSpace, Flex} from 'antd-mobile'
// import * as user from 'actions/user'
//
// require('./styles/myOrder.less')
// const alert = Modal.alert;
// @connect(
//     state => {
//         return {...state.user}
//     },
//     dispatch => bindActionCreators({...user}, dispatch)
// )
// export default class MyOrder extends React.Component {
//
//     constructor(props) {
//         super(props)
//         this.state = {
//             refreshing: true,
//         }
//
//     }
//     componentDidMount() {
//         const {uid, fetchOrderList, order, match, fetchGetPostage} = this.props
//
//
//         const {isFetching, orderState, pagesize, pagenum, tab} = order
//         //邮费
//         fetchGetPostage()
//         if (!isFetching) {
//
//             fetchOrderList(tab, {uid: match.params.id, state: orderState, pagesize: pagesize, pagenum: pagenum})
//
//         }
//
//
//     }
//
//     _tabChange = (tab, index) => {
//         const {uid, orderTabChange} = this.props
//         orderTabChange(tab.title, tab.state, index)
//
//     }
//
//     componentWillReceiveProps(nextProps) {
//
//         const {uid, fetchOrderList, order, match} = nextProps
//
//         const {tab, isFetching, orderState, success, pagesize, pagenum, delFetching, state, orderListInfo,isHandle} = order
//
//         if ((!isFetching && tab != this.props.tab && ! orderListInfo[tab]) ) {
//
//             fetchOrderList(tab, {uid: match.params.id, state: orderState, pagesize: pagesize, pagenum: pagenum})
//         }
//         if(isHandle){
//             fetchOrderList(tab, {uid: match.params.id, state: orderState, pagesize: pagesize, pagenum: pagenum})
//         }
//     }
//     render() {
//
//         const {uid, fetchOrderList, order, history, fetchDelOrder, savePayOrder, match, postageData, fetchComfirm} = this.props
//         const {tab, success, isFetching, tabs, orderList, orderState, pagesize, pagenum, tabIndex, orderListInfo} = order
//             return (
//                 <div className="myOrder-container"
//
//                      style={{
//                          minHeight: document.documentElement.clientHeight,
//                          background: "#f6f6f4",
//                          marginBottom:"1rem"
//                      }}
//                 >
//                     <div className="nav-tab">
//                         <Flex justify="center" align="center">
//                             <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
//                                 history.goBack()
//                             }}/></Flex.Item>
//                             <Flex.Item className="item-head center">我的订单</Flex.Item>
//                             <Flex.Item className="item-head right"><span></span></Flex.Item>
//                         </Flex>
//                     </div>
//                     <div style={{paddingTop: ".65rem"}}>
//                         <WhiteSpace />
//                         <div>
//                             <Tabs
//                                 tabs={tabs}
//                                 onChange={this._tabChange}
//                                 initialPage={tabIndex}
//                             >
//                                 {}
//                             </Tabs>
//                             {
//                                 orderListInfo&&orderListInfo[tab]?
//                                     <OrderList list={orderListInfo[tab]} fetchDelOrder={fetchDelOrder} uid={match.params.id}
//                                                history={history} savePayOrder={savePayOrder} postageData={postageData}
//                                                fetchComfirm={fetchComfirm}/>:<div></div>
//                             }
//
//                         </div>
//                     </div>
//                 </div>
//             )
//
//
//
//     }
// }
