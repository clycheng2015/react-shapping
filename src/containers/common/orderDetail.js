/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {AppLocalStorage} from '../../utils/cookie'
import {plusXing, idcard} from '../../utils/tools'
import {Icon, Flex, TextareaItem, List, Modal, Toast} from 'antd-mobile'
import {createForm} from 'rc-form';
import * as user from 'actions/user'
import * as saveParams from 'actions/saveParams'
import * as invoice from 'actions/invoice'
import * as postType from 'actions/postType'
require('./styles/orderDetail.less')
const prompt = Modal.prompt;
@connect(
    state => {
        return {...state.user, ...state.saveParams, ...state.postType, ...state.invoice}
    },
    dispatch => bindActionCreators({...user, ...saveParams, ...invoice, ...postType}, dispatch)
)
class OrderDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const {fetchGetAds, savePath, location, getUserInfo, chooseAddressData, savePayParams} = this.props

        if (location.state && location.state.data) {
            savePath(location.state.data)
        }
        if (location && location.state && location.state.state && location.state.state) {
            savePayParams(location.state.state)
        }

        if (chooseAddressData && chooseAddressData.id) {
        } else {
            fetchGetAds()
        }
        //获取用户信息
        let user = AppLocalStorage.Cache.get('user')
        if (user && user.userInfo) {
            getUserInfo({
                uid: user.userInfo.id,
                version: "1.1.0"
            })
        }

    }

    componentWillReceiveProps(np, ns) {

    }

    /***
     * 支付
     * @private
     */
    _gotoPay = () => {
        const {fetchCarCreateOrder, orderDetail, history, fetchGsCreateOrder, payState, fetchActiveOrder, savePostData, saveInvoice, userInfo, orderRemark, clearInvoice, clearPostType} = this.props
        const {pathList} = orderDetail

        const {remark} = orderDetail

        let defaultAds = this._getAds().id || '';


        let orderPrice = this._orderPice()


         if(savePostData.type===0&&defaultAds===''){
          Toast.info('请先填写收货地址！',1)
            return false
         }

         if(savePostData.type===1){

             defaultAds=savePostData.adsId
         }




        let data = {
            address_id: defaultAds,
            orderdesc: remark,
            isinvoice: saveInvoice.type,
            invoicetype: saveInvoice.voiType,
            invoicetitle: saveInvoice.voiType === 1 ? (saveInvoice.msg.username || userInfo.realname) : saveInvoice.msg.cpname,
            ispickup: savePostData.type,
            jifen: "",
            usermoney: '',
            dutynum: saveInvoice.msg.number,
        }
        if (payState === 'det' && pathList[0].type) {
            data = {
                ...data,
                ordertype: pathList[0].type,
                goods_id: pathList[0].goods_id,
                goods_num: pathList[0].goods_num,
                goods_att1: pathList[0].goods_att1,
                goods_att2: pathList[0].goods_att2,
            }
            fetchActiveOrder(data, history, orderPrice)

        }

        if (payState === 'det' && !pathList[0].type) {
            data = {
                ...data,
                ordertype: 'GOODS',
                goods_id: pathList[0].goods_id,
                goods_num: pathList[0].goods_num,
                goods_att1: pathList[0].goods_att1,
                goods_att2: pathList[0].goods_att2,
            }
            fetchGsCreateOrder(data, history, orderPrice)

        }
        if (payState === 'car') {
            let cartId = []
            pathList.forEach((i) => {
                cartId.push(i.id)
            })
            data = {
                ...data,
                ordertype: 'GOODS',
                cartids: cartId.join(','),

            }
            fetchCarCreateOrder(data, history, orderPrice)
        }

        //清空留言和发票信息
        orderRemark('')
        clearInvoice()
        clearPostType()

    }

    /***
     * 计算商品总价
     * @returns {string}
     * @private
     */
    _priceTol = () => {
        const {orderDetail} = this.props
        const {pathList} = orderDetail
        let goodsList = pathList
        let sumArr = [];
        let sum = 0
        goodsList.forEach(i => {
            sumArr.push(Number(i.goods_num) * Number(i.goods_price))
        })
        for (let i = 0; i < sumArr.length; i++) {
            sum += sumArr[i]
        }
        return Number(sum).toFixed(2)
    }

    /***
     * 计算邮费
     * @private
     */
    _postType = () => {
        const {postageData, savePostData} = this.props

        let postType = ''

        let sum = this._priceTol()


        if (savePostData.type === 0 && sum >= Number(postageData.free) && postageData.free !== '-1') {

            postType = '包邮'

        }
        if ((savePostData.type === 0 && sum < Number(postageData.free)) || postageData.free === '-1') {

            postType = postageData.value

        }

        if (savePostData.type === 1) {
            postType = '上门自提'

        }
        return postType
    }

    /***
     * 计算满减
     * @private
     */
    _mjprice = () => {
        const { orderDetail } =this.props
        const {pathList} = orderDetail
        let allPrice = this._priceTol()

        let mjprice = 0


        if( pathList[0].fullActivityDto && pathList[0].fullActivityDto.datalist && pathList[0].fullActivityDto.datalist.length > 0){
            let arr = pathList[0].fullActivityDto.datalist
            if (Number(arr[0].man) <= Number(allPrice)) {
                mjprice = arr[0].jian
            }
            for (let i = 1; i < arr.length; i++) {
                if (Number(arr[i-1].man) > Number(allPrice) && Number(arr[i].man) <= Number(allPrice)) {
                    mjprice = arr[i].jian
                }
            }
        }

        return mjprice

    }

    /***
     * 计算订单总价
     * @private
     */

    _orderPice = () => {

        let post = this._postType();
        let sum = Number(this._priceTol());
        if (Number(post) > 0) {
            sum += Number(post)
        }

        sum -= this._mjprice()

        return Number(sum).toFixed(2)
    }

    /***
     *友好提示
     * @returns {XML}
     */


    _postMsg = () => {
        const {postageData} = this.props

        let post = this._postType()

        if (Number(post) > 0 && postageData.free !== '-1') {
            post = '全场满' + postageData.free + '包邮'
        }
        if (postageData.free === '-1') {
            post = '此地区不支持包邮'
        }
        return post
    }

    /***
     * 获取默认地址
     * @returns {{}}
     * @private
     */
    _getAds = () => {
        const {address, chooseAddressData} = this.props
        const {data} = address
        let defaultAds = {}
        if (chooseAddressData && chooseAddressData.id) {
            defaultAds = chooseAddressData
        } else {
            if (data && data.length > 0) {
                data.forEach(i => {
                    if (i.isdefault === 1) {
                        defaultAds = i
                    }
                })
            }
        }
        return defaultAds
    }

    /***
     * 海外直邮修改实名信息
     * @param id
     * @private
     */

    _upDateAds = (id, isHas) => {
        //
        // console.log(isHas)


        if (isHas !== '' && isHas !== null) {
            return false
        }


        const {fetchAddAds, fetchGetAds, chooseAddressData, chooseAddress} = this.props
        prompt(
            '实名认证',
            '海关要求购买跨境商品需提供实名信息！',
            (name, card) => {
                // console.log(name,card)

                if (name === '') {
                    Toast.info('请填写真实姓名！', 1)
                    return
                }
                if (card === '') {

                    Toast.info('请填写身份证号码！', 1)
                    return
                }

                if (!idcard(card)) {
                    Toast.info('您填写的身份证号码格式不正确！', 1)
                    return

                }
                fetchAddAds({id: id, realname: name, idcard: card});

                setTimeout(() => {
                    if (chooseAddressData && chooseAddressData.id) {
                        chooseAddress({...chooseAddressData, realname: name, idcard: card})
                    }
                    fetchGetAds()
                }, 200)
            },
            'login-password',
            null,
            ['真实姓名', '身份证号码'],
        )
        // document.getElementsByTagName('input')[1].type = 'text'

    }

    render() {
        const {history, orderDetail, payState, userInfo, orderRemark, postageData, savePostData, saveInvoice, chooseAddressData} = this.props


        const {getFieldProps} = this.props.form;
        const {pathList} = orderDetail
        const {remark} = orderDetail


        return (
            <div className="orderDetail-container"
                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f7f6f6",
                     overflow: "hidden",
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
                {
                    postageData && postageData.free && pathList && pathList.length > 0 &&
                    <div>
                        <div className="ads-info">
                            {
                                this._getAds() && this._getAds().id ?
                                    <List.Item className="yes-ads" arrow="horizontal"
                                               onClick={ () => history.push('/address/1')}>
                                        <p className="name"> {this._getAds().realname}
                                            <span>{this._getAds().mobile}</span></p>
                                        <div className="ads-dl">
                                            {
                                                this._getAds().province + this._getAds().city + this._getAds().county + this._getAds().address
                                            }
                                        </div>
                                    </List.Item>
                                    :
                                    <List.Item
                                        className="no-ads"
                                        thumb={require('../../static/images/order/order_icon.png')}
                                        arrow="horizontal"
                                        onClick={() => {
                                            history.push({pathname: `/address/1`})
                                        }}
                                    >请添加收货地址
                                    </List.Item>
                            }
                            <img src={require('static/image/color_line.png')} alt="" className="line"/>
                        </div>
                        <div className="goods-list">
                            <div className="head">商品列表 {pathList[0].isown === 2 && <span>海外直邮</span> }</div>
                            {
                                pathList.map((i, k) => (
                                    <div key={k} className="goods-info">
                                        <div className="img"><img src={i.goods_smallpic} alt=""/></div>
                                        <div className="msg"><p className="name">{i.goods_title}</p>
                                            <p className="con-info">
                                                <span className="price"><span>￥{i.goods_price}</span></span><span
                                                className="count">数量: <span>{i.goods_num}</span></span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {
                            pathList[0].isown !== 2 &&
                            <div className="post-type-info">
                                <List.Item
                                    arrow="horizontal"
                                    extra={
                                        <div>
                                            {savePostData.type === 0 &&
                                            <div><span>（可选上门自提）</span> <span className="type-name">邮寄快递</span></div>}
                                            {savePostData.type === 1 && <div><span className="type-name">上门自提</span><p
                                                className="type-ads">{savePostData.ads}</p></div>}
                                        </div>
                                    }
                                    onClick={() => {
                                        history.push('/postType')
                                    }}
                                >配送方式：
                                </List.Item>
                            </div>
                        }

                        {
                            this._getAds() && this._getAds().id && pathList[0].isown === 2 &&
                            <div className="post-type-info">
                                <List.Item
                                    arrow="horizontal"
                                    extra={
                                        <div>
                                            {  (this._getAds().idcard === null || this._getAds().idcard === '') &&

                                            <div><span className="type-name">添加</span></div>}

                                            { (this._getAds().idcard !== null && this._getAds().idcard !== '') &&
                                            <div><span className="type-name">{this._getAds().realname}</span><p
                                                className="type-ads">{plusXing(this._getAds().idcard, 4, 4)}</p></div>}
                                        </div>
                                    }
                                    onClick={() => this._upDateAds(this._getAds().id, this._getAds().idcard)}
                                >收货人实名信息：
                                </List.Item>
                            </div>
                        }


                        <div className="more-exp-info">
                            <List.Item
                                arrow="horizontal"
                                extra={
                                    <div>
                                        {saveInvoice.type === 0 && <span className="type-name">不开发票</span>}

                                        {saveInvoice.type === 1 && saveInvoice.voiType === 1 &&
                                        <span
                                            className="type-name">个人|{ saveInvoice.msg.username || userInfo.realname }</span>}

                                        {saveInvoice.type === 1 && saveInvoice.voiType === 2 &&
                                        <div><span className="type-name">企业</span>
                                            <p className="type-ads">{saveInvoice.msg.cpname}</p>
                                            <p className="type-ads">{saveInvoice.msg.number}</p>

                                        </div>}
                                    </div>
                                }
                                onClick={() => {
                                    history.push('/invoice')
                                }}
                            >发票：
                            </List.Item>

                            <div style={{position: "relative"}}>
                                <TextareaItem
                                    {...getFieldProps('delAds')}
                                    clear
                                    title="留言："
                                    // autoHeight
                                    placeholder="本次购物留言（选填，限50字）"
                                    ref={el => this.autoFocusInst = el}
                                    value={remark}
                                    maxLength={50}
                                    onChange={(v) => orderRemark(v)}
                                />
                            </div>

                        </div>
                        <div className="count-exp-info" style={{marginBottom: "1.5rem"}}>
                            <List.Item extra={<div><span className="type-name">￥{this._priceTol()}</span>
                            </div>}>商品总额：</List.Item>
                            <List.Item extra={<div><span className="type-name">{  this._postType().indexOf('上门自提')===0?this._postType():`￥${this._postType()}`}</span>
                            </div>}>运费：</List.Item>
                            <List.Item extra={<div><span className="type-name">{  this._mjprice() === 0 ? '无优惠': `-￥${this._mjprice()}` }</span>
                            </div>}>优惠金额：</List.Item>
                        </div>
                        <div className="buy-btn"><span className="tot-exp">￥{this._orderPice()} <span>（{this._postMsg()}）</span></span>
                            <span className="btn-exp" onClick={() => this._gotoPay() }>去支付
                        </span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default createForm()(OrderDetail)