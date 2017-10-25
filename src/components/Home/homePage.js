import React from 'react'
import {PullToRefresh, Button, Icon, NavBar, Carousel, Grid, Flex, ListView} from 'antd-mobile';
import List from '../../components/Commons/useBodyList'
import Head from './searchBar'
require( '../../utils/swiper/swiper.min.css');
require('../../utils/swiper/swiper.min.js')
import Timer from '../../components/Commons/timer'
import {localItem} from '../../utils/cookie'
const data = [

    {img: require('static/images/home/banner.png')},
    {img: require('static/images/home/banner1.jpg')},

]
const grid = [

    {icon: require('static/images/home/sale_icon.png'), text: "特卖优惠",path:"special"},
    {icon: require('static/images/home/vip_icon.png'), text: "会员活动",path:"vipActive"},
    {icon: require('static/images/home/wel_icon.png'), text: "人气热销",path:"hotGoods"},
    {icon: require('static/images/home/zs_icon.png'), text: "加盟店专区",path:'joinUs'},


]

const skillData=[
    {
        bigpic:"http://worldwideapp.chinazjtc.com/upload/img/170924133515.jpg",
        endtime:"2017-10-25 23:59:59",
        good_id:442,
        id: 83,
        num:100,
        price:32,
        seckillprice:19.9,
        seckillstate: 2,
        standard:"/个",
        startime:"2017-10-13 00:00:00",
        state:1,
        surplusnum:98,
        title:"AMOS-婴儿旅行杯200ml"
    },
    {
        bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171011152642.jpg",
        endtime:"2017-10-25 23:59:59",
        good_id:321,
        id:91,
        num:150,
        price:21,
        seckillprice:12.9,
        seckillstate:2,
        standard:"/支",
        startime:"2017-10-13 00:00:00",
        state:1,
        surplusnum:149,
        title:"韩国韩德Clean32 Cleany-T牙刷"
    },
    {
        bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171011184637.jpg",
        endtime:"2017-10-25 23:59:59",
        good_id:1524,
        id: 117,
        num:50,
        price:105,
        seckillprice: 59,
        seckillstate:2,
        standard:"/盒",
        startime:"2017-10-19 14:16:12",
        state:1,
        surplusnum:50,
        title:"丽得姿美蒂优氨基酸深层补水面膜10片装"
    },
    {
        bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171011173857.png",
        endtime:"2017-10-25 23:59:59",
        good_id:1526,
        id: 60,
        num: 50,
        price:105,
        seckillprice:59,
        seckillstate:2,
        standard:"/盒",
        startime:"2017-10-13 00:00:00",
        state: 1,
        surplusnum: 50,
        title:"丽得姿美蒂优氨基酸收缩毛孔面膜"
    },
    {
        bigpic:"http://worldwideapp.chinazjtc.com/upload/img/170924103213.png",
        endtime:"2017-10-25 23:59:59",
        good_id:1010,
        id:62,
        num:50,
        price:40.5,
        seckillprice:25,
        seckillstate: 2,
        standard:"/个",
        startime:"2017-10-13 00:00:00",
        state:1,
        surplusnum:49,
        title:"小甘菊手足龟裂修护霜20ml"
    },
    {
        bigpic:"http://worldwideapp.chinazjtc.com/upload/img/170929113818.png",
        endtime:"2017-10-25 23:59:59",
        good_id:1375,
        id:88,
        num: 150,
        price:25,
        seckillprice:15.9,
        seckillstate:2,
        standard:"/盒",
        startime:"2017-10-13 00:00:00",
        state: 1,
        surplusnum: 149,
        title:"韩国菡琉护齿美白牙膏 120g"
    },
    {
        bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171002150923.jpg",
        endtime:"2017-10-25 23:59:59",
        good_id:1383,
        id:55,
        num: 120,
        price:56.9,
        seckillprice:29,
        seckillstate:2,
        standard:"/瓶",
        startime:"2017-10-13 00:00:00",
        state: 1,
        surplusnum:119,
        title:"瑷微丹舒妍润肤卸妆水 300ml"
    },
    {
        bigpic:"http://worldwideapp.chinazjtc.com/upload/img/170929135203.png",
        endtime: "2017-10-25 23:59:59",
        good_id:1381,
        id:56,
        num: 120,
        price:27,
        seckillprice:15.8,
        seckillstate: 2,
        standard:"/个",
        startime:"2017-10-13 00:00:00",
        state: 1,
        surplusnum: 120,
        title:"瑷微丹净爽洗面奶 120g"
    }
]


