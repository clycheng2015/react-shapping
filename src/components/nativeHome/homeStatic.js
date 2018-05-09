import React from 'react'
import {nativeClick} from '../../utils/native-sdk'


/**
 * 首页模块组件
 */

import {Carousel,Grid} from 'antd-mobile'

const grid = [

    {icon: require('static/images/home/sale_icon.png'), text: "特卖优惠", path: "special"},
    {icon: require('static/images/home/vip_icon.png'), text: "会员活动", path: "vipActive"},
    {icon: require('static/images/home/wel_icon.png'), text: "人气热销", path: "hotGoods"},
    {icon: require('static/images/home/zs_icon.png'), text: "加盟店专区", path: 'joinUs'},


]


export  default  class HomeStatic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: document.documentElement.clientHeight,

            headState: 1

        };


    }

    componentDidMount() {



    }


    componentWillUnmount() {


    }


    componentWillReceiveProps(np, ns) {


    }

    reFresh = () => {

        const {pagesize, fetchHome, fetchHomeList} = this.props
        fetchHome()
        fetchHomeList({pagesize: pagesize, pagenum: 0,})
    }


    render() {
        const {history} = this.props

        return (
            <div>

                {/*固定头部开始**********************************/}

                <div className="area-banner1">


                </div>


                <div className="area-gird1">

                    <Grid
                        data={grid}
                        hasLine={false}
                        activeStyle={false}
                        onClick={(el) => nativeClick({
                            type:1,
                            url:'http://192.168.1.247:3011/#'+el.path,
                            id:'',
                            name:el.text,
                            activeType:''
                        })}
                    />
                </div>

                <div className="area-news">


                    <div className="news">


                        <div className="left"><span className="title">美纶购<span className="exp">公告</span></span></div>

                        <div className="list">
                            <Carousel className="my-carousel"
                                      vertical
                                      dots={false}
                                      dragging={false}
                                      swiping={false}
                                      autoplay
                                      infinite
                            >
                                <div className="v-item">美纶店加盟店开业！豪礼送不断</div>
                                <div className="v-item">美纶店加盟店开业！豪礼送不断</div>
                                <div className="v-item">美纶店加盟店开业！豪礼送不断</div>
                            </Carousel>

                        </div>

                        {/*<div className="more">*/}

                        {/*<span>丨 更多</span>*/}

                        {/*</div>*/}

                    </div>

                </div>

                {/*固定头部结束**********************************/}

                {/*A区开始*************************************************************/}

                <div className="white-box"/>
                <div className="area-A1">

                </div>
                <div className="white-box"/>
                {/*A区结束*************************************************************/}

                {/*秒杀折扣活动开始******************************/}

                <div className="area-active1">

                </div>
                <div className="white-box"/>
                {/*秒杀折扣活动结束******************************/}

                {/*B区开始*************************************************************/}

                <div className="area-B1">

                </div>
                <div className="white-box"/>
                {/*B区结束*************************************************************/}

                {/*更多商品列表--------------------------------------*/}

                {/*<div className="hot-list">*/}


                {/*</div>*/}


            </div>
        );
    }
}
