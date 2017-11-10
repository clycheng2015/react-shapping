import React from 'react'
import {Route, Router} from 'react-router-dom'
import createHistory from 'history/createHashHistory'
const history = createHistory()

/*
 全局导入less
 */
import './app.less'
import './utils/iconfont/iconfont.css'
import asyncComponent from './AsyncComponent'

import Home from './containers/Home/native-index'


//活动中心

const Active = asyncComponent(() => import( './containers/nativeActive/index'))
const NewPer = asyncComponent(() => import( './containers/nativeActive/newPer'));
const Special = asyncComponent(() => import( './containers/nativeActive/special'));
const NewDay = asyncComponent(() => import( './containers/nativeActive/newDay'));
const Ranking = asyncComponent(() => import( './containers/nativeActive/ranking'));
const Seckill = asyncComponent(() => import( './containers/nativeActive/seckill'));
const Imported = asyncComponent(() => import( './containers/nativeActive/imported'));
const ImportedClass = asyncComponent(() => import( './containers/nativeActive/importedClass'));
const VipActive = asyncComponent(() => import( './containers/nativeActive/vipActive'));
const HotGoods = asyncComponent(() => import( './containers/nativeActive/hotGoods'));

const JoinUs = asyncComponent(() => import( './containers/nativeActive/joinUs'));
const DoubleActive = asyncComponent(() => import( './containers/nativeActive/doubleActive'));

export default class App extends React.Component {

    render() {
        const {animateCls} = this.props
        return (
            <Router history={history}>

                <Route render={({location}) => {
                    return (

                        <div key={location.pathname}>
                            <Route location={location} exact path="/" component={Home}/>
                            <Route location={location} path="/home" component={Home}/>
                            <Route location={location} path="/active" component={Active}/>
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
                            <Route location={location} path="/doubleActive" component={DoubleActive}/>



                        </div>
                    )
                }}/>
            </Router>
        )
    }
}