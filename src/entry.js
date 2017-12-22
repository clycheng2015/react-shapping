import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers/index'
import 'antd-mobile/dist/antd-mobile.less';
//按模块导入lodash，可以有效减小vendor.js的大小
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import debounce from 'lodash/debounce'
import isArray from 'lodash/isArray'
window.isEmpty = isEmpty
window.isEqual = isEqual
window.debounce = debounce
window.isArray = isArray
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'
const history = createHistory()

const middleware = routerMiddleware(history)

const middlewares = [thunk, middleware]

// import App from './native'
// import App from './nativehome'
import App from './App'


let store;
if (isPro) {
    store = createStore(
        combineReducers({routing: routerReducer, ...rootReducer}),
        composeWithDevTools(applyMiddleware(...middlewares))
    )
} else {
    store = createStore(
        combineReducers({routing: routerReducer, ...rootReducer}),
        composeWithDevTools(applyMiddleware(...middlewares, createLogger()))
    )
}

/***
 * 清空store
 * @param
 */

const init=()=>({

    type:'CLEAR_ALL_STATE'

})

window.resetState = () => {

    store.dispatch(init());
}

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

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextRootContainer = require('./App').default
        render(NextRootContainer)
    })
}