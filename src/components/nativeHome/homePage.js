import React from 'react'
import {getSize} from '../../utils/getSize'
import {nativeHomeSdk} from '../../utils/native-sdk'

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


export  default  class ListIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: document.documentElement.clientHeight,

            headState: 1

        };


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


    }
    _turnToNative = (data) => {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            window.android.messageHandlers(JSON.stringify(data))
        }
        if (isiOS) {
            window.webkit.messageHandlers.AppModel.postMessage(data);
        }
    }

    reFresh = () => {

        const {pagesize, fetchHome, fetchHomeList} = this.props
        fetchHome()
        fetchHomeList({pagesize: pagesize, pagenum: 0,})
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
        console.log(homeData)

        return (
            <div>

                {/*固定头部开始**********************************/}


                {homeData.bannerDtoList && <Banner data={homeData.bannerDtoList} turn={this._turnToNative}/>}

                {homeData.topfunDtos && <Grid data={homeData.topfunDtos} history={history} turn={this._turnToNative}/>}
                {homeData.headlineDto && <News data={homeData.headlineDto} turn={this._turnToNative}/>}

                {/*固定头部结束**********************************/}
                {/*A区开始*************************************************************/}
                {
                    homeData.homepageModelADtos.map((i, k) => {

                        switch (i.type) {
                            case 1:
                                switch (i.num) {

                                    case 1:
                                        return <ModelOne key={k} hitory={history} data={i.linkedDtos} turn={this._turnToNative}/>
                                            ;
                                    case 2:
                                        return (
                                            <ModelTwo key={k} hitory={history} data={i.linkedDtos} turn={this._turnToNative}/>
                                        );
                                    case 3:
                                        return (
                                            <ModelTree key={k} hitory={history} data={i.linkedDtos} turn={this._turnToNative}/>
                                        );
                                    case 4:
                                        return (
                                            <ModelFour key={k} hitory={history} data={i.linkedDtos} turn={this._turnToNative}/>
                                        )
                                    default:
                                        break;
                                }
                            case 5:
                                return (<ModelFive key={k} hitory={history} data={i.goodsSimpleDtos} turn={this._turnToNative}/>)
                            default:
                                break;
                        }
                    })
                }
                {/*A区结束*************************************************************/}

                {/*秒杀折扣活动开始******************************/}
                {
                    homeData && homeData.activityDto && homeData.activityDto.type!==null&&

                    <Active hitory={history} data={homeData.activityDto}/>                }
                {/*秒杀折扣活动结束******************************/}

                {/*B区开始*************************************************************/}
                {
                    homeData.homepageModelBDtos.map((i, k) => {

                        switch (i.type) {
                            case 1:
                                switch (i.num) {

                                    case 1:
                                        return <ModelOne key={k} hitory={history} data={i.linkedDtos} turn={this._turnToNative}/>
                                            ;
                                    case 2:
                                        return (
                                            <ModelTwo key={k} hitory={history} data={i.linkedDtos} turn={this._turnToNative}/>
                                        );
                                    case 3:
                                        return (
                                            <ModelTree key={k} hitory={history} data={i.linkedDtos} turn={this._turnToNative}/>
                                        );
                                    case 4:
                                        return (
                                            <ModelFour key={k} hitory={history} data={i.linkedDtos} turn={this._turnToNative}/>
                                        )
                                    default:
                                        break;

                                }

                            case 5:
                                return (<ModelFive key={k} hitory={history}  data={i.goodsSimpleDtos} turn={this._turnToNative}/>)

                            default:
                                break;

                        }
                    })
                }
                {/*B区结束*************************************************************/}

                {/*更多商品列表--------------------------------------*/}

                <div className="hot-list">

                    {
                        dataList && dataList.length > 0 &&
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


            </div>
        );
    }
}
