/**
 * Created by bear on 2017/10/31.
 */
import React from 'react';
import {ListView, PullToRefresh, Icon,Modal} from 'antd-mobile';
import Timer from '../../components/Commons/timer'
const alert=Modal.alert
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
        const { fetchDelOrder} = this.props
        const alertInstance = alert('提示', '确定删除订单吗？', [
            {text: '取消', onPress: () => console.log('取消'), style: 'default'},
            {text: '确定', onPress: () => fetchDelOrder({id: id})},
        ]);
        setTimeout(() => {
            alertInstance.close();
        }, 5000)
    }
    _enddelOrder = (id) => {
        const { fetchDelOrder} = this.props
        fetchDelOrder({ id: id},'end')
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


    _sum = (rowData) => {
        const {postageData} = this.props
        let sum = rowData.money
        if (rowData.ispickup === 0 && rowData.money>Number(postageData.free)) {

            sum=rowData.money
        }
        if (rowData.ispickup === 0 && rowData.money<Number(postageData.free)) {

            sum=rowData.money+Number(postageData.value)
        }
        if (rowData.ispickup === 1) {

            sum=rowData.money
        }

        return Number(sum).toFixed(2)

    }

    _goDetail = (type, rowData) => {
        const {history} = this.props

        history.push({pathname: `/yesOrder/${rowData.id}T${type}`})
    }
    _toPay = (rowData) => {

        const {savePayOrder, history} = this.props
        history.push({pathname: `/pay/${this._sum(rowData)}`});
        savePayOrder({
            id: rowData.id,
            ordernum: rowData.ordernum
        })
    }
    _timeEnd=(id)=>{

        this._enddelOrder(id)

    }
    render() {
        const {list, history, hasMore, isFetching, refresh, tabIndex} = this.props
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    {rowData.goodsitems &&
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
                                        rowData.leftTime >=0&&tabIndex===0&&
                                        <div className="time-info">
                                            <img src={require('static/images/order/ot.jpg')} alt=""/>
                                            <span>
                                                剩余付款时间：
                                            </span>
                                            <div className="time">
                                                <Timer
                                                    // date={new Date(Date.parse(new Date())+10*1000).toISOString()}
                                                    date={new Date(Date.parse(new Date())+rowData.leftTime*1000).toISOString()}
                                                    days={{plural: 'Days ', singular: 'day '}}
                                                    hours=':'
                                                    mins=':'
                                                    segs=''
                                                    onEnd={()=>this._timeEnd(rowData.id)}
                                                />
                                            </div>
                                        </div>
                                    }
                                    <div className="bottom">
                                        {
                                            tabIndex === 0 &&
                                            <div className="btn">
                                                <span
                                                    className="countinfo">总额: ￥<span>{this._sum(rowData)}</span></span>
                                                <span className="cancel" onClick={() => this._delOrder(rowData.id) }>取消订单</span>
                                                <span className="pay" onClick={() => this._toPay(rowData)}>去付款</span>
                                            </div>
                                        }

                                        {
                                            tabIndex === 1 &&
                                            <div className="btn">
                                                <span
                                                    className="countinfo">总额: ￥<span>{this._sum(rowData)}</span></span>                                                <a href={`tel:${rowData.goodsitems.telnum}`}
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
                                                    className="countinfo">总额: ￥<span>{this._sum(rowData)}</span></span>                                                <a href={`tel:${rowData.goodsitems.telnum}`}
                                                   style={{textDecoration: "none"}}> <span
                                                    className="cancel">联系客服</span></a>
                                                <span className="cancel" onClick={() => this._comfirmOrder(rowData.id)}>确认收货</span>
                                            </div>


                                        }
                                        {
                                            tabIndex === 3 &&
                                            <div className="btn">
                                                <span
                                                    className="countinfo">总额: ￥<span>{this._sum(rowData)}</span></span>                                                <a href={`tel:${rowData.goodsitems.telnum}`}
                                                   style={{textDecoration: "none"}}> <span
                                                    className="cancel">联系客服</span></a>
                                            </div>


                                        }

                                        {
                                            tabIndex === 4 &&
                                            <div className="btn">
                                                <span
                                                    className="countinfo">总额: ￥<span>{this._sum(rowData)}</span></span>                                                <a href={`tel:${rowData.goodsitems.telnum}`}
                                                   style={{textDecoration: "none"}}> <span
                                                    className="cancel">联系客服</span></a>
                                            </div>

                                        }

                                    </div>
                                </div>
                            </div>
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