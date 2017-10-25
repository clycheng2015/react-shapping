import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Route, Router} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import createHistory from 'history/createHashHistory'
const history = createHistory()

/*
 全局导入less
 */
import './app.less'


import './utils/iconfont/iconfont.css'




// import Active from './containers/active/native_index'
// import Active from './components/Commons/demo'

import Home from './containers/Home/index'

export default class App extends React.Component {

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.props.currentAnimate('normal')
        })
    }
    render() {
        return (
            <Router history={history}>

                <Route render={({location}) => {
                    return (

                        <div key={location.pathname}>

                            <Route location={location} path="/" component={Home}/>


                        </div>
                    )
                }}/>
            </Router>
        )
    }
}