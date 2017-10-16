/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'

import {Radio, Modal, Icon, Flex, TextareaItem, Toast,InputItem, Checkbox, List} from 'antd-mobile'

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
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
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
            goodsList: [],
            expValue: 0,
            fapiao: false,
            fapiaoValue: 0,
            desValue:"",
            invoicetype:1,
            invoicetitle:""


        }
        this.userInfo = localItem('userInfo')
        this.fapiaoData = [

            {value: 0, label: '个人'},
            {value: 1, label: '公司'},

        ]
    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    componentDidMount() {
        const {fetchGetAds,uid, savePath, location, getUserInfo,fetchOrderDetai } = this.props




        fetchOrderDetai({

            uid:uid,
            id:location.state.orderId

        })





        console.log(this.props)
        let userInfo = this.userInfo
        if ((typeof userInfo) == 'string') {
            fetchGetAds({

                uid: JSON.parse(userInfo).id
            })

            getUserInfo({uid: JSON.parse(userInfo).id})
        }
        let goodsList = []

        if (location.state && location.state.data) {

            goodsList = location.state.data

            savePath(goodsList)
        }

    }

    _isFapiao = (e) => {


        this.setState({

            fapiao: e.target.checked || false
        })

    }

    _gotoPay = (adsId,count, list) => {

        const {fetchCarCreateOrder, history,location,fetchGsCreateOrder} = this.props

        // console.log(count, list)

        if(location&&location.state&&location.state.state&&location.state.state=='det'){

            console.log("我是gs==>order")
            console.log(list)
            let uid = ''

            if(adsId==''){


                Toast.info("请先填写收货信息！",1)
            }else {

                let data = {
                    uid:list[0]. user_id,
                    address_id: adsId,
                    orderdesc: this.state.desValue,
                    isinvoice: this.state.fapiao?1:0,
                    invoicetype:this.state.fapiao?this.state.invoicetype:'',
                    invoicetitle: this.state.invoicetitle,
                    ordertype: "GOODS",
                    jifen: "",
                    usermoney: this.state.expValue,
                    goods_id: list[0].goods_id,
                    goods_num:list[0].goods_num,
                    goods_att1:list[0].goods_att1,
                    goods_att2:list[0].goods_att2,
                }

                let lastCount=count-this.state.expValue

                fetchGsCreateOrder(data,history,count)
            }





        }else {
            console.log("我是car==>order")

            let uid = ''
            let cartId=[]
            list.forEach((i) => {
                uid = i.user_id
                cartId.push(i.id)

            })

            if(adsId==''){


                Toast.info("请先填写收货信息！",1)
            }else {

                let data = {
                    uid: uid,
                    address_id: adsId,
                    orderdesc: this.state.desValue,
                    isinvoice: this.state.fapiao?1:0,
                    invoicetype:this.state.fapiao?this.state.invoicetype:'',
                    invoicetitle: this.state.invoicetitle,
                    ordertype: "GOODS",
                    jifen: "",
                    usermoney: this.state.expValue,
                    cartids: cartId.join(','),
                }

                let lastCount=count-this.state.expValue

                fetchCarCreateOrder(data,history,count)
            }

        }


    }

    _delOrder = (id) => {

        const {uid, fetchDelOrder,history} = this.props
        fetchDelOrder({
            uid: uid,
            id: id
        },history,"del")
    }


    render() {
        const {address, history, list, orderDetail, location, savePayOrder,yesOrderDetail} = this.props
        if (yesOrderDetail && yesOrderDetail.id) {


            let goodsList = yesOrderDetail.goodsitems

            let defaultAds =yesOrderDetail.address

            let sumArr = [];
            let sum = 0


            goodsList.forEach(i => {

                sumArr.push(Number(i.goods_num) * Number(i.goods_price))

            })


            for (let i = 0; i < sumArr.length; i++) {
                sum += sumArr[i]
            }
            let type=''
            let title=''

            if(yesOrderDetail.isinvoice==0){
                type="暂无"
                title='暂无'
            }else {

                if(yesOrderDetail.invoicetype==1){

                    type="个人"

                    title=yesOrderDetail.invoicetitle

                }else {
                    type="公司"

                    title=yesOrderDetail.invoicetitle

                }



            }


            // console.log(yesOrderDetail)

            return (
                <div className="yesOrderDetail-container"

                     style={{
                         minHeight: document.documentElement.clientHeight,
                         background: "#f3f3f1",
                         overflow: "hidden",
                         paddingBottom: "2rem"
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
                    <div className="ads-info"


                    >

                        <div>
                                <div className="name-msg">
                            <span>
                                  收货人: {defaultAds.realname}
                            </span>
                                    <span className="mobile">
                                    {defaultAds.mobile}
                            </span>

                                </div>
                                <div className="ads">
                            <span className="icon">
                                  <img src={require('static/image/ic_position.png')} alt=""/>
                            </span>


                                    <span className="txt">

                            {
                                defaultAds.provincename + defaultAds.cityname + defaultAds.countyname + defaultAds.address
                            }
                            </span>

                                </div>
                            </div>

                        <img src={require('static/image/color_line.png')} alt="" className="line"/>

                    </div>

                    <div className="goods-list">
                        <div className="head">商品列表</div>

                        {
                            goodsList.map((i, k) => (

                                <div key={k} className="goods-info">

                                    <div className="img">
                                        <img src={i.goods_smallpic} alt=""/>
                                    </div>

                                    <div className="msg">
                                        <p className="name">
                                            {i.goods_title}
                                        </p>
                                        <p>
                                            <span className="count">
                                                数量: <span>{i.goods_num}</span>
                                            </span>
                                            <span className="price">
                                                折扣单价: <span>{i.goods_price}</span>
                                            </span>
                                        </p>

                                    </div>
                                </div>


                            ))


                        }

                        <div className="tot-info">

                            <span className="count">共 {goodsList.length} 商品</span>

                            <span className="totPrice">总计：￥{ this.props.match.params.count}</span>

                        </div>


                    </div>

                    <div className="re-info">
                        <TextareaItem
                            disabled
                            rows={2}
                            value={yesOrderDetail.orderdesc}
                            onChange={(v)=>this.setState({desValue:v})}
                            placeholder="留言备注"
                        />
                    </div>

                    <List  renderHeader={() => '发票信息'} style={{display:"none"}}>
                        <InputItem
                            disabled
                            clear
                            value={type}
                            // placeholder="auto focus"
                            ref={el => this.autoFocusInst = el}
                        >类型</InputItem>
                        <InputItem
                            disabled
                            clear
                            value={title}
                            // placeholder="click the button below to focus"
                            ref={el => this.customFocusInst = el}
                        >抬头</InputItem>
                    </List>



                    {/*<div className="buy-btn"*/}


                         {/*onClick={() => this._gotoPay(defaultAds.id ,sum.toFixed(2), goodsList) }*/}


                    {/*>*/}
                        {/*去支付*/}
                    {/*</div>*/}

                    <div className="btn-info">
                        <span className="del-btn"

                        onClick={()=>this._delOrder(yesOrderDetail.id)}
                        >取消订单</span>
                        <span className="gotobuy-btn"

                        onClick={()=> {
                            history.push({

                                pathname: '/pay',
                                state: {count: this.props.match.params.count}

                            });

                            savePayOrder({
                                id: yesOrderDetail.id,
                                ordernum: yesOrderDetail.ordernum

                            })
                        }
                        }

                        >去支付</span>
                    </div>

                </div>
            )

        } else {
            return (
                <div className="orderDetail-container"

                     style={{
                         minHeight: document.documentElement.clientHeight,
                         background: "#f3f3f1",
                         overflow: "hidden"
                     }}
                >

                    <div className="nav-tab">
                        <Flex justify="center" align="center">
                            <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                                history.goBack()
                            }}/></Flex.Item>
                            <Flex.Item className="item-head center">确认订单</Flex.Item>
                            <Flex.Item className="item-head right"><span></span></Flex.Item>
                        </Flex>
                    </div>
                    <div style={{paddingTop: '1rem', width: "100%", textAlign: "center"}}>
                        <Icon type="loading"/>

                    </div>
                </div>
            )
        }


    }


}
