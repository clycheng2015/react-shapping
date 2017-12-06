/**
 * Created by bear on 2017/9/16.
 */
import React from 'react'
import {Modal, ListView, Checkbox, InputItem, List, Toast, Flex, SwipeAction} from 'antd-mobile'

import {timeOut} from '../../utils/tools'
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
export  default  class CarList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            height: document.documentElement.clientHeight,
            jian:0,
        };
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
        const {owCheckData,osCheckData} = this.props
        let checkData=owCheckData.concat(osCheckData)
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
        const {history,owCheckData,osCheckData} = this.props
        let checkData=owCheckData.concat(osCheckData)
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

    _activeTxt=(activeInfo)=>{

        let tot=this._priceTol();
        let html=''

        if(Number(activeInfo.datalist[0].man)<Number(tot)){
            html = `可享减免${activeInfo.datalist[0].jian}`

        }
        for(let i=0; i < activeInfo.datalist.length; i++){
            if(Number(activeInfo.datalist[i].man)>Number(tot)){
               html = `还差￥${(Number(activeInfo.datalist[i].man)-Number(tot)).toFixed(2)}元可享减${activeInfo.datalist[i].jian}`

            }
        }

        return html

    }

    render() {
        const {match, owCheckData, osCheckData, carCheckAll,osCkeckAllState,owCkeckAllState, carCheck, history,activeInfo} = this.props

        return (
            <div>
                <div style={{height: "1.8rem"}}/>
                {
                    owCheckData.length > 0 &&
                    <div className="mel-owner-info">
                        <div className="mel-owner-check-all">
                            <CheckboxItem className="checkbox" key={1} onChange={() => carCheckAll(owCheckData[0].type)}
                                          activeStyle={{background: "none"}} checked={owCkeckAllState}/>
                            <span className="title">美纶自营</span>
                        </div>
                        {owCheckData.map((data, rowID) => {
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
                                                              onChange={(e) => carCheck(rowData.id,owCheckData[0].type)}
                                                              activeStyle={{background: "none"}}/>
                                            </div>
                                            <div className="center"
                                                 onClick={() => history.push(`/goodsDetail/${rowData.goods_id}`)}><img
                                                src={rowData.goods_smallpic} alt=""/></div>
                                            <div className="right">
                                                <p className='title'>{rowData.goods_title}</p>
                                                <div className="two">
                                                    <span className="price">￥{rowData.goods_price}</span>
                                                    <span className="count"><span className="lose box"
                                                                                  onClick={() => this._countLose(rowData)}>-</span>
                                    <List ><InputItem type="number" error={this.state.hasError} readOnly
                                                      value={rowData.goods_num}/></List>
                                    <span className="add box" onClick={() => this._countAdd(rowData)}>＋</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwipeAction>
                                </div>
                            )
                        })}
                    </div>



                }


                <div style={{height: ".2rem"}}/>

                {
                    osCheckData.length > 0 &&
                    <div className="mel-owner-info">
                        <div className="mel-owner-check-all">
                            <CheckboxItem className="checkbox" key={1} onChange={() => carCheckAll(osCheckData[0].type)}
                                          activeStyle={{background: "none"}} checked={osCkeckAllState}/>
                            <span className="title">美纶国际</span>
                        </div>
                        {osCheckData.map((data, rowID) => {
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
                                                              onChange={(e) => carCheck(rowData.id,osCheckData[0].type)}
                                                              activeStyle={{background: "none"}}/>
                                            </div>
                                            <div className="center"
                                                 onClick={() => history.push(`/goodsDetail/${rowData.goods_id}`)}><img
                                                src={rowData.goods_smallpic} alt=""/></div>
                                            <div className="right">

                                                <p className='title'> <span>海外直邮</span>{rowData.goods_title}阿斯加德；爱上了大家爱上；来得及啊；数量单价啊；类似的骄傲；来得及啊；来得及啊； </p>
                                                <div className="two">
                                                    <span className="price">￥{rowData.goods_price}</span>
                                                    <span className="count"><span className="lose box"
                                                                                  onClick={() => this._countLose(rowData)}>-</span>
                                    <List ><InputItem type="number" error={this.state.hasError} readOnly
                                                      value={rowData.goods_num}/></List>
                                    <span className="add box" onClick={() => this._countAdd(rowData)}>＋</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwipeAction>
                                </div>
                            )
                        })}
                    </div>
                }

                <div style={{height: "2.5rem"}}/>
                <div className={ match.params.state == 'dltocar' ? 'dgobuy' : 'gobuy'}>
                    {
                        activeInfo&&activeInfo.id&&timeOut(activeInfo.endtime)&&
                        <div className="active-msg-info">
                            活动：{this._activeTxt(activeInfo)}
                        </div>
                    }

                    <Flex>
                        <Flex.Item className="tot">
                            <p className='all'>合计:￥{ this._priceTol() - this.state.jian}</p>
                            <p className='jian'> 总额：￥{ this._priceTol()} 立减：{this.state.jian}</p>
                        </Flex.Item>

                        <Flex.Item><span className="buy-btn" onClick={() => this._gotoBuy()}>去结算</span></Flex.Item>
                    </Flex>
                </div>
            </div>
        );
    }
}