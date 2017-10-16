/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Button, Flex, Icon, List, ActionSheet, InputItem, Toast, Modal} from 'antd-mobile'

const alert = Modal.alert;
/*actions*/
import * as goodsDetail from 'actions/goodsDetail'
import ReactDrawer from '../../components/Commons/lib/react-drawer';
import {localItem} from '../../utils/cookie'
require('../../components/Commons/lib/react-drawer.less')
require('./styles/goodsDetail.less')
const customIcon = (src, name) => <img src={src} alt={name} className={name}/>;
const iconList = [
    // { icon: customIcon('https://zos.alipayobjects.com/rmsportal/WmEzpOsElbbvgmrexFSH.png', 'img'), title: '发送给朋友' },
    // { icon: customIcon('https://zos.alipayobjects.com/rmsportal/HssPJKvrjEByyVWJIFwl.png', 'img'), title: '新浪微博' },
    {icon: customIcon('https://zos.alipayobjects.com/rmsportal/HCGowLrLFMFglxRAKjWd.png', 'img'), title: '生活圈'},
    {icon: customIcon('https://zos.alipayobjects.com/rmsportal/LeZNKxCTkLHDWsjFfqqn.png', 'img'), title: '微信好友'},
    // { icon: customIcon('https://zos.alipayobjects.com/rmsportal/YHHFcpGxlvQIqCAvZdbw.png', 'img'), title: 'QQ' },
    // { icon: customIcon('https://gw.alipayobjects.com/zos/rmsportal/VgOeEwrQxpfxxoxDhhRu.svg', 'icon'), title: '刷新' },
    // { icon: customIcon('https://gw.alipayobjects.com/zos/rmsportal/QcRdiavUOhCmQjvQHVqt.svg', 'icon'), title: '链接' },
    // { icon: customIcon('https://gw.alipayobjects.com/zos/rmsportal/cVeaIFCKBHUjLROxfysg.svg', 'icon'), title: '投诉' },
];

// fix touch to scroll background page on iOS
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

