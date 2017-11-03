/**
 * Created by bear on 2017/10/31.
 */
import React, {ReactDom}from 'react';
import {ListView, PullToRefresh, Icon} from 'antd-mobile';
import Timer from '../../components/Commons/timer'
class OrderList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: false,
            isLoading: false,
        };
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


    _sum = (p) => {
        const {list, history, savePayOrder, postageData} = this.props
        let sum = 0
        if (postageData && postageData.id) {
            if (Number(p) > Number(postageData.free)) {
                return sum = p
            } else {
                // sum = Number(p) + Number(postageData.value)
                sum = Number(p)
                return sum
            }
        }
    }

    _goDetail = (type, rowData) => {
        const {history} = this.props

        history.push({pathname: `/yesOrder/${rowData.id}T${type}`})
    }
    _toPay = (rowData) => {

        const {savePayOrder, history} = this.props
        history.push(
            {
                pathname: "/pay",
                state: {count: this._sum(Number(rowData.money)).toFixed(2)}
            });
        savePayOrder({
            id: rowData.id,
            ordernum: rowData.ordernum
        })

    }

    render() {
        const {list, history, hasMore, isFetching, refresh, tabIndex} = this.props
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    {rowData.goodsitems && rowData.goodsitems.map((i, key) => (
                        <div key={key}>
                            <div className="top-box">
                                <div className="box">
                                    <div className="odd-info">
                                        <span className="odd">订单号：{rowData.ordernum}</span>
                                        <span className="icon">
                                             <span>
                                                {rowData.ordertype === "GOODS" && '商品' }{rowData.ordertype === "SECKILL" && '秒杀' }{rowData.ordertype === "DISCOUNT" && '特价' }
                                             </span>
                                        </span>
                                        <span className="post">{rowData.ispickup === 1 ? '（商店自提）' : '（邮寄）'}</span>
                                        {rowData.state === 1 && <span className="state">等待付款</span>}
                                        {rowData.state === 2 && <span className="state">已支付</span>}
                                        {rowData.state === 3 && <span className="state">已发货</span>}
                                        {rowData.state === 4 && <span className="state">确认收货</span>}
                                        {rowData.state === 5 && <span className="state">申请退款</span>}
                                        {rowData.state === 6 && <span className="state">退款成功</span>}
                                        {rowData.state === 7 && <span className="state">交易完成</span>}
                                        {rowData.state === 8 && <span className="state">退款完成</span>}
                                    </div>

                                    <div onClick={() => this._goDetail(tabIndex, rowData) }>
                                        {rowData.goodsitems.map((i, index) => (
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

                                    {
                                        rowData.leftTime ===0&&
                                        <div className="time-info">
                                            <img src={require('static/images/order/ot.jpg')} alt=""/>
                                            <span>
                                                剩余付款时间：
                                            </span>
                                            <div className="time">

                                                <Timer
                                                    date={new Date(parseInt(rowData.leftTime)).toISOString()}
                                                    // date="2017-11-10T00:00:00+00:00"
                                                    days={{plural: 'Days ', singular: 'day '}}
                                                    hours=':'
                                                    mins=':'
                                                    segs=''
                                                />
                                            </div>
                                        </div>
                                    }


                                    <div className="bottom">
                                        {
                                            tabIndex === 0 &&
                                            <div className="btn">
                                                <span
                                                    className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money), rowData.ispickup).toFixed(2)}</span></span>
                                                <span className="cancel" onClick={() => this._delOrder(rowData.id) }>取消订单</span>
                                                <span className="pay" onClick={() => this._toPay(rowData)}>去付款</span>
                                            </div>
                                        }

                                        {
                                            tabIndex === 1 &&
                                            <div className="btn">
                                                <span
                                                    className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money), rowData.ispickup).toFixed(2)}</span></span>
                                                <a href={`tel:${rowData.goodsitems.telnum}`}
                                                   style={{textDecoration: "none"}}> <span
                                                    className="cancel">联系客服</span></a>
                                                <span className="cancel" onClick={() => {
                                                    history.push(`/remark/${rowData.id}`)
                                                }}>退款</span>
                                            </div>
                                        }

                                        {
                                            tabIndex === 2 &&
                                            <div className="btn">
                                                <span
                                                    className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money), rowData.ispickup).toFixed(2)}</span></span>
                                                <a href={`tel:${rowData.goodsitems.telnum}`}
                                                   style={{textDecoration: "none"}}> <span
                                                    className="cancel">联系客服</span></a>
                                                <span className="cancel" onClick={() => this._comfirmOrder(rowData.id)}>确认收货</span>
                                            </div>


                                        }
                                        {
                                            tabIndex === 3 &&
                                            <div className="btn">
                                                <span
                                                    className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money), rowData.ispickup).toFixed(2)}</span></span>
                                                <a href={`tel:${rowData.goodsitems.telnum}`}
                                                   style={{textDecoration: "none"}}> <span
                                                    className="cancel">联系客服</span></a>
                                            </div>


                                        }

                                        {
                                            tabIndex === 4 &&
                                            <div className="btn">
                                                <span
                                                    className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money), rowData.ispickup).toFixed(2)}</span></span>
                                                <a href={`tel:${rowData.goodsitems.telnum}`}
                                                   style={{textDecoration: "none"}}> <span
                                                    className="cancel">联系客服</span></a>
                                            </div>

                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    ))
                    }
                </div>
            );
        };
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRows(list.orderList)}
                renderFooter={() => (<div style={{textAlign: 'center', paddingBottom: '.3rem'}}>
                    { hasMore && isFetching && <span ><Icon type="loading"/></span>}

                    { hasMore && !isFetching && <span><Icon type="loading"/></span>}

                    { !hasMore && !isFetching && <span>已经到底啦</span>}
                </div>)}
                renderRow={row}
                style={{
                    height: document.documentElement.clientHeight,
                }}
                className="am-list"
                initialListSize={list.orderList.length}
                pageSize={20}
                // useBodyScroll
                pullToRefresh={<PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={refresh}
                />}
                onScroll={() => {
                    // this.props.getScroll(window.scrollY)
                }}
                scrollRenderAheadDistance={2000}
                scrollEventThrottle={30}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={1000}
            />
        );
    }
}

export default OrderList;