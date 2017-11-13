import React from 'react'
import {getSize} from '../../utils/getSize'

import GoTop from '../../components/Commons/goTop'
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
            headState: 1,
            top:0

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


    // shouldComponentUpdate(nextProps, nextState) {
    //
    //     return (this.props.moreList.length !== nextProps.moreList.length);
    // }
    getScroll = (scrollY) => {

        const {headChange, headState} = this.props

        if (headState === 1 && scrollY < 50) {

            headChange(0)
        }

        if (headState === 0 && scrollY > 50) {
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


                {homeData.bannerDtoList && <Banner history={history} data={homeData.bannerDtoList}/>}

                {homeData.topfunDtos && <Grid data={homeData.topfunDtos} history={history}/>}
                {homeData.headlineDto && <News data={homeData.headlineDto}  history={history}/>}

                {/*固定头部结束**********************************/}
                {/*A区开始*************************************************************/}
                {
                    homeData.homepageModelADtos.map((i, k) => {

                        switch (i.type) {
                            case 1:
                                switch (i.num) {

                                    case 1:
                                        return <ModelOne key={k} history={history} data={i.linkedDtos}/>
                                            ;
                                    case 2:
                                        return (
                                            <ModelTwo key={k} history={history} data={i.linkedDtos}/>
                                        );
                                    case 3:
                                        return (
                                            <ModelTree key={k} history={history} data={i.linkedDtos}/>
                                        );
                                    case 4:
                                        return (
                                            <ModelFour key={k} history={history} data={i.linkedDtos}/>
                                        )
                                    default:
                                        break;
                                }
                            case 5:
                                return (<ModelFive key={k} history={history} data={i.goodsSimpleDtos} linkedDtos={i.linkedDtos}/>)
                            default:
                                break;
                        }
                    })
                }
                {/*A区结束*************************************************************/}

                {/*秒杀折扣活动开始******************************/}
                {

                    homeData && homeData.activityDto && homeData.activityDto.type!==null&&


                    <Active history={history} data={homeData.activityDto}/>
                }
                {/*秒杀折扣活动结束******************************/}

                {/*B区开始*************************************************************/}
                {
                    homeData.homepageModelBDtos.map((i, k) => {

                        switch (i.type) {
                            case 1:
                                switch (i.num) {

                                    case 1:
                                        return <ModelOne key={k} history={history} data={i.linkedDtos}/>
                                            ;
                                    case 2:
                                        return (
                                            <ModelTwo key={k} history={history} data={i.linkedDtos}/>
                                        );
                                    case 3:
                                        return (
                                            <ModelTree key={k} history={history} data={i.linkedDtos}/>
                                        );
                                    case 4:
                                        return (
                                            <ModelFour key={k} history={history} data={i.linkedDtos}/>
                                        )
                                    default:
                                        break;

                                }

                            case 5:
                                return (<ModelFive key={k} history={history} data={i.goodsSimpleDtos} linkedDtos={i.linkedDtos}/>)

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
                        />
                    }


                </div>
                {headState===1&& <GoTop/>}

            </div>
        );
    }
}
