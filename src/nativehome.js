import React from 'react'
import {Route, Router} from 'react-router-dom'
import createHistory from 'history/createHashHistory'
const history = createHistory()

/*
 全局导入less
 */
import './app.less'
import './utils/iconfont/iconfont.css'


import Home from './containers/Home/native-index'

export default class App extends React.Component {

    componentDidMount() {


    }

    render() {
        return (
            <Router history={history}>
                <Route render={({location}) => {
                    return (

                        <div key={location.pathname}>
                            <Route location={location} exact path="/" component={Home}/>
                            <Route location={location} path="/home" component={Home}/>

                        </div>
                    )
                }}/>
            </Router>
        )
    }
}