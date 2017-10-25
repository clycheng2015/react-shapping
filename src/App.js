import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Route, Router} from 'react-router-dom'
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
//auth
// import Auth from'./containers/auth/index'
// import Reg from './containers/auth/reg'
// import Login from './containers/auth/login'
// import UpdatePwd from './containers/auth/updatePwd'

const Auth = asyncComponent(() => import( './containers/auth/index'))
const Reg = asyncComponent(() => import( './containers/auth/reg'))
const Login = asyncComponent(() => import( './containers/auth/login'))
const UpdatePwd = asyncComponent(() => import( './containers/auth/updatePwd'))


const User = asyncComponent(() => import( './containers/user/index'))
const Item = asyncComponent(() => import( './containers/item/index'))
const BuyCar = asyncComponent(() => import( './containers/buyCar/index'))


const GoodsDetail = asyncComponent(() => import( './containers/common/goodsDetail'))
const ItemList = asyncComponent(() => import( './containers/common/itemList'))
const MoreList = asyncComponent(() => import( './containers/common/moreList'))
const Search = asyncComponent(() => import( './containers/common/search'))


//user
const Setting = asyncComponent(() => import( './containers/user/setting'))
const About = asyncComponent(() => import( './containers/user/about'))
const UserCenter = asyncComponent(() => import( './containers/user/userCenter'))
const MyOrder = asyncComponent(() => import( './containers/user/myOrder'))
const Bill = asyncComponent(() => import( './containers/user/bill'))
const Address = asyncComponent(() => import( './containers/user/address'))
const NewAds = asyncComponent(() => import( './containers/user/newAds'))
const UpdatePhone = asyncComponent(() => import( './containers/user/phone'))
const OrderDetail = asyncComponent(() => import( './containers/common/orderDetail'))
const Pay = asyncComponent(() => import( './containers/common/pay'))
const Ceshi = asyncComponent(() => import( './containers/common/ceshi'))
const YesOrderDetail = asyncComponent(() => import( './containers/common/yesOrderDetail'))
const TopUp = asyncComponent(() => import( './containers/user/topUp'))
const WithDraw = asyncComponent(() => import( './containers/user/withdraw'))
const Remark = asyncComponent(() => import( './containers/user/remark'))
const Wallet = asyncComponent(() => import( './containers/user/wallet'))
const Jinfu = asyncComponent(() => import( './containers/user/jinfu'))
const JinTopUp = asyncComponent(() => import( './containers/user/jinTopUp'))
const JinDraw = asyncComponent(() => import( './containers/user/jinDraw'))


const PostType = asyncComponent(() => import( './containers/common/postType'))
const Invoice = asyncComponent(() => import( './containers/common/invoice'))







//活动中心

const Active = asyncComponent(() => import( './containers/active/index'))
const ActiveDetail = asyncComponent(() => import( './containers/common/activeDetail'))


const NewPer = asyncComponent(() => import( './containers/active/newPer'));
const Special = asyncComponent(() => import( './containers/active/special'));
const NewDay = asyncComponent(() => import( './containers/active/newDay'));
const Ranking = asyncComponent(() => import( './containers/active/ranking'));
const Seckill = asyncComponent(() => import( './containers/active/seckill'));
const Imported = asyncComponent(() => import( './containers/active/imported'));
const ImportedClass = asyncComponent(() => import( './containers/active/importedClass'));
const VipActive = asyncComponent(() => import( './containers/active/vipActive'));
const HotGoods = asyncComponent(() => import( './containers/active/hotGoods'));
const JoinUs = asyncComponent(() => import( './containers/active/joinUs'));




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

        if (isPro) {

            let href=window.location.href


            if(href.indexOf('?from=singlemessage&isappinstalled=0')>0){

              href= href.replace('?from=singlemessage&isappinstalled=0','')
                window.location.href=href
                return
            }

            if(href.indexOf('?')>0){

                let url= href.match(/\?(\S*)#/)[0]

                href=href.replace(url,'#')
            }

            this.props.fetchWxConfig({

                imgUrl: 'http://worldwideapp.chinazjtc.com/upload/defaultuser.png', title: '美纶购商城', description: "美纶购，无限购！", link: href
            });

        }
        window.addEventListener('hashchange', () => {
            this.props.currentAnimate('normal')

            let href=window.location.href


            if(href.indexOf('from=singlemessage&isappinstalled=0')>0){

                href= href.replace('from=singlemessage&isappinstalled=0','')
                window.location.href=href
                return
            }
            if(href.indexOf('?')>0){

                let url= href.match(/\?(\S*)#/)[0]

                href=href.replace(url,'#')
            }
            if (isPro) {


                this.props.fetchWxConfig({

                    imgUrl: 'http://worldwideapp.chinazjtc.com/upload/defaultuser.png', title: '美纶购商城', description: "美纶购，无限购！", link: href
                });

            }


        })
    }

    render() {
        const {animateCls} = this.props
        return (
            <Router history={history}>

                <Route render={({location}) => {
                    return (

                        <div key={location.pathname}>
                            <Route location={location} exact path="/" component={Home}/>

                            <Route location={location} path="/home" component={Home}/>
                            <Route location={location} path="/user" component={User}/>
                            <Route location={location} path="/item" component={Item}/>
                            <Route location={location} path="/burCar/:state" component={BuyCar}/>
                            <Route location={location} path="/goodsDetail/:id" component={GoodsDetail}/>
                            <Route location={location} path="/itemList/:id" component={ItemList}/>
                            <Route location={location} path="/moreList/:id" component={MoreList}/>
                            <Route location={location} path="/search/:value" component={Search}/>
                            <Route location={location} path="/auth" component={Auth}/>
                            <Route location={location} path="/login" component={Login}/>
                            <Route location={location} path="/reg" component={Reg}/>
                            <Route location={location} path="/updatePwd" component={UpdatePwd}/>
                            <Route location={location} path="/setting" component={Setting}/>
                            <Route location={location} path="/about" component={About}/>
                            <Route location={location} path="/userCenter" component={UserCenter}/>
                            <Route location={location} path="/myOrder/:id" component={MyOrder}/>
                            <Route location={location} path="/bill" component={Bill}/>
                            <Route location={location} path="/address" component={Address}/>
                            <Route location={location} path="/newAds" component={NewAds}/>
                            <Route location={location} path="/phone" component={UpdatePhone}/>
                            <Route location={location} path="/orderDetail" component={OrderDetail}/>
                            <Route location={location} path="/pay" component={Pay}/>
                            <Route location={location} path="/ceshi" component={Ceshi}/>
                            <Route location={location} path="/yesOrder/:count" component={YesOrderDetail}/>
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



                        </div>
                    )
                }}/>
            </Router>
        )
    }
}