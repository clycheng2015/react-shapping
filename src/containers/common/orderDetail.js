/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'

import {Radio, Modal, Icon, Flex, TextareaItem, Toast, InputItem, Checkbox, List} from 'antd-mobile'
import {createForm} from 'rc-form';
const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
import * as user from 'actions/user'
import * as saveParams from 'actions/saveParams'

require('./styles/orderDetail.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user, ...state.saveParams, ...state.postType, ...state.invoice}
    },
    dispatch => bindActionCreators({...user, ...saveParams}, dispatch)
)
class OrderDetail extends React.Component {

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
            desValue: "",
            invoicetype: 1,
            invoicetitle: "",
            isTake: "b",
            sum: 0,
            postageMoney:''


        }
        this.userInfo = localItem('userInfo')
    }

    componentDidMount() {
        const {fetchGetAds, savePath, location, getUserInfo, fetchGetPostage, savePayParams} = this.props

        if (location && location.state && location.state.state && location.state.state) {

            savePayParams(location.state.state)

        }
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
        //获取邮费
        fetchGetPostage()


    }

    componentWillReceiveProps(np, ns) {

        const {postageData} = np

        if (postageData) {


            const {address, history, list, orderDetail, location, userInfo, postageData,savePostData} = this.props


            const {data} = address
            const {pathList} = orderDetail

            let goodsList = []

            if (location.state && location.state.data) {

                goodsList = location.state.data

            } else {
                if (pathList && pathList.length > 0) {

                    goodsList = pathList
                }
            }
            // console.log(goodsList)

            let defaultAds = {}

            let sumArr = [];
            let sum = 0

            // console.log(goodsList)

            goodsList.forEach(i => {

                sumArr.push(Number(i.goods_num) * Number(i.goods_price))

            })


            for (let i = 0; i < sumArr.length; i++) {
                sum += sumArr[i]
            }


            if (data && data.length > 0) {

                data.forEach(i => {


                    if (i.isdefault === 1) {


                        defaultAds = i
                    }
                })

            }

            let postageMoney = ''

            if (postageData && postageData.id) {

                if (sum > Number(postageData.free)) {

                    postageMoney = '包邮'
                    if(savePostData.type===1){

                        postageMoney='上门自提'
                    }



                } else {




                    postageMoney = postageData.value
                    if(savePostData.type===0){

                        sum += Number(postageData.value)
                    }

                    else {

                        postageMoney='上门自提'

                    }


                }
            }


            this.setState({
                sum: sum,

                postageMoney:postageMoney
            })

        }
    }

    _isFapiao = (e) => {


        this.setState({

            fapiao: e.target.checked || false
        })

    }

    _istake = (post) => {


        if (post == '包邮') {

            post = 0

        }


        if (this.state.isTake == 'b') {


            this.setState({

                sum: Number(this.state.sum) - Number(post)
            })
        } else {


            this.setState({
                sum: Number(this.state.sum) + Number(post)
            })

        }

    }

    _gotoPay = (adsId, count, list) => {

        const {fetchCarCreateOrder, history, location, fetchGsCreateOrder, payState, fetchActiveOrder, savePostData, saveInvoice} = this.props

        if (payState == 'det') {
            let uid = ''
            if (list[0].type) {
                let data = {
                    uid: list[0].user_id,
                    address_id: adsId,
                    orderdesc: this.state.desValue,
                    isinvoice: saveInvoice.type,
                    invoicetype: saveInvoice.voiType,
                    invoicetitle: saveInvoice.msg.cpname,
                    ordertype: list[0].type,
                    jifen: "",
                    // usermoney: this.state.expValue,
                    goods_id: list[0].goods_id,
                    goods_num: list[0].goods_num,
                    goods_att1: list[0].goods_att1,
                    goods_att2: list[0].goods_att2,
                    ispickup: savePostData.type
                }

                let lastCount = count - this.state.expValue

                fetchActiveOrder(data, history, count)


            } else {
                let data = {
                    uid: list[0].user_id,
                    address_id: adsId,
                    orderdesc: this.state.desValue,
                    isinvoice: saveInvoice.type,
                    invoicetype: saveInvoice.voiType,
                    invoicetitle: saveInvoice.msg.cpname,
                    ordertype: "GOODS",
                    jifen: "",
                    // usermoney: this.state.expValue,
                    goods_id: list[0].goods_id,
                    goods_num: list[0].goods_num,
                    goods_att1: list[0].goods_att1,
                    goods_att2: list[0].goods_att2,
                    ispickup: savePostData.type
                }

                let lastCount = count - this.state.expValue

                fetchGsCreateOrder(data, history, count)
            }

        } else {

            console.log("我是car==>order")

            let uid = ''
            let cartId = []
            list.forEach((i) => {
                uid = i.user_id
                cartId.push(i.id)

            })

            if (adsId == '') {


                Toast.info("请先填写收货信息！", 1)

            }
            else {

                let data = {
                    uid: uid,
                    address_id: adsId,
                    orderdesc: this.state.desValue,
                    isinvoice: saveInvoice.type,
                    invoicetype: saveInvoice.voiType,
                    invoicetitle: saveInvoice.msg.cpname,
                    ordertype: "GOODS",
                    jifen: "",
                    // usermoney: this.state.expValue,
                    cartids: cartId.join(','),
                    ispickup: savePostData.type
                }

                let lastCount = count - this.state.expValue

                fetchCarCreateOrder(data, history, count)
            }

        }


    }

    render() {
        const {address, history, list, orderDetail, location, userInfo, postageData, savePostData, saveInvoice} = this.props

        const {getFieldProps} = this.props.form;
        const {data} = address
        const {pathList} = orderDetail

        let goodsList = []

        if (location.state && location.state.data) {

            goodsList = location.state.data

        } else {
            if (pathList && pathList.length > 0) {

                goodsList = pathList
            }
        }
        // console.log(goodsList)

        let defaultAds = {}

        let sumArr = [];
        let sum = 0

        // console.log(goodsList)

        goodsList.forEach(i => {

            sumArr.push(Number(i.goods_num) * Number(i.goods_price))

        })


        for (let i = 0; i < sumArr.length; i++) {
            sum += sumArr[i]
        }


        if (data && data.length > 0) {

            data.forEach(i => {


                if (i.isdefault === 1) {


                    defaultAds = i
                }
            })

        }
        //判断邮费

        let postageMoney = this.state.postageMoney


        if (goodsList && goodsList.length > 0) {
            return (
                <div className="orderDetail-container"
                     style={{
                         minHeight: document.documentElement.clientHeight,
                         background: "#f7f6f6",
                         overflow: "hidden",
                         // paddingBottom: "1rem"
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
                    <div className="ads-info"
                         onClick={ () => history.push('/address')}
                    >
                        {
                            defaultAds && defaultAds.id ?
                                <List.Item
                                    className="yes-ads"
                                    arrow="horizontal"
                                    onClick={ () => history.push('/address')}
                                >
                                    <p className="name"> {defaultAds.realname} <span>{defaultAds.mobile}</span></p>
                                    <div className="ads-dl">
                                        {
                                            defaultAds.provincename + defaultAds.cityname + defaultAds.countyname + defaultAds.address
                                        }
                                    </div>
                                </List.Item>
                                :
                                <List.Item

                                    className="no-ads"
                                    thumb={require('../../static/images/order/order_icon.png')}
                                    arrow="horizontal"

                                    onClick={() => {

                                        history.push('/address')
                                    }}

                                >请添加收货地址

                                </List.Item>

                        }
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
                                        <p className="con-info">
                                              <span className="price">
                                                  <span>￥{i.goods_price}</span>
                                            </span>
                                            <span className="count">
                                                数量: <span>{i.goods_num}</span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }

                        {/*<div className="tot-info">*/}

                        {/*/!*<span style={{float: "left"}}>邮费：{postageMoney}</span>*!/*/}

                        {/*<span className="count">共 {goodsList.length} 商品</span>*/}

                        {/*<span className="totPrice">总计：￥{this.state.sum.toFixed(2)}</span>*/}

                        {/*</div>*/}


                    </div>

                    <div className="post-type-info">
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <div>
                                    {
                                        savePostData.type === 0 &&
                                        <div><span>（可选上门自提）</span> <span className="type-name">邮寄快递</span></div>
                                    }
                                    {
                                        savePostData.type === 1 && <div><span className="type-name">上门自提</span><p
                                            className="type-ads">{savePostData.ads}</p></div>
                                    }
                                </div>
                            }
                            onClick={() => {

                                history.push('/postType')
                            }}

                        >配送方式：

                        </List.Item>
                    </div>
                    {/*<div className="take-goods-type">*/}
                    {/*<div className="title">收货方式</div>*/}
                    {/*<Flex>*/}
                    {/*<Flex.Item className="list">*/}
                    {/*<Radio className="my-radio" checked={'a' === this.state.isTake} onChange={() => {*/}
                    {/*this.setState({isTake: "a"});*/}
                    {/*this._istake(postageMoney)*/}
                    {/*}}> 商店自提 <span className="exp-msg">成都市武侯区航空路6号1栋1号附3号美纶购体验店</span></Radio>*/}
                    {/*</Flex.Item>*/}
                    {/*</Flex>*/}
                    {/*<Flex>*/}
                    {/*<Flex.Item className="list" style={{border: 'none'}}>*/}
                    {/*<Radio className="my-radio" checked={'b' === this.state.isTake} onChange={() => {*/}
                    {/*this.setState({isTake: "b"});*/}
                    {/*this._istake(postageMoney)*/}
                    {/*}} defaultChecked={true}> 快递送货 <span className="post">邮费：{postageMoney}</span></Radio>*/}
                    {/*</Flex.Item>*/}
                    {/*</Flex>*/}

                    {/*</div>*/}


                    <div className="more-exp-info">
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <div>
                                    {
                                        saveInvoice.type === 0 && <span className="type-name">不开发票</span>
                                    }
                                    {
                                        saveInvoice.type === 1 && saveInvoice.voiType == 0 &&
                                        <span className="type-name">个人|{userInfo.realname}</span>
                                    }
                                    {
                                        saveInvoice.type === 1 && saveInvoice.voiType == 1 &&
                                        <div>
                                            <span className="type-name">企业</span>
                                            <p className="type-ads">{saveInvoice.msg.cpname}</p>
                                        </div>
                                    }
                                </div>
                            }
                            onClick={() => {

                                history.push('/invoice')
                            }}
                        >发票：
                        </List.Item>
                        <TextareaItem
                            {...getFieldProps('delAds')}
                            clear
                            title="留言："
                            // autoHeight
                            placeholder="本次购物留言（选填，限50字）"
                            ref={el => this.autoFocusInst = el}
                            value={this.state.desValue}
                            onChange={(v) => this.setState({desValue: v})}
                        />
                    </div>

                    <div style={{display: "none"}}>

                        <List className="fapiao">
                            <CheckboxItem key={1} defaultChecked={false} onChange={(e) => {
                                this._isFapiao(e)
                            }}>
                                开具发票
                            </CheckboxItem>
                        </List>

                        {
                            this.state.fapiao ?
                                <div className="fapiao-info">
                                    <div className="top">
                                        <span className="title">
                                            类型
                                        </span>
                                        <label className="per">
                                            <input type="radio" name="radiobutton" value="radiobutton"
                                                   defaultChecked={true}
                                                   onChange={() => this.setState({
                                                       invoicetype: 1
                                                   })}/> 个人
                                        </label>
                                        <label className="comp">
                                            <input type="radio" name="radiobutton" value="radiobutton"
                                                   onChange={() => this.setState({
                                                       invoicetype: 2
                                                   })}
                                            /> 公司
                                        </label>


                                    </div>
                                    <div className="bottom">
                                        {/*<span className="title">*/}
                                        {/*抬头*/}
                                        {/*</span>*/}
                                        <InputItem
                                            placeholder="输入抬头信息"
                                            style={{fontSize: 12}} onChange={(v) => this.setState({
                                            invoicetitle: v
                                        })}
                                        >抬头</InputItem>


                                    </div>

                                </div> : ''

                        }
                    </div>


                    <div className="count-exp-info" style={{marginBottom: "1.5rem"}}>
                        <List.Item
                            extra={<div><span className="type-name">￥{Number(postageMoney) > 0 ? (this.state.sum-Number(postageMoney)).toFixed(2):this.state.sum.toFixed(2)}</span>
                            </div>}
                        >商品总额：

                        </List.Item>
                        <List.Item
                            extra={<div><span
                                className="type-name">{  Number(postageMoney) > 0 ? `￥${postageMoney}` : 0}</span>
                            </div>}
                        >运费

                        </List.Item>
                    </div>
                    <div className="buy-btn">
                        <span className="tot-exp">
                            ￥{this.state.sum.toFixed(2)} <span>（{postageMoney}）</span>
                        </span>
                        <span className="btn-exp"
                              onClick={() => this._gotoPay(defaultAds.id, this.state.sum.toFixed(2), goodsList) }
                        >
                            去支付
                        </span>
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
export default createForm()(OrderDetail)