// import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
// import {getQueryString} from './utils/tools'
import createLogger from 'redux-logger';

import { AppContainer } from 'react-hot-loader'

////测试
// import App from './test'


//原生
//
// import App from './native'

////商城入口

import App from './App'


import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers/index'
import 'antd-mobile/dist/antd-mobile.less';
//按模块导入lodash，可以有效减小vendor.js的大小
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import debounce from 'lodash/debounce'
import isArray from 'lodash/isArray'
import {removeLocalItem} from './utils/cookie'
const nodeEnv = process.env.NODE_ENV || 'development'

const isPro = nodeEnv === 'production'

// if (isPro) {
//     console.log("获取openid")
//     require('./utils/openId')
// }
// removeLocalItem("userInfo")
window.isEmpty = isEmpty
window.isEqual = isEqual
window.debounce = debounce
window.isArray = isArray

const history = createHistory()
const middleware = routerMiddleware(history)

//解决移动端300毫秒延迟
// FastClick.attach(document.body)
const middlewares = [thunk, middleware]

const store = createStore(
    combineReducers({routing: routerReducer, ...rootReducer}),

    composeWithDevTools(applyMiddleware(...middlewares,createLogger()))
)
// removeLocalItem('userInfo')
const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )

render(App)

if(module.hot) {
    module.hot.accept('./App', () => {
        const NextRootContainer = require('./App').default
        render(NextRootContainer)
    })
}