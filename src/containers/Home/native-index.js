/**
 * Created by Administrator on 2016/7/1.
 */
import React, {PropTypes}from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as home from '../../actions/home'
import HomePage from '../../components/nativeHome/homePage'
import HomeStatic from '../../components/nativeHome/homeStatic'
import {getSize} from '../../utils/getSize'
import {endRefresh} from '../../utils/native-sdk'
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

        window.H5Refresh = this.H5Refresh
    }

    componentWillUnmount() {

        let {scrollT} = getSize();

        const {recordScrollT} = this.props;

        recordScrollT(scrollT);

        window.onscroll = null;
    }

    H5Refresh = () => {
        const {pagenum, pagesize, fetchHome, fetchHomeList, dataList} = this.props
        fetchHome()
        fetchHomeList({pagesize: pagesize, pagenum: 0,})


        setTimeout(()=>(
            endRefresh()
        ),1000)
    }

    render() {
        const { homeData, errorData } = this.props

        console.log(homeData)
        return (
            <div className="home-container">

                {
                    homeData && homeData.bannerDtoList?
                    <HomePage {...this.props}/>:  <HomeStatic/>
                }


            </div>
        )
    }
}
