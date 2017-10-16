/**
 * Created by bear on 2017/9/11.
 */

import React, {PropTypes}from 'react'
import {Link} from 'react-router-dom'
import {RefreshControl, ListView, Flex, WhiteSpace, Icon} from 'antd-mobile'
import Banner from  './banner'

let pageIndex = 0
class List extends React.Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {
            dataSource,
            isLoading: true,
            // refreshing: true,
            height: document.documentElement.clientHeight,
            nowFetching: false,
            // hasMore:true
        }
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    componentWillReceiveProps(nextProps,ns) {
        if (ns.isFetching !== this.props.isFetching) {
            this.setState({
                refreshing:true
            });
        }
    }

    componentDidMount() {

        console.log("did加载一次")

        const {isFetching} = this.props
        //
        this.setState({

            isLoading: false

        })

        // this.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
        //     this.tsPageY = e.touches[0].pageY
        // })
        // this.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
        //     this.tmPageY = e.touches[0].pageY
        //     if (this.tmPageY > this.tsPageY && this.st <= 0 && document.body.scrollTop > 0) {
        //         this.domScroller.options.preventDefaultOnTouchMove = false
        //     } else {
        //         this.domScroller.options.preventDefaultOnTouchMove = undefined
        //     }
        // })
    }

    componentWillUnmount() {

        // this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts)
        // this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm)

    }

    onScroll = (e) => {
        this.st = e.scroller.getValues().top
        this.domScroller = e
    }

    onRefresh = () => {
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true})
        } else {
            this.manuallyRefresh = false
        }

        // simulate initial Ajax
        setTimeout(() => {
            // this.rData = genData()
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([]),
                refreshing: false,
            })
        }, 200)
    }
    onEndReached = (event) => {
        console.log(this.state.isLoading)
        if (this.state.isLoading && !this.state.hasMore) {

            return;

        }
        console.log('reach end', event);

        this.setState({isLoading: true});

        setTimeout(() => {
            console.log("正在加载")
            ++pageIndex;
            console.log(pageIndex)
            this.setState({
                // dataSource: this.state.dataSource.cloneWithRows([]),
                isLoading: false,

            });
        }, 200);
    }


    render() {

        const {tab, isFetching, pagenum, pagesize, getHomeList, list, cid, history} = this.props

        let nowFetching = isFetching

        let npage = pagenum


        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>

                    <Banner history={history} list={rowData.bannerList} tab="推荐"/>

                    <div>
                        {
                            rowData.centerList.map((i, key) => {
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
                                                    <span className="title"> 品牌推荐</span>
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
                                                                            <p>{i.price}<span
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
                                <span className="title"> 热门商品</span>
                                <Icon type="right" className="icon-color"/>
                            </Link>
                        </div>

                        <div className="flex-container">
                            <Flex wrap="wrap">

                                {
                                    rowData.moreList.map((i, key) => (
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
                            </Flex>
                        </div>

                    </div>


                </div>
            )

        }
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRows([list])}
                // renderHeader={() => <span>Pull to refresh</span>}
                renderFooter={() => (
                    <div style={{height: "2rem", paddingBottom: "2rem", textAlign: 'center'}}>
                        {this.state.isLoading ? '加载更多' : '暂无更多商品'}
                    </div>)}
                renderRow={row}
                initialListSize={40}
                pageSize={40}
                style={{
                    height: this.state.height,
                    border: '1px solid #ddd',
                    // padding: '0.1rem 0',
                    // overflow:"hidden"

                }}
                scrollerOptions={{scrollbars: true}}
                refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />}
                onScroll={this.onScroll}
                scrollRenderAheadDistance={2000}
                scrollEventThrottle={200}
                onEndReachedThreshold={0}
                onEndReached={(event) => {

                    if (!event || this.state.isLoading ) {

                        console.log(this.state.isLoading )

                        return;
                    }

                    this.setState({isLoading: true});

                    getHomeList(tab, {pagesize: pagesize, pagenum: ++npage, cid: cid})

                }}
            />
        )
    }
}

export  default  List