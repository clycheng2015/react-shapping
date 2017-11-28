import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Route, Router,Redirect} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// import createHistory from 'history/createBrowserHistory'
import createHistory from 'history/createHashHistory'
const history = createHistory()

/*
 全局导入less
 */
import './app.less'
import './utils/iconfont/iconfont.css'

import * as global from 'actions/global'
import asyncComponent from './AsyncComponent'

import Home from './containers/Home/index'


const Auth = asyncComponent(() => import( /* webpackChunkName: "auth" */'./containers/auth/index'))
const Reg = asyncComponent(() => import(  /* webpackChunkName: "reg" */'./containers/auth/reg'))
const Login = asyncComponent(() => import( /* webpackChunkName: "login" */'./containers/auth/login'))
const UpdatePwd = asyncComponent(() => import( /* webpackChunkName: "updatePwd" */'./containers/auth/updatePwd'))


const User = asyncComponent(() => import( /* webpackChunkName: "user" */'./containers/user/index'))
const Item = asyncComponent(() => import( /* webpackChunkName: "item" */'./containers/item/index'))
const BuyCar = asyncComponent(() => import( /* webpackChunkName: "buyCar" */'./containers/buyCar/index'))


const GoodsDetail = asyncComponent(() => import(/* webpackChunkName: "goodsDetail" */ './containers/common/goodsDetail'))
const ItemList = asyncComponent(() => import( /* webpackChunkName: "itemList" */'./containers/common/itemList'))
const MoreList = asyncComponent(() => import( /* webpackChunkName: "moreList" */'./containers/common/moreList'))
const Search = asyncComponent(() => import( /* webpackChunkName: "search" */'./containers/common/search'))
const SearchList = asyncComponent(() => import( /* webpackChunkName: "searchList" */'./containers/common/searchList'))
const QRCodeList = asyncComponent(() => import( /* webpackChunkName: "QRCodeList" */'./containers/common/QRCodeList'))


//user
const Setting = asyncComponent(() => import(/* webpackChunkName: "setting" */ './containers/user/setting'))
const About = asyncComponent(() => import(/* webpackChunkName: "about" */ './containers/user/about'))
const UserCenter = asyncComponent(() => import(/* webpackChunkName: "userCenter" */ './containers/user/userCenter'))
const MyOrder = asyncComponent(() => import(/* webpackChunkName: "myOrder" */ './containers/user/myOrder'))
const Bill = asyncComponent(() => import( /* webpackChunkName: "bill" */'./containers/user/bill'))
const Address = asyncComponent(() => import(/* webpackChunkName: "address" */ './containers/user/address'))
const NewAds = asyncComponent(() => import(/* webpackChunkName: "newAds" */ './containers/user/newAds'))
const UpdatePhone = asyncComponent(() => import( /* webpackChunkName: "phone" */'./containers/user/phone'))
const OrderDetail = asyncComponent(() => import(/* webpackChunkName: "orderDetail" */ './containers/common/orderDetail'))
const Pay = asyncComponent(() => import( /* webpackChunkName: "pay" */'./containers/common/pay'))

const YesOrderDetail = asyncComponent(() => import(/* webpackChunkName: "yesOrderDetail" */ './containers/common/yesOrderDetail'))
const TopUp = asyncComponent(() => import(/* webpackChunkName: "topUp" */ './containers/user/topUp'))
const WithDraw = asyncComponent(() => import(/* webpackChunkName: "withdraw" */ './containers/user/withdraw'))
const Remark = asyncComponent(() => import( /* webpackChunkName: "remark" */'./containers/user/remark'))
const Wallet = asyncComponent(() => import(/* webpackChunkName: "wallet" */ './containers/user/wallet'))
const Jinfu = asyncComponent(() => import( /* webpackChunkName: "jinfu" */'./containers/user/jinfu'))
const JinTopUp = asyncComponent(() => import(/* webpackChunkName: "jinTopUp" */ './containers/user/jinTopUp'))
const JinDraw = asyncComponent(() => import( /* webpackChunkName: "jinDraw" */'./containers/user/jinDraw'))
const Help = asyncComponent(() => import( /* webpackChunkName: "help" */'./containers/user/help'))
const WebTxt = asyncComponent(() => import(/* webpackChunkName: "webTxt" */ './containers/user/webTxt'))


