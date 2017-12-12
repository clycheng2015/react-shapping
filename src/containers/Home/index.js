/**
 * Created by Administrator on 2016/7/1.
 */
import React, {PropTypes}from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as home from '../../actions/home'
import HomePage from '../../components/Home/homePage'
import Head from '../../components/Home/head'
import TabBarMain from 'containers/common/tabbar'
import {getSize} from '../../utils/getSize'

import {Icon} from 'antd-mobile'

require('./styles/index.less')
@connect(
    state => {
        return {...state.home}
    },
    dispatch => bindActionCreators({...home}, dispatch)
)
export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {pagenum, pagesize, fetchHome, fetchHomeList, dataList} = this.props

        fetchHome()
        if (dataList.length === 0) {
            fetchHomeList({pagesize: pagesize, pagenum: pagenum,})
        }
    }

    componentWillUnmount() {

        let {scrollT} = getSize();

        const {recordScrollT} = this.props;

        recordScrollT(scrollT);

        window.onscroll = null;
    }

    _toRefresh = () => {
        const {pagenum, pagesize, fetchHome, fetchHomeList, dataList} = this.props
        fetchHome()
        fetchHomeList({pagesize: pagesize, pagenum: 1,})

    }

    render() {
        const {history, homeData, errorData, isFetching, headState} = this.props
        return (
            <div className="home-container">

                {headState === 0 && <Head type={headState} history={history}/>}

                {headState === 1 && <div className="white"><Head type={headState} history={history}/></div>}


                { homeData && homeData.bannerDtoList && <HomePage {...this.props}/> }

                {
                    errorData && errorData.code && errorData.code !== 200 &&

                    <div className="empty-info"
                         style={{
                             height: document.documentElement.clientHeight - 130,
                         }}
                    >
                        <img src={require('static/images/empty/404.png')} alt=""/>
                        <p> 服务器出错啦</p>
                        <p onClick={() => this._toRefresh()}> 立即刷新</p>

                    </div>
                }
                <TabBarMain history={history} page="/"/>
            </div>
        )
    }
}
