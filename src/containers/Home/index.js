/**
 * Created by Administrator on 2016/7/1.
 */
import React, {PropTypes}from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Tabs, Icon, SearchBar, Button} from 'antd-mobile'
import * as home from '../../actions/home'
import getSize from '../../utils/getSize'
import HomePage from '../../components/Home/homePage'
import TabBarMain from 'containers/common/tabbar'




require('./styles/home.less')

@connect(
    state => {
        return {...state.home}
    },
    dispatch => bindActionCreators({...home}, dispatch)
)
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
    }


    componentDidMount() {
            const {pagenum, pagesize, cid, success, isFetching, tab, getHomeList, homeList} = this.props

                getHomeList(tab, {pagesize: 100, pagenum: pagenum, cid: cid})

    }


    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {list, tabs, location, history, success, homeList, tab, isFetching, tabIndex, pagenum, pagesize, cid, getHomeList} = this.props
        return (
            <div className="home-container">
                <HomePage history={history} dataList={homeList}/>
                <TabBarMain history={history} page="/"/>
            </div>
        )
    }
}
