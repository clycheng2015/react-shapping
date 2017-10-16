/**
 * Created by bear on 2017/9/16.
 */
import React from 'react'
import {Modal, RefreshControl, ListView} from 'antd-mobile'

const alert = Modal.alert;
export  default  class OrderList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            height: document.documentElement.clientHeight,
        };
    }

    componentDidMount() {
        this.setState({
            refreshing: true
        })
        // handle https://github.com/ant-design/ant-design-mobile/issues/1588
        this.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
            this.tsPageY = e.touches[0].pageY;
        });
        this.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
            this.tmPageY = e.touches[0].pageY;
            if (this.tmPageY > this.tsPageY && this.st <= 0 && document.body.scrollTop > 0) {
                console.log('start pull to refresh');
                this.domScroller.options.preventDefaultOnTouchMove = false;
            } else {
                this.domScroller.options.preventDefaultOnTouchMove = undefined;
            }
        });
    }

    componentWillUnmount() {
        this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
        this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
    }

    onScroll = (e) => {
        this.st = e.scroller.getValues().top;
        this.domScroller = e;
    };

    onRefresh = () => {
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
        } else {
            this.manuallyRefresh = false;
        }

        setTimeout(() => {

            this.setState({
                // dataSource: this.state.dataSource.cloneWithRows(genData()),
                refreshing: false,
                showFinishTxt: true,
            });
            //     }
            //
            // })
            if (this.domScroller) {
                this.domScroller.scroller.options.animationDuration = 500;
            }
        }, 200);
    };

    // onEndReached = (event) => {
    //     if (this.state.isLoading && !this.state.hasMore) {
    //         return;
    //     }
    //     console.log('reach end', event);
    //     this.setState({isLoading: true});
    //     setTimeout(() => {
    //         this.rData = [...this.rData, ...genData(++pageIndex)];
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //             isLoading: false,
    //         });
    //     }, 1000);
    // };

    scrollingComplete = () => {
        if (this.st >= 0) {
            this.setState({showFinishTxt: false});
        }
    }

    renderCustomIcon() {
        return [
            <div key="0" className="am-refresh-control-pull">
                <span>{this.state.showFinishTxt ? '刷新完毕' : '下拉可以刷新'}</span>
            </div>,
            <div key="1" className="am-refresh-control-release">
                <span>松开立即刷新</span>
            </div>,
        ];
    }

    _delOrder = (id) => {

        const {uid, fetchDelOrder} = this.props

        fetchDelOrder({

            uid: uid,
            id: id
        })

    }

    _comfirmOrder=(oid)=>{
        //传uid  用户id  oid 订单id
        const{uid,fetchComfirm}=this.props

        let data={

            uid:uid,
            oid:oid
        }

        fetchComfirm(data)
    }


    _sum = (p) => {

        const {list, history, savePayOrder, postageData} = this.props

        let sum = 0
        if (postageData && postageData.id) {
            if (Number(p) > Number(postageData.free)) {

                return sum = p

            } else {


                // sum = Number(p) + Number(postageData.value)
                sum = Number(p)

                return sum
            }
        }


    }

    render() {
        //
        // console.log("渲染一次")
        const {list, history, savePayOrder, postageData} = this.props
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#f3f3f1',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );


        const row = (rowData, sectionID, rowID) => {
            // console.log(rowData)
            return (
                <div key={rowID}>

                    {
                        rowData.goodsitems ?

                            rowData.goodsitems.map((i, key) => (

                                < div className="box" key={key}>

                                    <div className="odd-info">
                                        <span className="odd">订单号：{rowData.ordernum}</span>
                                        <span className="icon"><span>

                                            {rowData.ispickup=='1'?'自提':''}
                                            {rowData.ispickup=='0'?'邮寄':''}



                                        </span></span>
                                        <span className="icon"><span>

                                            {rowData.ordertype=="GOODS"?'商品':''}
                                            {rowData.ordertype=="SECKILL"?'秒杀':''}
                                            {rowData.ordertype=="DISCOUNT"?'特价':''}


                                        </span></span>

                                        {
                                            rowData.state == 1 ?
                                                <span className="state">未支付</span> : ''
                                        }
                                        {
                                            rowData.state == 2  ?
                                                <span className="state">已支付</span> : ''
                                        }
                                        {
                                            rowData.state == 3 ?
                                                <span className="state">已发货</span> : ''
                                        }
                                        {
                                            rowData.state == 4 ?
                                                <span className="state">已收货</span> : ''
                                        }

                                        {
                                            rowData.state == 5 ?
                                                <span className="state">申请退款</span> : ''
                                        }
                                        {
                                            rowData.state == 6 ?
                                                <span className="state">退款成功</span> : ''
                                        }

                                    </div>
                                    < div className="top"
                                          onClick={() => {

                                              if (rowData.state == 1) {
                                                  history.push({
                                                      pathname: `/yesOrder/${this._sum(Number(rowData.money)).toFixed(2)}`,
                                                      state: {orderId: rowData.id}
                                                  })


                                              }

                                          } }

                                    >
                                        <div className="img">
                                            <img src={i.goods_smallpic} alt=""/>
                                        </div>
                                        <div className="title">

                                            <p className="name">{i.goods_title}</p>
                                            <p className="price">
                                                商品属性：无
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bottom">

                                        {
                                            rowData.state == 1 ?


                                                <div className="btn">

                                                    <span
                                                        className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money)).toFixed(2)}</span>&nbsp;
                                                        元</span>
                                                    <span className="cancel"
                                                          onClick={() => this._delOrder(rowData.id) }

                                                    >删除订单</span>
                                                    <span className="pay"

                                                          onClick={() => {
                                                              history.push({

                                                                  pathname: "/pay",
                                                                  state: {

                                                                      count: this._sum(Number(rowData.money)).toFixed(2)

                                                                  }
                                                              });
                                                              savePayOrder({
                                                                  id: rowData.id,
                                                                  ordernum: rowData.ordernum

                                                              })

                                                          }

                                                          }

                                                    >去付款</span>

                                                </div>

                                                : ''
                                        }
                                        {
                                            rowData.state == 2 ?

                                                <div className="btn">
                                                    <span
                                                        className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money)).toFixed(2)}</span>&nbsp;
                                                        元</span>


                                                    <a href="tel:4009921819"
                                                       style={{
                                                           textDecoration: "none"

                                                       }}
                                                    > <span className="cancel">联系客服</span></a>
                                                    <span className="cancel"

                                                        onClick={()=>{

                                                            history.push(`/remark/${rowData.id}`)

                                                        }}

                                                    >退款</span>


                                                </div>

                                                : ''
                                        }
                                        {
                                            rowData.state == 3 ?


                                                <div className="btn">
                                                    <span
                                                        className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money)).toFixed(2)}</span>&nbsp;
                                                        元</span>

                                                    <span className="cancel">联系客服</span>
                                                    <span className="cancel"

                                                    onClick={()=>this._comfirmOrder(rowData.id)}
                                                    >确认收货</span>

                                                </div>

                                                : ''
                                        }
                                        {
                                            rowData.state == 5 ?


                                                <div className="btn">
                                                    <span
                                                        className="countinfo">总额: ￥<span>{this._sum(Number(rowData.money)).toFixed(2)}</span>&nbsp;
                                                        元</span>
                                                    <span className="cancel">联系客服</span>
                                                </div>

                                                : ''
                                        }


                                    </div>


                                </div>

                            ))

                            : ''
                    }

                </div>
            );
        };
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRows(list)}
                // renderHeader={() => <span>Pull to refresh</span>}
                renderFooter={() => (<div style={{padding: 30, paddingBottom: 100, textAlign: 'center'}}>
                    {this.state.isLoading ? '加载中' : '暂无无更多订单'}
                </div>)}
                renderRow={row}
                renderSeparator={separator}
                initialListSize={5}
                pageSize={5}
                style={{
                    height: this.state.height,
                    borderTop: '1px solid #ddd',
                    // margin: '5px 0',
                    paddingBottom: "2rem",
                    paddingTop: ".8rem"
                }}
                scrollerOptions={{scrollbars: true, scrollingComplete: this.scrollingComplete}}
                refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    icon={this.renderCustomIcon()}
                />}
                onScroll={this.onScroll}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                // onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }

    //
    // shouldComponentUpdate(np, ns) {
    //
    //
    //     return (!np.list != this.props.list)
    //
    //
    // }
}