@connect(
    state => {

        return {...state.goodsDetail}
    },
    dispatch => bindActionCreators({...goodsDetail}, dispatch)
)
export default class GoodsDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            clicked: 'none',
            clicked1: 'none',
            clicked2: 'none',
            docked: false,
            open: false,
            position: 'bottom',
            noOverlay: false,
            inputValue: 1,
            addOrBuyState: "",
            clear: false

        };
        this.userInfo = localItem('userInfo')


    }

    onChange = (v) => {
        this.setState({

            inputValue: v
        })

    }

    add = () => {


        let count = this.state.inputValue
        count++;
        this.setState({

            inputValue: count
        })

    }
    lose = () => {

        let count = this.state.inputValue
        count--

        if (count < 1) {


            Toast.info("商品最小数量为1", 1)
            return false
        }
        this.setState({

            inputValue: count
        })

    }
    setPosition = (e) => {
        this.setState({position: e.target.value});
    }
    setNoOverlay = (e) => {
        this.setState({noOverlay: e.target.checked});
    }
    toggleDrawer = (type) => {

        let userInfo = this.userInfo
        const {history} = this.props
        // console.log(userInfo)
        if ((typeof userInfo) != 'string') {

            alert('请先登录', '立即前往？', [

                {text: '取消', onPress: () => console.log('cancel')},
                {text: '确定', onPress: () => {


                    let url=window.location.href

                    url= url.match(/#(\S*)/)[1];

                    url=url.replace('/','')

                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://www.worldwideapp.chinazjtc.com/app/user/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

                    // history.push("/auth")
                    }
                },
            ])


        } else {


            this.setState({
                open: !this.state.open,
                inputValue: 1,
                addOrBuyState: type

            });

        }


    }
    closeDrawer = () => {
        this.setState({open: false});
    }
    onDrawerClose = () => {
        this.setState({open: false});
    }

    showShareActionSheet = () => {
        const icons = [...iconList];
        icons.length = 4;
        ActionSheet.showShareActionSheetWithOptions({
                options: icons,
                // title: 'title',
                message: '分享到',
                className: 'my-action-sheet',
            },
            (buttonIndex) => {
                this.setState({clicked1: buttonIndex > -1 ? icons[buttonIndex].title : 'cancel'});
                // also support Promise
                return new Promise((resolve) => {
                    // Toast.info('closed after 1000ms');
                    setTimeout(resolve, 200);
                });
            });
    }

    componentWillMount() {
        window.scrollTo(0, 0)
    }
    componentWillUnmount() {
        const {removeDetail} = this.props
        removeDetail()
        window.onScroll = null

    }

    _submite_gs = (id) => {
        const {fetchAddCar, history} = this.props

        let userInfo = this.userInfo

        console.log(userInfo)

        if (this.state.addOrBuyState == 'add') {
            let userInfo = this.userInfo

            // console.log(userInfo)
            if ((typeof userInfo) == 'string') {


                this.setState({open: false});
                fetchAddCar({
                    goods_id: id,
                    goods_num: this.state.inputValue,
                    goods_att1: "",
                    goods_att2: "",
                    id: '',
                    uid: JSON.parse(userInfo).id
                })
            } else {


            }

        }

        if (this.state.addOrBuyState == 'buy') {


            let userInfo = this.userInfo

            // console.log(userInfo)
            if ((typeof userInfo) == 'string') {

                const {data, history} = this.props

                let price = ''

                if (JSON.parse(userInfo).isvip == 0) {
                    price = data.zkprice
                } else {
                    price = data.vipprice
                }
                let newData = [{
                    att1: "",
                    att2: "",
                    goods_att1: "",
                    goods_att2: "",
                    goods_desc: '',
                    goods_id: data.id,
                    goods_num: this.state.inputValue,
                    goods_price: price,
                    goods_smallpic: data.smallpic,
                    goods_title: data.gtitle,
                    id: data.id,
                    shareurl: data.shareurl,
                    user_id: JSON.parse(userInfo).id,

                }]

                history.push({
                    pathname: "/orderDetail",

                    state: {

                        data: newData,
                        state: "det"
                    }
                })

            } else {

                alert('请先登录', '立即前往？', [

                    {text: '取消', onPress: () => console.log('cancel')},
                    {text: '确定', onPress: () =>
                    {

                        let url=window.location.href

                        url= url.match(/#(\S*)/)[1];

                        url=url.replace('/','')

                        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://www.worldwideapp.chinazjtc.com/app/user/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

                    }

                        // history.push("/auth")




                    },
                ])

            }


        }


    }

    componentDidMount() {


        const {match, getGoodsDetail, location} = this.props

        // console.log(location)


        const {params} = match
        getGoodsDetail({
            pagesize: 1,
            pagenum: 10,
            id: parseInt(params.id)
        })
    }

    render() {
        const {data, history} = this.props

        const cntInfo = () => {
            if (data && data.id) {
                const cnt = {

                    __html: data.gcontent
                }
                return (
                    <div className="cnt-info">
                        <div className="img-info">
                            <img src={data.bigpic} alt=""/>
                        </div>
                        <div className="msg-info">
                            <div className="title">
                                <p>{data.gtitle}</p>
                            </div>

                            <Flex >

                                <Flex.Item className="sall">
                                    <p>{data.zkprice}</p>
                                    <p className="vip">会员价：￥{data.vipprice}
                                        <img style={{width: '.5rem'}} src={require('static/image/vipcion.png')} alt=""/>
                                    </p>
                                </Flex.Item>

                                <Flex.Item className="usl">
                                    <span style={{textDecoration: 'line-through'}}>市场价：￥{data.price}</span>
                                </Flex.Item>


                            </Flex>
                        </div>

                        <div className="url" style={{marginTop: "1rem"}}>

                            <div className=".markdown-body" dangerouslySetInnerHTML={cnt}/>

                            <div ref="cnt"></div>

                        </div>

                        <div className="like">

                            <div className="head">
                                <span className="line"></span>
                                <span className="title">猜你喜欢</span>
                                <span className="line"></span>
                            </div>

                            <div className="flex-container">
                                <Flex wrap="wrap">
                                    {
                                        data.likes.map((i, key) => (

                                                <div key={key} className="per"

                                                     onClick={() => {
                                                         history.push({
                                                             pathname: `/goodsDetail/${i.id}`,
                                                             // state:location.state.title
                                                         });

                                                         window.scrollTo(0, 0)
                                                     }
                                                     }
                                                >

                                                    <div className="img-info">

                                                        <img src={i.bigpic} alt=""/>
                                                    </div>
                                                    <div className="pretxt">

                                                        <p className="mall-title">{i.gtitle}</p>
                                                        <p style={{color: "#e85c34", paddingTop: ".1rem"}}>￥{i.price}  </p>

                                                    </div>

                                                </div>

                                            )
                                        )
                                    }
                                </Flex>
                            </div>


                        </div>
                        <ReactDrawer
                            open={this.state.open}
                            position={this.state.position}
                            onClose={this.onDrawerClose}
                            noOverlay={this.state.noOverlay}>

                            <div className="drawer-title">
                                <span className="title">请选择商品属性</span>
                                <span className='close-btn' onClick={this.closeDrawer}>x</span>
                            </div>

                            <div className="drawer-body">
                                <div className="drawer-img">

                                    <img src={data.bigpic} alt=""/>

                                </div>

                                <div className="drawer-gs-title">
                                    <p className="one">{data.gtitle}</p>
                                    <div className="two">

                                        数量： <span className="lose box" onClick={this.lose}>-</span>

                                        <List >
                                            <InputItem
                                                type="number"
                                                error={this.state.hasError}

                                                onChange={this.onChange}
                                                value={this.state.inputValue}
                                            />
                                        </List>
                                        <span className="add box" onClick={this.add}>＋</span>
                                    </div>

                                </div>
                            </div>

                            <div className="drawer-btn" onClick={() => this._submite_gs(data.id)}>
                                确定
                            </div>
                        </ReactDrawer>

                    </div>
                )
            } else {

                console.log("还未请求完毕")
                return (

                    <div style={{width: '100%', textAlign: "center", marginTop: '.2rem'}}>
                        <Icon type="loading"/>
                    </div>
                )
            }


        }


        return (
            <div className="goods-detail-container">
                <div className="tab-nav">
                    <Icon type="left" size="lg" onClick={() => {
                        history.goBack()
                    }}/>

                    {/*<img src={require('static/image/share.png')} alt=""*/}
                    {/*style={{width: ".4rem", float: 'right', marginRight: ".2rem"}}*/}
                    {/*onClick={this.showShareActionSheet}/>*/}
                </div>

                <div className="detail-info">


                    {cntInfo()}
                </div>

                <div className="bottom">

                    <Flex >

                        <Flex.Item className="other">

                                    <span>


                                        <a href="tel:4001080305"
                                           style={{
                                               textDecoration: "none"

                                           }}
                                        >
                                            <img src={require('static/image/ic_call_service_02.png')} alt=""/>
                                        <p>客服咨询</p>

                                        </a>
                                    </span>
                            <span onClick={() => history.push(`/burCar/${'dltocar'}`)}>
                                <img src={require('static/image/ic_to_car_02.png')} alt=""/>
                                <p>购物车 </p>
                            </span>
                        </Flex.Item>
                        <Flex.Item className="add-car-btn" onClick={() => this.toggleDrawer('add')}>
                            加入购物车
                        </Flex.Item>
                        <Flex.Item className="buy-btn" onClick={() => this.toggleDrawer('buy')}>
                            立即购买
                        </Flex.Item>
                    </Flex>

                </div>

            </div>

        )
    }
}
