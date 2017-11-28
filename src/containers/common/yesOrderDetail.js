/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {AppLocalStorage} from '../../utils/cookie'
import {ymd,plusXing} from '../../utils/tools'
import Timer from '../../components/Commons/timer'
import {Radio, Modal, Icon, Flex, TextareaItem, Toast, InputItem, Checkbox, List} from 'antd-mobile'

import * as user from 'actions/user'
require('./styles/yesOrder.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)

export default class YesOrderDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const {match, fetchOrderDetai, fetchGetPostage} = this.props
        let arr = match.params.id.split('T')
        fetchOrderDetai({id: arr[0]})
    }

    _tolPrice = () => {
        const {yesOrderDetail} = this.props
        let sum = yesOrderDetail.totalMoney
        return Number(sum).toFixed(2)
    }

    _postHtml = () => {
        const {yesOrderDetail} = this.props

        let html = ''

        if (yesOrderDetail.ispickup === 0 && yesOrderDetail.yfmoney === 0 ) {
            html = '包邮'
        }

        if (yesOrderDetail.ispickup === 0 && yesOrderDetail.yfmoney > 0) {

            html ='￥'+ Number(yesOrderDetail.yfmoney).toFixed(2)
        }
        if (yesOrderDetail.ispickup === 1) {

            html = '商店自提'
        }
        return html
    }
    _delOrder = (id) => {
        const {history, fetchDelOrder} = this.props
        const alertInstance = alert('提示', '确定删除订单吗？', [
            {text: '取消', onPress: () => console.log('取消'), style: 'default'},
            {text: '确定', onPress: () => fetchDelOrder({id: id})},
        ]);
        setTimeout(() => {
            history.goBack()
        }, 1000)

    }

    _enddelOrder = (id) => {
        const {fetchDelOrder,history} = this.props
        fetchDelOrder({id: id}, 'end')
        setTimeout(() => {
            history.goBack()
        }, 1000)
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

    _toPay = (rowData) => {
        const {savePayOrder, history} = this.props
        history.push({pathname: `/pay/${this._tolPrice()}`});
        savePayOrder({
            id: rowData.id,
            ordernum: rowData.ordernum
        })

    }
    _getStateInfoIcon = (state) => {
        switch (state) {
            case 1:return `${require('static/images/user/yesOrder/daifukuan.png')}`;break;
            case 2:return `${require('static/images/user/yesOrder/daifahuo.png')}`;break;
            case 3:return `${require('static/images/user/yesOrder/daishouhou.png')}`;break;
            case 5:return `${require('static/images/user/yesOrder/tuikuan.png')}`;break;
            case 6:return `${require('static/images/user/yesOrder/yituikuan.png')}`;break;
            case 4:case 7:case 8:return `${require('static/images/user/yesOrder/end.png')}`;break;
            default:break
        }
    }
    _getTxt = (state) => {
        switch (state) {
            case 1:return '等待付款';break;
            case 2:return '已支付';break;
            case 3:return '待收货';break;
            case 4:return '已完成';break;
            case 5:return '申请退款中';break;
            case 6:return '退款成功';break;
            case 7:return '已完成';break;
            case 8:return '退款成功';break;
            default:break;
        }
    }
    _getHeadTxt = (state) => {
       // 退款金额：￥${this._tolPrice()}
        switch (state) {
            case 1:return `需支付金额：￥${this._tolPrice()}`;break;
            case 2:return `实际支付：￥${this._tolPrice()}`;break;
            case 3:return `实际支付：￥${this._tolPrice()}`;break;
            case 4:return `欢迎再次光临`;break;
            case 5:return `申请退款￥${this._tolPrice()}`;break;
            case 6:return `退款金额：￥${this._tolPrice()}`;break;
            case 7:return '欢迎再次光临';break;
            case 8:return `退款金额：￥${this._tolPrice()}`;break;
            default:break;
        }
    }

    render() {
        const {history, yesOrderDetail, match} = this.props

        console.log(yesOrderDetail)

        return (
            <div className="yesOrderDetail-container"
                 style={{minHeight: document.documentElement.clientHeight, background: "#f3f3f1", overflow: "hidden",}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">订单详情</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                {
                    yesOrderDetail && yesOrderDetail.id &&
                    <div>
                        <div className="state-info">
                            <div className="left-ic">
                                <img src={`${this._getStateInfoIcon(yesOrderDetail.state)}`} alt=""/>
                            </div>
                            <div className="right-tx">
                                <div className="time">
                                    {yesOrderDetail.state === 1 &&
                                    <div className="box">
                                        <img src={require('static/images/user/yesOrder/tuoyuan.png')} alt="" style={{width: ".3rem"}}/>剩余时间：
                                        <div className="timer">
                                            <Timer
                                                date={new Date(Date.parse(new Date()) + yesOrderDetail.leftTime * 1000).toISOString()}
                                                days={{plural: 'Days ', singular: 'day '}} hours=':' mins=':' segs=''
                                                onEnd={() => this._enddelOrder(yesOrderDetail.id)}
                                            />
                                        </div>
                                    </div>
                                    }

                                    {yesOrderDetail.state === 2 &&
                                    <div className="box" >
                                        <img src={require('static/images/user/yesOrder/re.png')} alt=""/>支付时间：{ymd(yesOrderDetail.paytime,'/',':')}
                                    </div>
                                    }

                                </div>
                                <div className="msg">
                                    <p>{this._getTxt(yesOrderDetail.state)}</p>
                                    <p>{this._getHeadTxt(yesOrderDetail.state)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="ads-info">
                            <div>
                                <div className="name-msg">
                                    <span>{yesOrderDetail.address.realname}</span>
                                    <span className="mobile">{yesOrderDetail.address.mobile}</span>
                                    <span className="isPick">
                                        {yesOrderDetail.ispickup===1?'自提':'邮寄'}
                                    </span>
                                </div>
                                <div className="ads">
                                    <span className="txt">
                                        {yesOrderDetail.address.province + yesOrderDetail.address.city + yesOrderDetail.address.county + yesOrderDetail.address.address}
                          </span>
                                </div>
                            </div>

                            <img src={require('static/image/color_line.png')} alt="" className="line"/>
                        </div>

                        {
                            (yesOrderDetail.state===3|| yesOrderDetail.state===4)&&yesOrderDetail.ispickup===0&&

                            <div className="express-info">
                                <p className="id">快递单号：<span>{yesOrderDetail.numberoflogistics}</span></p>
                                <p className="name">快递跟踪：<span>{yesOrderDetail.logisticscompany}</span></p>
                            </div>

                        }


                        <div className="goods-list">
                            <div className="head">
                               商品列表 {yesOrderDetail.isown===2&&<span>海外直邮</span>}
                            </div>
                            {yesOrderDetail.goodsitems.map((i, k) => (
                                <div key={k} className="goods-info" onClick={() => {
                                    if (yesOrderDetail.ordertype === 'SECKILL' || yesOrderDetail.ordertype === 'DISCOUNT') {history.push(`/activeDetail/${i.goods_id}${yesOrderDetail.ordertype}`)} else {history.push(`/goodsDetail/${i.goods_id}`)}
                                }}>
                                    <div className="img"><img src={i.goods_smallpic} alt=""/></div>
                                    <div className="msg"><p className="name">{i.goods_title}</p>
                                        <p className="bom">
                                            <span className="price">￥<span>{yesOrderDetail.ordertype === 'SECKILL' || yesOrderDetail.ordertype === 'DISCOUNT' && yesOrderDetail.money}{Number(i.goods_price).toFixed(2)}</span></span>
                                            <span className="count">数量: <span>{i.goods_num}</span></span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{height: ".2rem"}}/>
                        {
                            yesOrderDetail.isown===2&& <div className="realName-info">

                                <div className="name">
                                    <span>收货人实名信息：</span>
                                    <span>{yesOrderDetail.address.realname}</span>
                                </div>

                                <div className="card">
                                   { plusXing(yesOrderDetail.address.idcard,4,4)}
                                </div>
                            </div>
                        }


                        <div style={{height: ".2rem"}}/>
                        <List.Item extra={yesOrderDetail.ordernum}>订单号:</List.Item>
                        <List.Item extra={ymd(yesOrderDetail.addtime,'-',':')}>下单时间:</List.Item>
                        <List.Item extra={yesOrderDetail.isinvoice===0?'否':'是'}>是否开发票:</List.Item>
                        {
                            yesOrderDetail.isinvoice===1&&yesOrderDetail.invoicetype===2&&
                        <div className="is-fapiao">
                            <List.Item extra={'企业'}>发票:</List.Item>
                            <div className="cmp-info"><p>
                                {yesOrderDetail.invoicetitle}</p>
                                <p>{yesOrderDetail.dutynum}</p>
                            </div>
                        </div>
                        }

                        {yesOrderDetail.isinvoice===1&&yesOrderDetail.invoicetype===1&& <List.Item extra={`个人|${yesOrderDetail.invoicetitle}`}>发票:</List.Item>}


                        <div style={{height: ".2rem"}}/>
                        <div className="mey-info">
                            <List.Item extra={<div className="money">￥{Number(yesOrderDetail.money).toFixed(2)}</div>}>商品金额:</List.Item>
                            <List.Item extra={this._postHtml()}>运费:</List.Item>
                            <div className="re-info">
                                <div className="title">留言：</div>
                                <div className="re-msg">{yesOrderDetail.orderdesc}</div>
                            </div>
                        </div>
                        <div style={{height: "1.5rem"}}/>
                        <div className="btn-info">

                            {
                                yesOrderDetail.state === 1 &&
                                <div>
                                    <span className="del-btn"
                                          onClick={() => this._delOrder(yesOrderDetail.id)}>取消订单</span>
                                    <span className="gotobuy-btn" onClick={() => {
                                        this._toPay(yesOrderDetail)
                                    }}>去支付</span>
                                </div>
                            }
                            {
                                yesOrderDetail.state === 2 &&
                                <div>
                                    <a href='tel:4001080305' style={{textDecoration: "none"}}><span className="del-btn">联系客服</span></a>
                                    <span className="yeBtn" onClick={() => {
                                        history.push(`/remark/${yesOrderDetail.id}`)
                                    }}>申请退款</span>
                                </div>
                            }
                            {
                                yesOrderDetail.state === 3 &&
                                <div>
                                    <a href='tel:4001080305' style={{textDecoration: "none"}}><span className="del-btn">联系客服</span></a>
                                    <span className="gotobuy-btn" onClick={() => this._comfirmOrder(yesOrderDetail.id)}>确认收货</span>
                                </div>
                            }
                            {
                                (yesOrderDetail.state === 4 || yesOrderDetail.state === 5 || yesOrderDetail.state === 5 || yesOrderDetail.state === 7 || yesOrderDetail.state === 8) &&
                                <div>
                                    <a href='tel:4001080305' style={{textDecoration: "none"}}><span className="gotobuy-btn">联系客服</span></a>

                                </div>
                            }


                        </div>
                    </div>
                }
            </div>
        )


    }


}