export  default  class ListIndex extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
            headState: 1
        };


    }

    componentDidMount() {

        const swiper = new Swiper(this.swiper, {

            slidesPerView: 4,
            spaceBetween: 10,
            centeredSlides: true,

        });
        const shop = new Swiper(this.shop, {

            slidesPerView: 4,
            spaceBetween: 10,
            centeredSlides: true,

        });

    }


    componentWillReceiveProps(np, ns) {


    }

    getScroll = (scrollY) => {
        if (this.state.headState == 2 && scrollY < 90) {

            this.setState({

                headState: 1
            })
        }

        if (this.state.headState != 2 && scrollY > 90) {

            this.setState({

                headState: 2
            })
        }


    }
    _gridClick = (el) => {

      this.props.history.push(el.path)
    }

    render() {
        const {history,dataList}=this.props

        return (
            <div>
                {
                    this.state.headState == 1 ? <Head type={this.state.headState}/> : ''
                }
                {
                    this.state.headState == 2 ? <div className="white"><Head type={this.state.headState}/></div> : ''
                }

                {/*<PullToRefresh*/}
                {/*ref={el => this.ptr = el}*/}
                {/*distanceToRefresh={ window.devicePixelRatio * 25}*/}
                {/*indicator={ {*/}
                {/*activate: <Icon type="loading"/>,*/}
                {/*deactivate: <Icon type="loading"/>,*/}
                {/*release: <Icon type="loading"/>,*/}
                {/*finish: <Icon type="loading"/>,*/}
                {/*}}*/}
                {/*refreshing={this.state.refreshing}*/}

                {/*onRefresh={() => {*/}
                {/*console.log('下拉')*/}
                {/*this.setState({*/}
                {/*refreshing: true,*/}
                {/*headState: 0*/}
                {/*});*/}
                {/*setTimeout(() => {*/}

                {/*this.setState({refreshing: false, headState: 1});*/}


                {/*}, 600);*/}
                {/*}}*/}
                {/*>*/}

                <Carousel
                    className="my-carousel"
                    autoplay
                    infinite
                    selectedIndex={1}
                    swipeSpeed={35}
                    beforeChange={(from, to) => {
                    }}
                    afterChange={index => {
                    }}
                >
                    {data.map((i, key) => (

                        <img key={key} src={i.img} onLoad={() => {
                            this.setState({initialHeight: null,})
                        }}
                        />

                    ))}
                </Carousel>
                <Grid data={grid} hasLine={false} activeStyle={false} onClick={(el) => this._gridClick(el)}/>


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
                <Flex className="welfare">
                    <Flex.Item>
                        <img src={require('static/images/home/newUser.png')} alt="" onClick={()=>history.push('/newPer')}/>
                    </Flex.Item>
                    <Flex.Item>

                        <img src={require('static/images/home/newDay.png')} alt="" onClick={()=>history.push('/newDay')}/>
                    </Flex.Item>

                </Flex>


                <div className="skill-info">
                    <div className="skill-head">

                        <div className="name">

                            <img src={require('static/images/skill_title.png')} alt=""/>

                        </div>

                        <div className="timer">


                            <span className="title">活动结束时间</span>
                            <div className="count-info">
                                <Timer
                                    //date={new Date(parseInt(endTime))}
                                    date="2017-11-10T00:00:00+00:00"
                                    days={{plural: 'Days ', singular: 'day '}}
                                    hours=':'
                                    mins=':'
                                    segs=''
                                />
                            </div>


                        </div>

                    </div>

                    <div className="swiper-container skill-active" ref={(el) => this.swiper = el}>

                        <ul className="swiper-wrapper" >

                            {
                                skillData.map((i,key)=>(

                                    <li className="swiper-slide" key={key} onClick={()=>history.push(`/goodsDetail/${i.good_id}`)}>
                                        <div className="img-info">

                                            <img src={i.bigpic} alt=""/>

                                        </div>
                                        <div className="price-info">
                                            <p>￥{i.seckillprice}</p>
                                            <p>￥{i. price}</p>
                                        </div>
                                    </li>
                                ))
                            }
                            <li className="more">

                                <div className="box" onClick={()=>history.push('/seckill')}>
                                    查看更多
                                </div>

                            </li>


                        </ul>
                    </div>
                </div>

                <div className="long-banner">
                    {/*<div className="long-banner" ref={el => this.longImg = el}>*/}
                    <img src={require('static/images/home/longb.png')} alt="" style={{borderRadius: 8, marginTop: 10}}
                         onClick={()=>{
                              let userInfo = localItem('userInfo')
                              if ((typeof userInfo)== 'string' ) {

                                  history.push("/topUp")

                              }else {
                                  let url=window.location.href

                                  url= url.match(/#(\S*)/)[1];

                                  url=url.replace('/','')

                                  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://www.worldwideapp.chinazjtc.com/app/user/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                              }
                          }}
                    />
                </div>

                <div className="item-title">
                    品 / 类 / 中 / 心
                </div>
                <div className="item-center">
                    <ul>
                        <li className="bg-img"
                            onClick={()=>history.push({
                            pathname: `/imported`,

                        })}><img src={require('static/images/home/i_A.png')} alt=""/></li>
                        <li
                            onClick={()=>history.push({
                            pathname: `/itemList/66`,
                            state:{title:'酒水饮料'}

                        })}><img src={require('static/images/home/i_1.png')} alt=""/></li>
                        <li
                            onClick={()=>history.push({
                                pathname: `/itemList/60`,
                                state:{title:'厨卫清洁'}

                            })}
                        ><img src={require('static/images/home/i_2.png')} alt=""/></li>
                        <li
                            onClick={()=>history.push({
                                pathname: `/itemList/24`,
                                state:{title:'母婴用品'}

                            })}
                        ><img src={require('static/images/home/i_3.png')} alt=""/></li>
                        <li
                            onClick={()=>history.push({
                                pathname: `/itemList/60`,
                                state:{title:'家用电器'}

                            })}
                        ><img src={require('static/images/home/i_4.png')} alt=""/></li>
                        <li
                            onClick={()=>history.push({
                                pathname: `/itemList/33`,
                                state:{title:'保健养生'}

                            })}
                        ><img src={require('static/images/home/i_5.png')} alt=""/></li>
                        <li
                            onClick={()=>history.push({
                                pathname: `/itemList/32`,
                                state:{title:'化妆品'}

                            })}
                        ><img src={require('static/images/home/i_7.png')} alt=""/></li>

                    </ul>
                </div>
                <div className="item-title" style={{color: "#9d64f8"}}>
                    商 / 城 / 推 / 荐
                </div>
                <div className="marker-wel-info">
                    <div className="bg-img-info">
                        <img src={require('static/images/pp.png')} alt=""/>
                        <i className="s-icon"></i>
                    </div>
                    <div className="wel-info swiper-container" ref={el => this.shop = el}>
                        <ul className="swiper-wrapper">
                            {
                                dataList && dataList ['推荐'] && dataList['推荐'].centerList[1].secList.map((i,index)=>(
                                    <li className="swiper-slide" key={index} onClick={()=>history.push(`/goodsDetail/${i.goods_id}`)}>
                                        <div className="img-info">
                                            <img src={i.bigpic} alt=""/>
                                        </div>

                                        <div className="txt-info">
                                            <p className="title">
                                                {i.title}
                                            </p>
                                            <p className="price">￥{i.zkprice}</p>
                                        </div>

                                    </li>
                                ))
                            }
                            <li className="more swiper-slide ">

                                <div className="box"
                                     onClick={()=>history.push({
                                    pathname: `/itemList/36`,
                                    state:{title:'商场推荐'}

                                })}>
                                    查看更多
                                </div>

                            </li>

                        </ul>
                    </div>
                </div>
                <div className="item-title" style={{color: "#fb75a4"}}>
                    热 / 销 / 商 / 品
                </div>
                <div className="hot-list">
                    <div className="bg-img-info">
                        <img src={require('static/images/more.png')} alt=""/>
                        <i className="s-icon"></i>
                    </div>

                    {dataList && dataList ['推荐'] && dataList['推荐'].moreList&&<List getScroll={this.getScroll} list={dataList['推荐'].moreList} history={history}/>}
                </div>
                {/*</PullToRefresh>*/}
            </div>);
    }
}
