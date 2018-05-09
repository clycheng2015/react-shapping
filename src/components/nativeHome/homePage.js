import React from 'react'
import {getSize} from '../../utils/getSize'

/**
 * 首页模块组件
 */
import Banner from './banner'
import Grid from './grid'
import News from './news'
import Active from './active'

/**
 * 流动组件
 */

import ModelOne from './model_one'
import ModelTwo from './model_two'
import ModelTree from './model_tree'
import ModelFour from './model_four'
import ModelFive from './model_five'
import List from './moreList'
import GoTop from '../../components/Commons/goTop'

export  default  class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: document.documentElement.clientHeight,

            headState: 1

        };
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if (isiOS) {

            // window.H5Refresh = this.H5Refresh
        }


        // window.webkit.H5Refresh = this.H5Refresh
        //


    }

    componentDidMount() {

        window.onscroll = () => {
            let {scrollT} = getSize();
            this.getScroll(scrollT)
        }


    }


    componentWillUnmount() {

        window.onscroll = null;
    }


    componentWillReceiveProps(np, ns) {

        // const {isFetching} = np
        // if (!isFetching) {
        //     console.log('in')
        //     endRefresh()
        // }


    }


    // shouldComponentUpdate(nextProps, nextState) {
    //
    //     return (this.props.moreList.length !== nextProps.moreList.length);
    // }
    getScroll = (scrollY) => {

        const {headChange, headState} = this.props

        if (headState == 1 && scrollY < 50) {

            headChange(0)
        }
        if (headState == 0 && scrollY > 50) {
            headChange(1)
        }


    }
    _gridClick = (el) => {

        this.props.history.push(el.path)

    }

    shouldComponentUpdate(np, ns) {

        return ((np.dataList.length !== this.props.dataList.length) || np.headState !== this.props.headState)

    }

    render() {
        const {history, homeData, dataList, pagenum, isFetching, hasMore, fetchHomeList, pagesize, scrollT, headState} = this.props

        return (
            <div>

                {/*固定头部开始**********************************/}

                <div className="area-banner">
                    {homeData && homeData.bannerDtoList &&
                    <Banner data={homeData.bannerDtoList} turn={this._turnToNative}/>}
                </div>


                <div className="area-gird">
                    {homeData && homeData.topfunDtos &&
                    <Grid data={homeData.topfunDtos} history={history} turn={this._turnToNative}/>}
                </div>

                <div className="area-news">
                    {homeData && homeData.headlineDto && <News data={homeData.headlineDto} turn={this._turnToNative}/>}
                </div>

                {/*固定头部结束**********************************/}

                {/*A区开始*************************************************************/}
                <div className="area-A">
                    {
                        homeData && homeData.homepageModelADtos.map((i, k) => {

                            switch (i.type) {
                                case 1:
                                    switch (i.num) {

                                        case 1:
                                            return <ModelOne key={k}  data={i.linkedDtos}/>
                                                ;
                                        case 2:
                                            return (
                                                <ModelTwo key={k}  data={i.linkedDtos}/>
                                            );
                                        case 3:
                                            return (
                                                <ModelTree key={k}  data={i.linkedDtos}/>
                                            );
                                        case 4:
                                            return (
                                                <ModelFour key={k}  data={i.linkedDtos}/>
                                            )
                                        default:
                                            break;

                                    }

                                case 5:
                                    return (<ModelFive key={k} data={i.goodsSimpleDtos} linkedDtos={i.linkedDtos}/>)

                                default:
                                    break;

                            }
                        })
                    }
                </div>

                {/*A区结束*************************************************************/}

                {/*秒杀折扣活动开始******************************/}


                {

                    homeData && homeData.activityDto && homeData.activityDto.type !== null &&

                    <div className="area-active">
                        <Active hitory={history} data={homeData.activityDto}/>
                    </div>
                }


                {/*秒杀折扣活动结束******************************/}

                {/*B区开始*************************************************************/}

                <div className="area-B">
                    {
                        homeData && homeData.homepageModelBDtos.map((i, k) => {

                            switch (i.type) {
                                case 1:
                                    switch (i.num) {

                                        case 1:
                                            return <ModelOne key={k}  data={i.linkedDtos}/>
                                                ;
                                        case 2:
                                            return (
                                                <ModelTwo key={k}  data={i.linkedDtos}/>
                                            );
                                        case 3:
                                            return (
                                                <ModelTree key={k}  data={i.linkedDtos}/>
                                            );
                                        case 4:
                                            return (
                                                <ModelFour key={k}  data={i.linkedDtos}/>
                                            )
                                        default:
                                            break;

                                    }

                                case 5:
                                    return (<ModelFive key={k} data={i.goodsSimpleDtos} linkedDtos={i.linkedDtos}/>)

                                default:
                                    break;

                            }
                        })
                    }
                </div>

                {/*B区结束*************************************************************/}

                {/*更多商品列表--------------------------------------*/}

                <div className="hot-list">

                    {
                        homeData && dataList && dataList.length > 0 &&
                        <List
                            getScroll={this.getScroll}
                            list={dataList}
                            history={history}
                            fetchHomeList={fetchHomeList}
                            pagenum={pagenum}
                            isFetching={isFetching}
                            hasMore={hasMore}
                            pagesize={pagesize}
                            scrollT={scrollT}
                            turn={this._turnToNative}
                        />
                    }


                </div>

                {headState===1&& <GoTop/>}

            </div>
        );
    }
}

