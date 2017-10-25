/**
 * Created by bear on 2017/9/16.
 */
import React from 'react'
import {Modal, RefreshControl, ListView, Checkbox, InputItem, List, Toast, Flex, SwipeAction} from 'antd-mobile'
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
export  default  class CarList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            refreshing: true,
            height: document.documentElement.clientHeight,
            checked: false,
            inputValue: 1,
            checkAll: true,
            totCount: 0,
            newList: [],
            state: true,
            list: []
        };
        this.checked = false;
    }

    _newList = (list) => {

        let curList = []
        list.forEach((i, index) => {
            curList.push({
                list: i,
                checked: true
            })


        })
        this.setState({
            list: curList
        })
    }

    _numChangeList = (list, rowID) => {

        let curList = []
        curList[rowID].list = list
        this.setState({

            newList: curList
        })


    }
    _del = (id) => {

        const {fetchDelCar} = this.props

        fetchDelCar({
            id: id
        })

    }


    componentDidMount() {
        const {list} = this.props
        if (list && list.length > 0) {
            this._newList(list)
        }
        this.setState({
            refreshing: true
        })
        // handle https://github.com/ant-design/ant-design-mobile/issues/1588

    }

    componentWillUnmount() {
    }

    onScroll = (e) => {
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
                refreshing: false,
                showFinishTxt: true,
            });

            if (this.domScroller) {
                this.domScroller.scroller.options.animationDuration = 500;
            }
        }, 200);
    };
    onChange = (rowData, rowID, e) => {


        // // console.log('为' + rowID + "的选中状态改变，改变为:" + e.target.checked);
        // let curList = this.state.newList;
        // curList[rowID].checked = e.target.checked
        // curList[rowID].list = list

        let newList = this.state.list
        let allState, checkArr = [];
        newList.forEach((i, index) => {
            if (index == rowID) {
                i.checked = !i.checked
                if (!i.checked) {
                    allState = false
                }

            }

        })
        newList.forEach((i) => {

            checkArr.push(i.checked)

        })
        let newArr = Array.from(new Set(checkArr))
        let isAllEqual = (newArr.length === 1 && newArr[0] == true);
        this.setState({
            list: newList,
            checkAll: isAllEqual
        })
    }
    _checkAll = () => {
        let newList = this.state.list

        if (this.state.checkAll == true) {
            newList.forEach((i) => {

                i.checked = false
            })

        } else {

            newList.forEach((i) => {

                i.checked = true
            })

        }
        this.setState({
            list: newList,
            checkAll: !this.state.checkAll
        })

        // console.log(newList)

    }

    scrollingComplete = () => {
        if (this.st >= 0) {
            this.setState({showFinishTxt: false});
        }
    }

    renderCustomIcon() {
        return [
            <div key="0" className="am-refresh-control-pull">
                {/*<span>{this.state.showFinishTxt ? '刷新完毕' : '下拉可以刷新'}</span>*/}
            </div>,
            <div key="1" className="am-refresh-control-release">
                {/*<span>松开立即刷新</span>*/}
            </div>,
        ];
    }

    /***
     * 删除或者修改数量时 修改list 保留check
     * @private
     */
    _newdelornumlist = (list) => {

        let newList = []

        if (list.length <=this.state.list.length) {
            list.forEach(i => {
                this.state.list.forEach(j => {

                    if (i.goods_id === j.list.goods_id) {

                        newList.push({
                            list: i,
                            checked: j.checked
                        })
                    }
                })
            })
            this.setState({

                list: newList
            })
        }else {


            this._newList(list)

        }
    }
    componentWillReceiveProps(nextProps) {
        const {list} = nextProps

        console.log(list)
        if (list != this.props.list) {

            console.log("进入了！！！")
            if (list && list.length > 0) {

                this._newdelornumlist(list)

            }

        }
    }


    render() {

        const {fetchUpdateCarNum, history, match} = this.props

        let curList = this.state.list

        let arr = [];
        curList.forEach(i => {

            if (i.checked) {
                arr.push(i.list)
            }
        })

        let sumArr = [];
        arr.forEach(i => {

            sumArr.push(Number(i.goods_num) * Number(i.goods_price))

        })
        let sum = 0

        for (let i = 0; i < sumArr.length; i++) {
            sum += sumArr[i]
        }

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#f7f6f6',
                    height: 10,
                }}
            />
        );
        const row = (data, rowID) => {


            let rowData = data.list

            return (
                <div key={rowID}>
                    <SwipeAction
                        autoClose
                        right={[
                            {
                                text: '取消',
                                onPress: () => console.log('cancel'),
                                style: {backgroundColor: '#ddd', color: 'white'},
                            },
                            {
                                text: '删除',
                                onPress: () => this._del(rowData.id),
                                style: {backgroundColor: '#F4333C', color: 'white'},
                            },
                        ]}

                    >
                        <div className="item">
                            <div className="left">

                                <CheckboxItem className="checkbox" key={rowID} value={rowID}


                                              checked={data.checked}

                                              onChange={(e) => this.onChange(rowData, rowID, e)}


                                              activeStyle={{background: "none"}}/>
                            </div>
                            <div className="center">

                                <img src={rowData.goods_smallpic} alt=""/>

                            </div>

                            <div className="right">

                                <p className='title'>{rowData.goods_title}</p>
                                <div className="two">
                                    <span className="price">￥{rowData.goods_price}</span>

                                    <span className="count">
                                           <span className="lose box" onClick={() => {

                                               if (rowData.goods_num < 2) {

                                                   Toast.info("商品数量不能少于1！", 1)
                                                   return false
                                               }
                                               rowData.goods_num--
                                               fetchUpdateCarNum({
                                                   id: rowData.id,
                                                   goods_num: rowData.goods_num
                                               })


                                           }}>-</span>
                                    <List >
                                        <InputItem
                                            type="number"
                                            error={this.state.hasError}

                                            // onChange={this._onChange}
                                            value={rowData.goods_num}
                                        />
                                    </List>
                                    <span className="add box" onClick={() => {

                                        rowData.goods_num++
                                        fetchUpdateCarNum({
                                            id: rowData.id,
                                            goods_num: rowData.goods_num
                                        })

                                    }}>＋</span>
                                    </span>

                                </div>


                            </div>
                        </div>
                    </SwipeAction>

                </div>
            );
        };

        return (
            <div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
                    // renderHeader={() => <span>Pull to refresh</span>}
                    renderFooter={() => (<div style={{padding: 30, paddingBottom: 80, textAlign: 'center'}}>
                        {this.state.isLoading ? '加载中' : '暂无更多'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    initialListSize={5}
                    pageSize={5}
                     useBodyScroll
                     style={{
                      paddingTop:"1.7rem",
                         zIndex:"100"
                     }}
                     onScroll={this.onScroll}
                    scrollRenderAheadDistance={200}
                    scrollEventThrottle={20}
                    // onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />


                <div className={ match.params.state == 'dltocar' ? 'dgobuy' : 'gobuy'}
                     style={{
                         zIndex:"1000"
                     }}
                >

                    <div>
                        <div className="check-all-info">
                            <CheckboxItem className="checkbox" key={1} onChange={() => this._checkAll()}
                                          activeStyle={{background: "none"}}
                                          checked={this.state.checkAll}
                            >全选</CheckboxItem>

                        </div>
                        <div className="tot">

                            合计：￥{ Number(sum).toFixed(2)}
                        </div>
                        <div className="buy-btn" onClick={() => {

                            if (Number(sum).toFixed(2) == 0) {

                                Toast.info("您还没有选择商品！", 1)

                            } else {

                                history.push({
                                    pathname: "/orderDetail",

                                    state: {data: arr}
                                })
                            }


                        }}>
                            去结算
                            {/*<span>(0)</span>*/}
                        </div>
                    </div>


                </div>

            </div>
        );
    }


}