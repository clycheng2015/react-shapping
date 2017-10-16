/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'

import {Radio, Modal, Icon, Flex, TextareaItem, Toast, InputItem, Checkbox, List} from 'antd-mobile'

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
import * as user from 'actions/user'
import * as saveParams from 'actions/saveParams'

require('./styles/orderDetail.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user, ...state.saveParams}
    },
    dispatch => bindActionCreators({...user, ...saveParams}, dispatch)
)

export default class OrderDetail extends React.Component {

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
            sum: 0


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
        const {fetchGetAds, savePath, location, getUserInfo, fetchGetPostage, savePayParams} = this.props

        if (location && location.state && location.state.state && location.state.state) {

            savePayParams(location.state.state)

        }

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
        //获取邮费
        fetchGetPostage()


    }

    componentWillReceiveProps(np, ns) {

        const {postageData} = np

        if (postageData) {


            const {address, history, list, orderDetail, location, userInfo, postageData} = this.props


            const {data} = address
            const {pathList} = orderDetail
            // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            // console.log(data)
            // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++")
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

                } else {

                    postageMoney = postageData.value

                    sum += Number(postageData.value)
                }
            }


            this.setState({

                sum: sum
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

        const {fetchCarCreateOrder, history, location, fetchGsCreateOrder, payState, fetchActiveOrder} = this.props

        if (payState == 'det') {

            console.log("其他订单")
            let uid = ''
            if (list[0].type) {
                let data = {
                    uid: list[0].user_id,
                    address_id: adsId,
                    orderdesc: this.state.desValue,
                    isinvoice: this.state.fapiao ? 1 : 0,
                    invoicetype: this.state.fapiao ? this.state.invoicetype : '',
                    invoicetitle: this.state.invoicetitle,
                    ordertype: list[0].type,
                    jifen: "",
                    // usermoney: this.state.expValue,
                    goods_id: list[0].goods_id,
                    goods_num: list[0].goods_num,
                    goods_att1: list[0].goods_att1,
                    goods_att2: list[0].goods_att2,
                    ispickup: this.state.isTake == 'b' ? 0 : 1
                }

                let lastCount = count - this.state.expValue

                fetchActiveOrder(data, history, count)


            } else {
                let data = {
                    uid: list[0].user_id,
                    address_id: adsId,
                    orderdesc: this.state.desValue,
                    isinvoice: this.state.fapiao ? 1 : 0,
                    invoicetype: this.state.fapiao ? this.state.invoicetype : '',
                    invoicetitle: this.state.invoicetitle,
                    ordertype: "GOODS",
                    jifen: "",
                    // usermoney: this.state.expValue,
                    goods_id: list[0].goods_id,
                    goods_num: list[0].goods_num,
                    goods_att1: list[0].goods_att1,
                    goods_att2: list[0].goods_att2,
                    ispickup: this.state.isTake == 'b' ? 0 : 1
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
                    isinvoice: this.state.fapiao ? 1 : 0,
                    invoicetype: this.state.fapiao ? this.state.invoicetype : '',
                    invoicetitle: this.state.invoicetitle,
                    ordertype: "GOODS",
                    jifen: "",
                    // usermoney: this.state.expValue,
                    cartids: cartId.join(','),
                    ispickup: this.state.isTake == 'b' ? 0 : 1
                }

                let lastCount = count - this.state.expValue

                fetchCarCreateOrder(data, history, count)
            }

        }


    }

    render() {
        const {address, history, list, orderDetail, location, userInfo, postageData} = this.props


        const {data} = address
        const {pathList} = orderDetail
        // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        // console.log(data)
        // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++")
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

        let postageMoney = ''

        if (postageData && postageData.id) {

            if (sum > Number(postageData.free)) {

                postageMoney = '包邮'

            } else {

                postageMoney = postageData.value


                sum += Number(postageData.value)
            }
        }


        if (goodsList && goodsList.length > 0) {

            return (
                <div className="orderDetail-container"

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
                            <Flex.Item className="item-head center">确认订单</Flex.Item>
                            <Flex.Item className="item-head right"><span></span></Flex.Item>
                        </Flex>
                    </div>
                    <div className="ads-info"

                         onClick={ () => history.push('/address')}

                    >
                        {
                            defaultAds && defaultAds.id ? <div>
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
                            </div> :
                                <span className="no-ads"

                                >
                                    + 请添加收货地址
                                </span>

                        }


                        <Icon type="right" className="right-icon"/>

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

                            {/*<span style={{float: "left"}}>邮费：{postageMoney}</span>*/}

                            <span className="count">共 {goodsList.length} 商品</span>

                            <span className="totPrice">总计：￥{this.state.sum.toFixed(2)}</span>

                        </div>


                    </div>
                    <div className="take-goods-type">
                        <div className="title">收货方式</div>
                        <Flex>
                            <Flex.Item className="list">
                                <Radio className="my-radio" checked={'a' === this.state.isTake} onChange={() => {
                                    this.setState({isTake: "a"});
                                    this._istake(postageMoney)
                                }}> 商店自提 <span className="exp-msg">成都市武侯区航空路6号1栋1号附3号美纶购体验店</span></Radio>
                            </Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item className="list" style={{border: 'none'}}>
                                <Radio className="my-radio" checked={'b' === this.state.isTake} onChange={() => {
                                    this.setState({isTake: "b"});
                                    this._istake(postageMoney)
                                }} defaultChecked={true}> 快递送货 <span className="post">邮费：{postageMoney}</span></Radio>
                            </Flex.Item>
                        </Flex>

                    </div>

                    <div className="re-info">
                        <TextareaItem

                            rows={2}
                            value={this.state.desValue}
                            onChange={(v) => this.setState({desValue: v})}
                            placeholder="留言备注"
                        />
                    </div>

                    <div style={{display:"none"}}>

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
                                        <input type="radio" name="radiobutton" value="radiobutton" defaultChecked={true}
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

                    <div className="exp">
                        继续支付代表您已阅读，并同意美伦购的 <span>《商城购买协议》</span>

                    </div>

                    <div className="buy-btn"
                         onClick={() => this._gotoPay(defaultAds.id, this.state.sum.toFixed(2), goodsList) }
                    >
                        去支付
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
