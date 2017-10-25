/**
 * Created by bear on 2017/9/16.
 */
import React from 'react'
import {Modal, RefreshControl, ListView} from 'antd-mobile'
import Scroller from '../../utils/Scroller/src/Scroller';
const alert = Modal.alert;
export  default  class OrderList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            height: document.documentElement.clientHeight,
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    //
    // shouldComponentUpdate(np, ns) {
    //
    //
    //     return (!np.list != this.props.list)
    //
    //
    // }
    pullRefreshAction = (resolve, reject) => {


        resolve()

    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction = (resolve, reject) => {


    }

    _delOrder = (id) => {

        const {uid, fetchDelOrder} = this.props

        fetchDelOrder({

            uid: uid,
            id: id
        })

    }

    _comfirmOrder = (oid) => {
        //传uid  用户id  oid 订单id
        const {uid, fetchComfirm} = this.props

        let data = {

            uid: uid,
            oid: oid
        }

        fetchComfirm(data)
    }


    _sum = (p,type) => {

        const {list, history, savePayOrder, postageData} = this.props

        let sum = 0
        if (postageData && postageData.id) {
            if (Number(p) > Number(postageData.free)) {
                return sum = p



            } else {

                    if(type=='1'){

                        sum = Number(p)
                    }else {

                        sum = Number(p)+Number(postageData.value)

                    }
                return sum
            }
        }


    }

    render() {
        const {list, history, savePayOrder, postageData} = this.props




        const row = (data) => {
            if (data.length > 0) {
                return (
                    data.map((rowData, k) => (

                            <div key={k}>

                                <div className="top-box">
                                    < div className="box">

                                        <div className="odd-info">
                                            <span className="odd">订单号：{rowData.ordernum}</span>

                                            <span className="icon">

                                                        <span style={{
                                                            border: 'none',
                                                            color: "red",
                                                            paddingRight: ".1rem"
                                                        }}>

                                                             {rowData.ispickup == '1' ? '自提' : ''}
                                                            {rowData.ispickup == '0' ? '邮寄' : ''}
                                        </span>

                                                        <span>

                                                     {rowData.ordertype == "GOODS" ? '商品' : ''}
                                                            {rowData.ordertype == "SECKILL" ? '秒杀' : ''}
                                                            {rowData.ordertype == "DISCOUNT" ? '特价' : ''}


                                                    </span>

                                                    </span>

                                            {
                                                rowData.state == 1 ?
                                                    <span className="state">未支付</span> : ''
                                            }
                                            {
                                                rowData.state == 2 ?
                                                    <span className="state">已支付</span> : ''
                                            }
                                            {
                                                rowData.state == 3 ?
                                                    <span className="state">已发货</span> : ''
                                            }
                                            {
                                                rowData.state == 4 ?
                                                    <span className="state">已收货</span> : ''
                                            }

                                            {
                                                rowData.state == 5 ?
                                                    <span className="state">申请退款</span> : ''
                                            }
                                            {
                                                rowData.state == 6 ?
                                                    <span className="state">退款成功</span> : ''
                                            }

                                        </div>

                                        <div
                                            onClick={() => {

                                                if (rowData.state == 1) {
                                                    history.push({
                                                        pathname: `/yesOrder/${this._sum(Number(rowData.money),rowData.ispickup ).toFixed(2)}`,
                                                        state: {orderId: rowData.id}
                                                    })


                                                }

                                            } }>

                                            {
                                                rowData.goodsitems.map((i, index) => (

                                                    < div className="top" key={index}>
                                                        <div className="img">
                                                            <img src={i.goods_smallpic} alt=""/>
                                                        </div>
                                                        <div className="title">

                                                            <p className="name">{i.goods_title}</p>
                                                            <p className="price">
                                                                商品属性：无
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className="bottom">

                                            {
                                                rowData.state == 1 ?


                                                    <div className="btn">

                                                    <span
                                                        className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money),rowData.ispickup ).toFixed(2)}</span>&nbsp;
                                                        元</span>
                                                        <span className="cancel"
                                                              onClick={() => this._delOrder(rowData.id) }

                                                        >删除订单</span>
                                                        <span className="pay"

                                                              onClick={() => {
                                                                  history.push({

                                                                      pathname: "/pay",
                                                                      state: {

                                                                          count: this._sum(Number(rowData.money)).toFixed(2)

                                                                      }
                                                                  });
                                                                  savePayOrder({
                                                                      id: rowData.id,
                                                                      ordernum: rowData.ordernum

                                                                  })

                                                              }

                                                              }

                                                        >去付款</span>

                                                    </div>

                                                    : ''
                                            }
                                            {
                                                rowData.state == 2 ?

                                                    <div className="btn">
                                                    <span
                                                        className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money),rowData.ispickup ).toFixed(2)}</span>&nbsp;
                                                        元</span>


                                                        <a href="tel:4009921819"
                                                           style={{
                                                               textDecoration: "none"

                                                           }}
                                                        > <span className="cancel">联系客服</span></a>
                                                        <span className="cancel"

                                                              onClick={() => {

                                                                  history.push(`/remark/${rowData.id}`)

                                                              }}

                                                        >退款</span>


                                                    </div>

                                                    : ''
                                            }
                                            {
                                                rowData.state == 3 ?


                                                    <div className="btn">
                                                    <span
                                                        className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money),rowData.ispickup ).toFixed(2)}</span>&nbsp;
                                                        元</span>

                                                        <span className="cancel">联系客服</span>
                                                        <span className="cancel"

                                                              onClick={() => this._comfirmOrder(rowData.id)}
                                                        >确认收货</span>

                                                    </div>

                                                    : ''
                                            }
                                            {
                                                rowData.state == 5 ?


                                                    <div className="btn">
                                                    <span
                                                        className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money),rowData.ispickup ).toFixed(2)}</span>&nbsp;
                                                        元</span>
                                                        <span className="cancel">联系客服</span>
                                                    </div>

                                                    : ''
                                            }


                                        </div>


                                    </div>
                                </div>


                            </div>

                        )
                    )
                )
            }
            else return (

                <div style={{width: "100%", textAlign: "center", marginTop: '2rem'}}>
                    暂无订单信息
                </div>
            )
        };
        return (

                <div
                    style={
                        {

                            paddingBottom: "1rem",
                            paddingTop: ".8rem"
                        }
                    }
                >
                    {row(list.orderList)}
                </div>

        );
    }


}