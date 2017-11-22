/**
 * Created by bear on 2017/9/16.
 */
import React from 'react'
import {Modal, ListView, Checkbox, InputItem, List, Toast, Flex, SwipeAction} from 'antd-mobile'
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
            height: document.documentElement.clientHeight,
        };
    }


    componentDidMount() {

    }


    /***
     * 数量增加
     * @private
     */

    _countAdd = (row) => {
        const {fetchUpdateCarNum} = this.props
        let num = row.goods_num
        fetchUpdateCarNum({
            id: row.id,
            goods_num: ++num
        })
    }

    /***
     * 数量减少
     * @param row
     * @private
     */
    _countLose = (row) => {
        const {fetchUpdateCarNum} = this.props
        let num = row.goods_num
        if (row.goods_num < 2) {
            Toast.info("亲,商品数量不能少于1哟", 1)
            return false
        }
        fetchUpdateCarNum({
            id: row.id,
            goods_num: --num
        })
    }

    /***
     * 删除购物车
     * @param id
     * @private
     */
    _del = (id) => {
        const {fetchDelCar} = this.props
        fetchDelCar({id: id})
    }

    /***
     * 计算总量
     * @private
     */
    _priceTol = () => {
        const {checkData} = this.props
        let checkedArr = []
        checkData.map(i => {
            if (i.checked) {
                checkedArr.push(i.list)
            }
        })
        let sumArr = checkedArr.map(i => (Number(i.goods_num) * Number(i.goods_price)));
        let sum = 0
        sumArr.map(i => (sum += i))
        return Number(sum).toFixed(2)


    }

    /***
     *  去结算
     * @returns {XML}
     */

    _gotoBuy = () => {
        const {history, checkData} = this.props

        let checkedArr = []
        checkData.map(i => {
            if (i.checked) {
                checkedArr.push(i.list)
            }
        })
        if (checkedArr.length === 0) {
            Toast.info("亲，您还没有选择商品哟", 1);
        }
        else {

            history.push({
                pathname: "/orderDetail",
                state: {data: checkedArr, state: "car"}
            })
        }


    }

    render() {
        const {match, checkData, ckeckAllState, carCheckAll, carCheck,history} = this.props
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#f7f6f6',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (data, sectionID, rowID) => {
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
                                <CheckboxItem className="checkbox" key={rowID} value={rowID} checked={data.checked} onChange={(e) => carCheck(rowData.id)} activeStyle={{background: "none"}}/>
                            </div>
                            <div className="center" onClick={()=>history.push(`/goodsDetail/${rowData.goods_id}`)}><img src={rowData.goods_smallpic} alt=""/></div>
                            <div className="right">
                                <p className='title'>{rowData.goods_title}</p>
                                <div className="two">
                                    <span className="price">￥{rowData.goods_price}</span>
                                    <span className="count"><span className="lose box" onClick={() => this._countLose(rowData)}>-</span>
                                    <List ><InputItem type="number" error={this.state.hasError} readOnly value={rowData.goods_num}/></List>
                                    <span className="add box" onClick={() => this._countAdd(rowData)}>＋</span></span>
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
                    dataSource={this.state.dataSource.cloneWithRows(checkData)}
                    renderFooter={() => (<div style={{padding: 30, paddingBottom: 200, textAlign: 'center'}}>{this.state.isLoading ? '加载中' : '暂无更多'}</div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    initialListSize={5}
                    pageSize={5}
                    style={{
                        height: this.state.height,
                        paddingTop: "1.7rem",
                    }}
                    scrollRenderAheadDistance={200}
                    scrollEventThrottle={20}
                    onEndReachedThreshold={10}
                />
                <div className={ match.params.state == 'dltocar' ? 'dgobuy' : 'gobuy'}>
                    <Flex>
                        <Flex.Item><CheckboxItem className="checkbox" key={1} onChange={() => carCheckAll()} activeStyle={{background: "none"}} checked={ckeckAllState}>全选</CheckboxItem></Flex.Item>
                        <Flex.Item className="tot">总计:￥{ this._priceTol()}</Flex.Item>
                        <Flex.Item className="buy-btn" onClick={() => this._gotoBuy()}>去结算</Flex.Item>
                    </Flex>


                </div>

            </div>
        );
    }
}