/**
 * Created by bear on 2017/9/11.
 */

import React, {PropTypes}from 'react'
import {Link} from 'react-router-dom'
import {RefreshControl, ListView, Flex, WhiteSpace, Icon} from 'antd-mobile'
import Banner from  './banner'

import {localItem} from '../../utils/cookie'

import Scroller from '../../utils/Scroller/src/Scroller';
let data = [

    'aaaa',
    'aaaa',
    'aaaa',
    'aaaa',
    'aaaa',
    'aaaa',
    'aaaa',
    'aaaa',
    'aaaa',
    'aaaa',


]
const ajax = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 500)
    })
}

class List extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            hasMore: false
        };

        this.index = 1;

        this.fetchData = this.fetchData.bind(this);

        this.pullRefreshAction = this.pullRefreshAction.bind(this);
        this.loadMoreAction = this.loadMoreAction.bind(this);

        this.getContent = this.getContent.bind(this);
    }

    componentDidMount() {
        this.fetchData('refresh');

    }

    /**
     * 获取列表内容
     * */
    getContent() {
        this.index = 1;
        return this.state.lists.map(
            list => <li onClick={() => {
                this.scroller.simulatePullRefresh()
            }} key={`list${this.index}`}
                        className="list-view-item">{`${this.index++}. ${list}`}</li>
        )
    }

    /**
     * 获取数据
     * */
    fetchData(type, resolve, reject) {
        ajax({
            url: 'component.list.view'
        }).then(data => {
            if (resolve) {
                resolve();
            }

            const lists = data

            this.setState({
                lists: type === 'refresh' ? lists : this.state.lists.concat(lists)
            });
        }).catch(() => {
            if (reject) {
                reject();
            }
        });
    }

    /**
     * 下拉刷新动作
     * */
    pullRefreshAction(resolve, reject) {

        const {tab, pagenum, pagesize, getHomeList, cid} = this.props


        getHomeList(tab, {pagesize: 1, pagenum:pagenum , cid: cid},resolve, reject)
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction(resolve, reject) {




        if (!this.props.list.hasMore && !this.props.list.isFetching) {

            const {tab, isFetching, pagenum, pagesize, getHomeList, list, cid, history} = this.props

            let npage = pagenum

            getHomeList(tab, {pagesize: pagesize, pagenum: ++npage, cid: cid})


        }
        else {

            console.log('没有更多了！！')
        }


    }

    componentWillReceiveProps(np) {
        const {list, tab} = np
        if (np.tab != this.props.tab) {

            this.scroller.scrollTo(0, 0)
        }

    }

    render() {

        const {list, cid} = this.props

        const {tab, isFetching, history, pagenum, pagesize, getHomeList} = this.props

        // console.log(list.moreList)


        Array.prototype.remDub = Array.prototype.remDub || function () {
                //return Array.from(new Set(this));
                return [...new Set(this)];
            };

        let nowFetching = isFetching
        // console.log(list)
        const row = () => {
            return (
                <div >
                    {
                        <div>
                            {
                                tab == '推荐' ?
                                    <div>
                                        <img src={require("static/image/open3.png")} alt="" style={{width: '100%'}}

                                              onClick={() => history.push("/active")}

                                        />
                                        <div className="charge"
                                             style={{
                                                 marginTop:"-.07rem"
                                             }}


                                             onClick={()=>{
                                                 let userInfo = localItem('userInfo')
                                                 console.log(typeof userInfo)
                                                 if ((typeof userInfo)== 'string' ) {

                                                     history.push("/topUp")

                                                 }else {

                                                     // history.push("/auth")



                                                     let url=window.location.href

                                                     url= url.match(/#(\S*)/)[1];

                                                     url=url.replace('/','')

                                                     window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://www.worldwideapp.chinazjtc.com/app/user/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                                                 }


                                             }}


                                        >


                                            <img src={require('static/image/charge1.png')} alt="" style={{width:"100%"}}/>



                                        </div>
                                    </div>


                                    :

                                    <Banner history={history} list={list.bannerList} tab="推荐"/>
                            }
                            <div>
                                {
                                    tab == '推荐' ?

                                        list.centerList.map((i, key) => {
                                            if (i.type == 'CATEGORY') {

                                                return (
                                                    <div key={key}
                                                         className="fx-info"
                                                         style={{

                                                             background: `url(${require('static/image/map3.png')}) no-repeat`,
                                                             backgroundSize: "100% 85%",
                                                             marginTop: "-.1rem",
                                                             // width
                                                         }}
                                                    >

                                                        <div style={{
                                                            height: '1rem',
                                                            // lineHeight: '1rem',
                                                            // color: '#888',
                                                            // fontSize: '0.36rem',
                                                            textAlign: 'center'
                                                        }}>
                                                            <Link to={{

                                                                pathname: `/moreList/${i.id ? i.id : 'a'}`,
                                                                state: {
                                                                    title: "品牌推荐",
                                                                    type: i.type,
                                                                    typeid: cid

                                                                }
                                                            }
                                                            }>
                                                                <span className="fx-title"> 热门分类</span>
                                                                {/*<Icon type="right" className="icon-color"/>*/}
                                                            </Link>
                                                        </div>
                                                        <div className="flex-container">

                                                            <Flex
                                                            style={

                                                                {
                                                                    width:'95%',
                                                                    margin:"0 auto",
                                                                    textAlign:"center"
                                                                }
                                                            }
                                                            >
                                                                {
                                                                    i.secList.map((i, key) =>
                                                                        (
                                                                            <Flex.Item key={key} className="fx-box">

                                                                                    <Link
                                                                                        to={{
                                                                                            pathname: `/itemList/${tab == '推荐' ? i.good_id : i.id}`,
                                                                                            state: {title: i.stitle},
                                                                                        }}
                                                                                    >

                                                                                        <div className="img-info">
                                                                                            <img src={i.flashpic} alt=""/>
                                                                                        </div>
                                                                                        <div className="txt">

                                                                                            <p>{i.stitle}</p>

                                                                                        </div>
                                                                                    </Link>

                                                                            </Flex.Item>
                                                                        )
                                                                    )
                                                                }
                                                            </Flex>

                                                        </div>

                                                    </div>
                                                )
                                            }
                                            if (i.type == 'GOODS') {

                                                return (
                                                    <div key={key}
                                                         style={{

                                                             background: `url(${require('static/image/map2.png')}) no-repeat`,
                                                             backgroundSize: '100%',
                                                         }}
                                                    >

                                                        <div style={{
                                                            height: '2rem',
                                                            lineHeight: '2rem',
                                                            // color: '#888',
                                                            // fontSize: '0.36rem',
                                                            textAlign: 'center'
                                                        }}>

                                                            <Link
                                                                to={{
                                                                    pathname: `/moreList/${i.id ? i.id : 'a'}`,
                                                                    state: {title: i.name, type: i.type, typeid: cid}
                                                                }}
                                                            >
                                                                {/*<span className="title"> {i.name}</span>*/}
                                                                {/*<Icon type="right" className="icon-color"/>*/}

                                                            </Link>
                                                        </div>
                                                        <div className="flex-container">

                                                            <div className="slider">
                                                                {
                                                                    i.secList.map((i, key) => (
                                                                            <div key={key} className="per">
                                                                                <Link
                                                                                    to={{
                                                                                        pathname: `/goodsDetail/${i.goods_id}`,
                                                                                    }}
                                                                                >
                                                                                    <div className="img-info">

                                                                                        <img src={i.bigpic} alt=""/>
                                                                                    </div>
                                                                                    <div className="pretxt">

                                                                                        <p className="mall-title">{i.title}</p>
                                                                                        <p style={{
                                                                                            color: "#e85c34",
                                                                                            paddingTop: ".1rem"
                                                                                        }}>￥{i.zkprice}  </p>

                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })


                                        :

                                        list.centerList.map((i, key) => {
                                            if (i.type == 'CATEGORY') {

                                                return (
                                                    <div key={key}
                                                         style={{

                                                             backgroundColor: 'white',
                                                             // width
                                                         }}
                                                    >
                                                        <div style={{
                                                            height: '1rem',
                                                            lineHeight: '1rem',
                                                            // color: '#888',
                                                            // fontSize: '0.36rem',
                                                            textAlign: 'center'
                                                        }}>
                                                            <Link to={{

                                                                pathname: `/moreList/${i.id ? i.id : 'a'}`,
                                                                state: {
                                                                    title: "品牌推荐",
                                                                    type: i.type,
                                                                    typeid: cid

                                                                }
                                                            }
                                                            }>
                                                                <span className="title"> 热门分类</span>
                                                                <Icon type="right" className="icon-color"/>
                                                            </Link>
                                                        </div>
                                                        <div className="flex-container">
                                                            <Flex wrap="wrap">
                                                                {
                                                                    i.secList.map((i, key) =>
                                                                        (
                                                                            <div key={key} className="inline">
                                                                                <Link
                                                                                    to={{
                                                                                        pathname: `/itemList/${tab == '推荐' ? i.good_id : i.id}`,
                                                                                        state: {title: i.stitle},
                                                                                    }}
                                                                                >
                                                                                    <div className="txt">

                                                                                        <p>{i.stitle}</p>
                                                                                        <p>{i.price ? i.price : '1.00'}<span
                                                                                            style={{
                                                                                                fontSize: '.25rem',
                                                                                                color: '#606060'
                                                                                            }}>元起</span></p>

                                                                                    </div>
                                                                                    <img src={i.flashpic} alt=""/>
                                                                                </Link>
                                                                            </div>
                                                                        )
                                                                    )
                                                                }
                                                            </Flex>
                                                        </div>

                                                    </div>
                                                )
                                            }
                                            if (i.type == 'GOODS') {

                                                return (
                                                    <div key={key}
                                                         style={{

                                                             backgroundColor: 'white',
                                                             marginTop:".16rem"
                                                         }}
                                                    >

                                                        <div style={{
                                                            height: '1rem',
                                                            lineHeight: '1rem',
                                                            // color: '#888',
                                                            // fontSize: '0.36rem',
                                                            textAlign: 'center'
                                                        }}>

                                                            <Link
                                                                to={{
                                                                    pathname: `/moreList/${i.id ? i.id : 'a'}`,
                                                                    state: {title: i.name, type: i.type, typeid: cid}
                                                                }}
                                                            >
                                                                <span className="title"> {i.name}</span>
                                                                <Icon type="right" className="icon-color"/>

                                                            </Link>


                                                        </div>

                                                        <div className="flex-container">
                                                            <Flex wrap="wrap">
                                                                {
                                                                    i.secList.map((i, key) => (
                                                                            <div key={key} className="per">
                                                                                <Link
                                                                                    to={{
                                                                                        pathname: `/goodsDetail/${i.goods_id}`,
                                                                                    }}
                                                                                >
                                                                                    <div className="img-info">

                                                                                        <img src={i.bigpic} alt=""/>
                                                                                    </div>
                                                                                    <div className="pretxt">

                                                                                        <p className="mall-title">{i.title}</p>
                                                                                        <p style={{
                                                                                            color: "#e85c34",
                                                                                            paddingTop: ".1rem"
                                                                                        }}>￥{i.zkprice}  </p>

                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                        )
                                                                    )
                                                                }
                                                            </Flex>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                }
                            </div>


                            <div style={{backgroundColor: 'white',}}>
                                <div style={{height: '1rem', lineHeight: '1rem', textAlign: 'center'}}>
                                    <Link to={{
                                        pathname: `/moreList/a`,
                                        //     pathname: `/moreList/${i.id ? i.id : 'a'}`,
                                        state: {title: "热门商品", type: 'GOODS', typeid: cid}
                                    }}
                                    >
                                        <span className="title"> 热销商品</span>
                                        <Icon type="right" className="icon-color"/>
                                    </Link>
                                </div>

                                <div className="flex-container" style={{paddingBottom: "1.5rem"}}>
                                    <Flex wrap="wrap">

                                        {
                                            list.moreList.map((i, key) => (
                                                <div key={key} className="per">
                                                    <Link
                                                        to={{
                                                            pathname: `/goodsDetail/${i.goods_id ? i.goods_id : i.id}`,

                                                        }}
                                                    >
                                                        <div className="img-info">

                                                            <img src={i.bigpic} alt=""/>
                                                        </div>
                                                        <div className="pretxt">

                                                            <p className="mall-title">{i.title}</p>
                                                            <p style={{color: "#e85c34", paddingTop: ".1rem"}}>
                                                                ￥{i.zkprice}  </p>

                                                        </div>
                                                    </Link>
                                                </div>

                                            ))
                                        }

                                        {list.hasMore ?
                                            <div style={{
                                                width: "100%",
                                                height: "1rem",
                                                textAlign: "center",
                                                marginBottom: "1rem"
                                            }}>
                                                没有更多了</div> :
                                            <div style={{
                                                width: "100%",
                                                height: "1rem",
                                                textAlign: "center",
                                                marginBottom: "1rem"
                                            }}>
                                                加载更多</div>    }
                                    </Flex>
                                </div>

                            </div>


                        </div>
                    }
                </div>
            )

        }


        return (
            <Scroller

                ref={ref => {
                    this.scroller = ref
                }}
                // usePullRefresh
                // pullRefreshAction={this.pullRefreshAction}
                useLoadMore
                loadMoreAction={this.loadMoreAction}
                click={true}
            >
                <div
                    style={
                        {
                            marginTop: ".8rem",
                            paddingBottom: "1rem",
                        }
                    }
                >
                    {row()}

                </div>
            </Scroller>

        )


    }
}

export  default  List