const PostType = asyncComponent(() => import( /* webpackChunkName: "postType" */'./containers/common/postType'))
const Invoice = asyncComponent(() => import(/* webpackChunkName: "invoice" */ './containers/common/invoice'))

const Protocol = asyncComponent(() => import( /* webpackChunkName: "protocol" */'./containers/common/protocol'))


//活动中心

const Active = asyncComponent(() => import( /* webpackChunkName: "active" */'./containers/active/index'))
const ActiveDetail = asyncComponent(() => import(/* webpackChunkName: "activeDetail" */ './containers/common/activeDetail'))


const NewPer = asyncComponent(() => import( /* webpackChunkName: "newPer" */'./containers/active/newPer'));
const Special = asyncComponent(() => import( /* webpackChunkName: "special" */'./containers/active/special'));
const NewDay = asyncComponent(() => import( /* webpackChunkName: "newDay" */'./containers/active/newDay'));
const Ranking = asyncComponent(() => import( /* webpackChunkName: "ranking" */'./containers/active/ranking'));
const Seckill = asyncComponent(() => import( /* webpackChunkName: "seckill" */'./containers/active/seckill'));
const Imported = asyncComponent(() => import( /* webpackChunkName: "imported" */'./containers/active/imported'));
const ImportedClass = asyncComponent(() => import(/* webpackChunkName: "importedClass" */ './containers/active/importedClass'));
const VipActive = asyncComponent(() => import(/* webpackChunkName: "vipActive" */ './containers/active/vipActive'));
const HotGoods = asyncComponent(() => import(/* webpackChunkName: "hotGoods" */ './containers/active/hotGoods'));
const JoinUs = asyncComponent(() => import(/* webpackChunkName: "joinUs" */ './containers/active/joinUs'));
const DoubleActive = asyncComponent(() => import( /* webpackChunkName: "doubleActive" */'./containers/active/doubleActive'));

const PayFail = asyncComponent(() => import(/* webpackChunkName: "pay_fail" */ './containers/common/pay_fail'));
const PaySuccess = asyncComponent(() => import( /* webpackChunkName: "pay_success" */'./containers/common/pay_success'));




let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'

@connect(
    state => {
        return {...state.global}
    },
    dispatch => bindActionCreators(global, dispatch)
)
export default class App extends React.Component {

