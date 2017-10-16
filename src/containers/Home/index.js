/**
 * Created by Administrator on 2016/7/1.
 */
import React, {PropTypes}from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Tabs, Icon, SearchBar, Button} from 'antd-mobile'
import * as home from '../../actions/home'
import getSize from '../../utils/getSize'


import SearchBar from '../../components/Home/searchBar'
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
        const {pagenum, pagesize, cid, tabs, tab, getHomeList, getTabs, isFetching} = this.props
        if (tabs.length === 0) {

            getTabs()
        }

    }


    componentWillReceiveProps(nextProps) {

        const {pagenum, pagesize, cid, success, isFetching, tab, getHomeList, homeList} = nextProps
        // && ! homeList[tab]
        if (!isFetching && !success && tab != this.props.tab && !homeList[tab]) {

            getHomeList(tab, {pagesize: pagesize, pagenum: pagenum, cid: cid})


        }

    }


    _change = (tab, index) => {

        const {tabChange} = this.props
        let {scrollT} = getSize();

        console.log(scrollT)

        tabChange(tab.title, tab.cid, index)

    }

    render() {
        const {list, tabs, location, history, success, homeList, tab, isFetching, tabIndex, pagenum, pagesize, cid, getHomeList} = this.props
        console.log(this.props)


        const cnt = () => {

            if (homeList[tab]) {
                // console.log("2132")
                return (

                    <List list={homeList[tab]} tab={tab} pagesize={homeList[tab].pagesize} isFetching={isFetching}
                          history={history} pagenum={homeList[tab].pagenum} cid={cid} getHomeList={getHomeList}/>

                )
            } else {

                return (<div style={{width: "100%", textAlign: "center", marginTop: ".1rem"}}>

                    {/*<Icon type="loading"/>*/}
                </div>)
            }


        }
        return (
            <div className="home-container">
                <SearchBar/>




                <TabBarMain history={history} page="/"/>
            </div>
        )
    }
}
