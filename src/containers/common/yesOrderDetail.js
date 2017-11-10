/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {AppLocalStorage} from '../../utils/cookie'

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
        let arr=match.params.id.split('T')
        fetchOrderDetai({id: arr[0]})
        fetchGetPostage()
    }

    _tolPrice = () => {
        const {postageData, yesOrderDetail} = this.props

        let sum = yesOrderDetail.money
        if (yesOrderDetail.ispickup === 0 && yesOrderDetail.money>Number(postageData.free)) {

            sum=yesOrderDetail.money
        }
        if (yesOrderDetail.ispickup === 0 && yesOrderDetail.money<Number(postageData.free)) {

            sum=yesOrderDetail.money+Number(postageData.value)
        }
        if (yesOrderDetail.ispickup === 1) {

            sum=yesOrderDetail.money
        }

        return Number(sum).toFixed(2)

    }

    _postHtml=()=>{

        const {postageData, yesOrderDetail} = this.props

        let html =''
        if (yesOrderDetail.ispickup === 0 && yesOrderDetail.money>Number(postageData.free)) {

            html='包邮'
        }
        if (yesOrderDetail.ispickup === 0 && yesOrderDetail.money<Number(postageData.free)) {

            html=postageData.value
        }
        if (yesOrderDetail.ispickup === 1) {

            html='商店自提'
        }

        return html


    }
    _delOrder = (id) => {

        const {history, fetchDelOrder} = this.props
        fetchDelOrder({
            id: id
        })
        setTimeout(()=>{
            history.goBack()
        },1000)

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

        const {savePayOrder,history}=this.props
        history.push({pathname: `/pay/${this._tolPrice()}`});
            savePayOrder({
            id: rowData.id,
            ordernum: rowData.ordernum
        })

    }

    render() {
        const {history, yesOrderDetail, postageData,match} = this.props
        let arr=match.params.id.split('T')
        return (
            <div className="yesOrderDetail-container"

                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f3f3f1",
                     overflow: "hidden",
                 }}
            >

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
                    postageData && yesOrderDetail && yesOrderDetail.id &&
                    <div>
                        <div className="ads-info">
                            <div>
                                <div className="name-msg">
                                    <span>{yesOrderDetail.address.realname}</span>
                                    <span className="mobile">{yesOrderDetail.address.mobile}</span>
                                </div>
                                <div className="ads">
                                    <span className="txt">
                                        {yesOrderDetail.address.province + yesOrderDetail.address.city + yesOrderDetail.address.county + yesOrderDetail.address.address}
                          </span>
                                </div>
                            </div>

                            <img src={require('static/image/color_line.png')} alt="" className="line"/>
                        </div>
                        <div className="goods-list">
                            <div className="head">
                                订单号：{yesOrderDetail.ordernum}
                                {yesOrderDetail.state === 1 && <span className="state">等待付款</span>}
                                {yesOrderDetail.state === 2 && <span className="state">已支付</span>}
                                {yesOrderDetail.state === 3 && <span className="state">已发货</span>}
                                {yesOrderDetail.state === 4 && <span className="state">确认收货</span>}
                                {yesOrderDetail.state === 5 && <span className="state">申请退款</span>}
                                {yesOrderDetail.state === 6 && <span className="state">退款成功</span>}
                                {yesOrderDetail.state === 7 && <span className="state">交易完成</span>}
                                {yesOrderDetail.state === 8 && <span className="state">退款完成</span>}
                            </div>
                            {yesOrderDetail.goodsitems.map((i, k) => (
                                <div key={k} className="goods-info" onClick={()=>
                                {
                                    if(yesOrderDetail.ordertype==='SECKILL'||yesOrderDetail.ordertype==='DISCOUNT'){
                                        history.push(`/activeDetail/${i.goods_id}${yesOrderDetail.ordertype}`)
                                    }else { history.push(`/goodsDetail/${i.goods_id}`)}

                                }


                                }>
                                    <div className="img">
                                        <img src={i.goods_smallpic} alt=""/>
                                    </div>
                                    <div className="msg">
                                        <p className="name">{i.goods_title}</p>
                                        <p className="bom">
                                            <span
                                                className="price">￥<span>
                                                {yesOrderDetail.ordertype==='SECKILL'||yesOrderDetail.ordertype==='DISCOUNT'&&yesOrderDetail.money}
                                                {Number(i.goods_price).toFixed(2)}
                                                </span></span>
                                            <span className="count">数量: <span>{i.goods_num}</span></span>

                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="tot-info">
                            <span className="count">邮费：{this._postHtml()}</span>
                            <span className="totPrice">总计：￥{this._tolPrice()}</span>
                        </div>
                        <div className="re-info">
                            <div className="title">留言</div>
                            <div className="re-msg">{yesOrderDetail.orderdesc}</div>
                        </div>
                        <div className="re-info" >
                            <div className="title">发票信息</div>
                            <div className="re-ms">
                                类型：
                                {yesOrderDetail.isinvoice===1&&yesOrderDetail.invoicetype===0&&'个人'}
                                {yesOrderDetail.isinvoice===1&&yesOrderDetail.invoicetype===1&&'公司'}
                                {yesOrderDetail.isinvoice===0&&'暂无'}

                            </div>
                            <div className="re-ms">
                                抬头：
                                {yesOrderDetail.isinvoice===0&&'暂无'}
                                {yesOrderDetail.isinvoice===1&&yesOrderDetail.invoicetitle}
                            </div>
                        </div>
                        <div style={{height:"1.5rem"}}/>
                        <div className="btn-info">

                            {
                                arr[1] === '0' &&
                                <div>
                                    <span className="del-btn" onClick={()=>this._delOrder(yesOrderDetail.id)}>取消订单</span>
                                    <span className="gotobuy-btn" onClick={()=> {this._toPay(yesOrderDetail)}}>去支付</span>
                                </div>
                            }
                            {
                                arr[1] === '1' &&
                                <div>
                                    <a href='tel:4001080305' style={{textDecoration: "none"}}><span className="del-btn">联系客服</span></a>
                                    <span className="gotobuy-btn" onClick={() => {history.push(`/remark/${yesOrderDetail.id}`)}}>退款</span>
                                </div>
                            }
                            {
                                arr[1] === '2' &&
                                <div>
                                    <a href='tel:4001080305' style={{textDecoration: "none"}}><span className="del-btn">联系客服</span></a>
                                    <span className="gotobuy-btn" onClick={() => this._comfirmOrder(yesOrderDetail.id)}>确认收货</span>
                                </div>
                            }
                            {
                                arr[1] === '3' &&
                                <div>
                                    <a href='tel:4001080305' style={{textDecoration: "none"}}><span className="del-btn">联系客服</span></a>

                                </div>
                            }

                            {
                                arr[1] === '4' &&
                                <div>
                                    <a href='tel:4001080305' style={{textDecoration: "none"}}><span className="del-btn">联系客服</span></a>
                                </div>
                            }



                        </div>
                    </div>
                }
            </div>
        )


    }


}