    componentDidMount() {

        const {currentAnimate} = this.props

        if (isPro) {
            let href = window.location.href
            if (href.indexOf('?from=singlemessage&isappinstalled=0') > 0) {

                href = href.replace('?from=singlemessage&isappinstalled=0', '')
                window.location.href = href
                return
            }

            if (href.indexOf('?') > 0) {
                let url = href.match(/\?(\S*)#/)[0]
                href = href.replace(url, '#')
            }
            this.props.fetchWxConfig({
                imgUrl: 'http://app.meilungo.com/upload/defaultuser.png',
                title: '美纶购商城',
                description: "美纶购，无限购！",
                link: href
            });


        }
        // window.addEventListener('popstate', function (e) {
        //     if (e.state) {
        //         currentAnimate('right')
        //     } else {
        //         let hash = e.currentTarget.location.hash
        //
        //         // console.log(e.currentTarget.location.hash)
        //         if (hash === '#/' || hash === '#/item' || hash === '#/burCar/tab' || hash === '#/user') {
        //             currentAnimate('normal')
        //         }
        //         else {currentAnimate('left')}
        //
        //     }
        // }, false);

        window.addEventListener('hashchange', (e) => {
            window.history.replaceState('hasHash', '', '');
            let href = window.location.href
            if (href.indexOf('from=singlemessage&isappinstalled=0') > 0) {
                href = href.replace('from=singlemessage&isappinstalled=0', '')
                window.location.href = href
                return
            }
            if (href.indexOf('?') > 0) {
                let url = href.match(/\?(\S*)#/)[0]
                href = href.replace(url, '#')
            }
            if (href.indexOf('goodsDetail') > 0 || href.indexOf('activeDetail') > 0) {
                return
            }
            if (isPro) {
                this.props.fetchWxConfig({
                    imgUrl: 'http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/defaultuser.png',
                    title: '美纶购商城',
                    description: "美纶购，无限购！",
                    link: href
                });

            }


        })
    }
// {/*<CSSTransitionGroup*/}
// {/*transitionName={animateCls}*/}
// {/*transitionEnter={true}*/}
// {/*transitionLeave={true}*/}
// {/*transitionEnterTimeout={animateCls==='normal'?1:400}*/}
// {/*transitionLeaveTimeout={animateCls==='normal'?1:400}*/}
// {/*>*/}

    render() {
        const {animateCls} = this.props
        console.log(animateCls)
        return (
            <Router history={history}>
                <Route render={({location}) => {
                    return (
                            <div key={location.pathname} style={{width: '7.5rem'}}>
                                <Route location={location} exact path="/" component={Home}/>
                                <Route location={location} path="/home" component={Home}/>
                                <Route location={location} path="/user" component={User}/>
                                <Route location={location} path="/item" component={Item}/>
                                <Route location={location} path="/burCar/:state" component={BuyCar}/>
                                <Route location={location} path="/goodsDetail/:id" component={GoodsDetail}/>
                                <Route location={location} path="/itemList/:id" component={ItemList}/>
                                <Route location={location} path="/moreList/:id" component={MoreList}/>
                                <Route location={location} path="/search" component={Search}/>
                                <Route location={location} path="/searchList" component={SearchList}/>
                                <Route location={location} path="/QRCodeList/:id" component={QRCodeList}/>

                                <Route location={location} path="/auth" component={Auth}/>
                                <Route location={location} path="/login" component={Login}/>
                                <Route location={location} path="/reg" component={Reg}/>
                                <Route location={location} path="/updatePwd" component={UpdatePwd}/>
                                <Route location={location} path="/setting" component={Setting}/>
                                <Route location={location} path="/about" component={About}/>
                                <Route location={location} path="/userCenter" component={UserCenter}/>
                                <Route location={location} path="/myOrder" component={MyOrder}/>
                                <Route location={location} path="/bill/:id" component={Bill}/>
                                <Route location={location} path="/address/:id" component={Address}/>
                                <Route location={location} path="/newAds" component={NewAds}/>
                                <Route location={location} path="/phone" component={UpdatePhone}/>
                                <Route location={location} path="/orderDetail" component={OrderDetail}/>
                                <Route location={location} path="/pay/:id" component={Pay}/>
                                <Route location={location} path="/help" component={Help}/>
                                <Route location={location} path="/webTxt" component={WebTxt}/>

                                <Route location={location} path="/yesOrder/:id" component={YesOrderDetail}/>
                                <Route location={location} path="/topUp" component={TopUp}/>
                                <Route location={location} path="/withdraw" component={WithDraw}/>
                                <Route location={location} path="/active" component={Active}/>
                                <Route location={location} path="/activeDetail/:id" component={ActiveDetail}/>
                                <Route location={location} path="/remark/:id" component={Remark}/>
                                <Route location={location} path="/wallet" component={Wallet}/>
                                <Route location={location} path="/jinfu" component={Jinfu}/>
                                <Route location={location} path="/jinTopUp/:id" component={JinTopUp}/>
                                <Route location={location} path="/jinDraw" component={JinDraw}/>
                                <Route location={location} path="/postType" component={PostType}/>
                                <Route location={location} path="/invoice" component={Invoice}/>
                                <Route location={location} path="/newPer" component={NewPer}/>
                                <Route location={location} path="/special" component={Special}/>
                                <Route location={location} path="/newDay" component={NewDay}/>
                                <Route location={location} path="/ranking" component={Ranking}/>
                                <Route location={location} path="/seckill" component={Seckill}/>
                                <Route location={location} path="/imported" component={Imported}/>
                                <Route location={location} path="/importedClass" component={ImportedClass}/>

                                <Route location={location} path="/vipActive" component={VipActive}/>
                                <Route location={location} path="/hotGoods" component={HotGoods}/>
                                <Route location={location} path="/joinUs" component={JoinUs}/>

                                <Route location={location} path="/protocol/:id" component={Protocol}/>
                                <Route location={location} path="/doubleActive" component={DoubleActive}/>

                                <Route location={location} path="/paySuccess/:id" component={PaySuccess}/>
                                <Route location={location} path="/payFail/:id" component={PayFail}/>

                                {/*<Redirect from="*" to='/'/>*/}
                            </div>

                    )
                }}/>
            </Router>
        )
    }
}