/**
 * Created by bear on 2017/9/11.
 */

import React, {PropTypes}from 'react'

import {Link} from 'react-router-dom'

import {Carousel, Progress} from 'antd-mobile'


import Scroller from '../../utils/Scroller/src/Scroller';

let banner = [
    {
        flashpic: require("static/image/open.png"),
    },
    {
        flashpic: require("static/image/open.png"),
    },

]

let slider = [

    {
        name: '特价商品', value: 0
    },
    {
        name: '折扣商品', value: 1
    },

]
class ActiveContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            change: 0,
            percent: 50,
        };

        this.index = 1;
    }

    componentDidMount() {
        const {fetchAcList, pagesize} = this.props
        fetchAcList({
            pagesize: pagesize,
            pagenum: 1,
        },)

    }

    componentWillReceiveProps() {


    }

    _changeType = (i) => {
        const {fetchAcList, pagesize, fetchDisAcList} = this.props
        this.setState({
            change: i.value
        })

        if (i.value === 0) {


            fetchAcList({
                pagesize: pagesize,
                pagenum: 1,
            })
        }
        if (i.value === 1) {

            fetchDisAcList({
                pagesize: pagesize,
                pagenum: 1,
            })
        }
    }
    /**
     * 获取列表内容
     * */
    getContent = () => {

        this.index = 1;

        const {history, list, disList} = this.props

        if (this.state.change === 0) {

            if (list && list.length) {
                return list.map(
                    (list, key) => <li key={key} className="list-view-item">
                        <div className="img-info">
                            <img src={list.bigpic} alt=""/>
                        </div>
                        <div className="title-info">
                            <p className="title">{list.title}
                            </p>
                            <div className="price-info">
                                <div className="left">
                                    <p className="now-price"><span>￥</span>{list.seckillprice}</p>
                                    <p className="old-price">￥{list.price}</p>
                                </div>
                                <div className="show-info">
                                    <div className="btn-info">

                                        {
                                            list.seckillstate == 3 ? <div className="btn1">已结束</div> : ""
                                        }


                                        {
                                            list.seckillstate == 2 ? <div className="btn"
                                                                          onClick={() => {
                                                                              history.push({
                                                                                  pathname: `/activeDetail/${list.id}SECKILL`,
                                                                                  state: {type: "SECKILL"}
                                                                              })
                                                                          }
                                                                          }
                                            >去抢购</div> : ""
                                        }


                                        {
                                            list.seckillstate == 1 ? <div className="btn1"


                                            >未开始</div> : ""
                                        }


                                    </div>
                                    <div>
                                        < Progress className="progress"
                                                   percent={Number(list.surplusnum) / Number(list.num) * (100)}
                                                   position="normal"/>
                                        <span className="exp">还剩:{list.surplusnum}件</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            }
        }
        else if (this.state.change === 1) {

            if (disList && disList.length) {
                return disList.map(
                    (list, key) => <li key={key} className="list-view-item">
                        <div className="img-info">
                            <img src={list.bigpic} alt=""/>
                        </div>
                        <div className="title-info">
                            <p className="title">{list.title}
                            </p>
                            <div className="price-info">
                                <div className="left">
                                    <p className="now-price"><span>折扣:</span>{list.zkprice}</p>
                                    <p className="now-price"></p>
                                    <p className="old-price1">￥{list.price}</p>
                                </div>
                                <div className="show-info">
                                    <div className="btn-info">
                                        {
                                            list.discountstate == 3 ? <div className="btn1">已结束</div> : ""
                                        }


                                        {
                                            list.discountstate == 2 ? <div className="btn"

                                                                           onClick={() => {
                                                                               history.push({
                                                                                   pathname: `/activeDetail/${list.id}DISCOUNT`,
                                                                                   state: {type: "DISCOUNT"}
                                                                               })
                                                                           }
                                                                           }
                                            >去抢购</div> : ""
                                        }


                                        {
                                            list.discountstate == 1 ? <div className="btn1">未开始</div> : ""
                                        }


                                    </div>
                                    <div>
                                        < Progress className="progress"
                                                   percent={Number(list.surplusnum) / Number(list.num) * (100)}
                                                   position="normal"/>
                                        <span className="exp">还剩:{list.surplusnum}件</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            }
        } else {

            return (

                <div></div>
            )


        }
    }

    /**
     * 获取数据
     * */
    fetchData = (type, resolve, reject) => {

    }

    /**
     * 下拉刷新动作
     * */
    pullRefreshAction = (resolve, reject) => {

        console.log('正在下拉')
        const {fetchAcList, pagesize, fetchDisAcList} = this.props

        if (this.state.change == 0) {
            fetchAcList({
                pagesize: pagesize,
                pagenum: 1,
            }, resolve, reject)
        } else {

            fetchDisAcList({
                pagesize: pagesize,
                pagenum: 1,
            }, resolve, reject)
        }
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction = (resolve, reject) => {


        const {fetchAcList, pagesize, pagenum, fetchDisAcList, skillHasMore, disHasMore} = this.props
        let num = pagenum

        if (this.state.change == 0 && !skillHasMore) {
            fetchAcList({
                pagesize: pagesize,
                pagenum: ++num,
            }, resolve, reject)
        } else if (!disHasMore && this.state.change == 0) {
            fetchDisAcList({
                pagesize: pagesize,
                pagenum: ++num,
            }, resolve, reject)

        } else {
        }
    }

    render() {
        const {skillHasMore, disHasMore} = this.props

        const Footer = () => {

            if (this.state.change == 0) {
                if (!skillHasMore) {
                    return (<div style={{height: '1rem', textAlign: "center", lineHeight: "1rem",marginBottom:"1rem"}}>加载更多</div>)
                }
                else {
                    return (<div style={{height: '1rem', textAlign: "center", lineHeight: "1rem",marginBottom:"1rem"}}>没有更多了</div>)
                }
            } else {
                if (!disHasMore) {
                    return (<div style={{height: '1rem', textAlign: "center", lineHeight: "1rem",marginBottom:"1rem"}}>加载更多</div>)
                }
                else {
                    return (<div style={{height: '1rem', textAlign: "center", lineHeight: "1rem",marginBottom:"1rem"}}>没有更多了</div>)
                }
            }


        }
        return (
            <Scroller

                ref={ref => {
                    this.scroller = ref
                }}
                usePullRefresh
                pullRefreshAction={this.pullRefreshAction}
                useLoadMore
                loadMoreAction={this.loadMoreAction}
                click={true}

            >

                <div
                    style={
                        {
                            marginTop: ".8rem",
                            // paddingBottom: "1rem",
                        }
                    }
                >
                    {/*<Carousel*/}
                        {/*className="my-carousel"*/}

                        {/*infinite*/}
                        {/*autoplay*/}
                        {/*selectedIndex={1}*/}
                        {/*swipeSpeed={30}*/}
                        {/*beforeChange={(from, to) => {*/}
                        {/*}}*/}
                        {/*afterChange={index => {*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*{banner.map((i, key) => (*/}
                            {/*<img key={key} src={i.flashpic} onLoad={() => {*/}
                                {/*this.setState({initialHeight: null,})*/}
                            {/*}}*/}

                                 {/*style={{height: "3rem", width: "100%"}}*/}
                            {/*/>*/}
                        {/*))}*/}
                    {/*</Carousel>*/}
                    <img  src={require("static/image/1031banenr.jpg")} onLoad={() => {
                        this.setState({initialHeight: null,})
                    }}

                         style={{height: "3rem", width: "100%"}}
                    />
                    <ul className="slider">
                        {
                            slider.map((i, key) => (

                                <li key={`key${key}`} className={this.state.change === i.value ? 'active' : ""}

                                    onClick={() => {

                                        this._changeType(i)
                                    }}

                                >{i.name}
                                    <span className="icon"></span>
                                </li>

                            ))
                        }
                    </ul>
                    <ul className="cnt">
                        {  this.getContent()}
                    </ul>
                    {Footer()}
                </div>
            </Scroller>
        )
    }
}

export  default  ActiveContent