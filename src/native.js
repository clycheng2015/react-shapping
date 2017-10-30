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

const Active = asyncComponent(() => import( './containers/active/index'))


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

export default class App extends React.Component {

    componentDidMount() {


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



                        </div>
                    )
                }}/>
            </Router>
        )
    }
}