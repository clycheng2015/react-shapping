/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Flex, Icon} from 'antd-mobile'
import * as itemList from 'actions/itemList'
import GoodsList from '../../components/Commons/goodsList'
import {getSize} from '../../utils/getSize'
require('./styles/itemList.less')

@connect(
    state => {
        return {...state.itemList}
    },
    dispatch => bindActionCreators({...itemList}, dispatch)
)
export default class ItemList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            title: '',
            price:true
        }
    }
    componentDidMount() {
        const {match, getItemGoodsList,pagesize,pagenum,list,leftBtn} = this.props
        const {params} = match
        let id=params.id.split('T')[0]
        let name=params.id.split('T')[1]
        leftBtn()
        if(!list[id]){
            getItemGoodsList({
                pagesize: pagesize,
                pagenum: pagenum,
                cid: id,
                sort:''
            })
        }else {

            console.log(list)
            const {scrollT}=list[id]
            console.log(scrollT)
            window.scrollTo(0,scrollT)
        }
    }
    componentWillUnmount() {

        let {scrollT} = getSize();
        const {recordScrollT,match} = this.props;
        const {params} = match
        let id=params.id.split('T')[0]
        recordScrollT(id,scrollT);
        window.onscroll = null;
    }


    _updownMore = () => {
        const { isFetching,match,getItemGoodsList,list,price,rightBtnState} = this.props
        const {params} = match
        let id=params.id.split('T')[0]
        const {pagesize,pagenum,hasMore}=list[id]

        let type=''

        if(rightBtnState===1&& price===false){type='pricedesc'}
        if(rightBtnState===1&& price===true){type='priceasc'}

        if (isFetching || !hasMore) {
            return;
        }
        let num = pagenum
        let data = {
            pagesize: pagesize,
            pagenum: ++num,
            cid:id,
            sort:type
        }
        getItemGoodsList(data)
    }

    _getList=(type,pagenum)=>{
        const {match, getItemGoodsList,pagesize} = this.props
        const {params} = match
        let id=params.id.split('T')[0]
        getItemGoodsList({
            pagesize: pagesize,
            pagenum: pagenum,
            cid: id,
            sort:type
        })


    }

    /***
     * 综合排序
     * @private
     */

    _priceAll=()=>{

        const {leftBtn}=this.props
        leftBtn()
        this._getList('',1)
        window.scrollTo(0,0)
    }

    _priceUp=()=>{
        const {rightBtn,price}=this.props
        rightBtn()
        if(price===false){
            this._getList('pricedesc',1)
        }
        if(price===true){
            this._getList('priceasc',1)
        }
        window.scrollTo(0,0)
    }
    _sortBtn=()=>{
        const {sortBtn,price}=this.props
        sortBtn()
        if(price===true){
            this._getList('pricedesc',1)
        }
        if(price===false){
            this._getList('priceasc',1)
        }
        window.scrollTo(0,0)

    }


    render() {
        const {list, history, isFetching,match,rightBtnState,leftBtnState,price} = this.props
        const {params} = match
        let id=params.id.split('T')[0]
        let name=params.id.split('T')[1]

        console.log(list)

        return (
            <div className="item-list-container">
                <div className="nav-tab">
                    <Icon type="left" size="lg" onClick={() => {history.goBack()}} className='back-icon'/><span>{name}</span>
                </div>
                <div key={this.props.location.pathname} className="list">
                    <Flex className="tab-bar">
                        {leftBtnState===1&&<Flex.Item  onClick={()=>this._priceAll()}>综合</Flex.Item>}
                        {leftBtnState===0&&<Flex.Item  onClick={()=>this._priceAll()} style={{color:"gray"}}>综合</Flex.Item>}
                        {
                            rightBtnState===1&& <Flex.Item onClick={()=>this._sortBtn()}>价格
                                <img src={require("static/images/ite/up_icon.png")} alt="" className={`${price?'img-up':''}`}/>
                            </Flex.Item>
                        }
                        {
                            rightBtnState===0&& <Flex.Item onClick={()=>this._priceUp()} style={{color:"gray"}}>价格
                                <img src={require("static/images/ite/pris.png")} alt="" className="ee"/>
                            </Flex.Item>
                        }
                    </Flex>
                    {
                        list[id] && list[id].dataList&& list[id].dataList.length > 0?
                            <div>
                                <div style={{height:".9rem"}}/>
                                <GoodsList
                                    list={list[id].dataList}
                                    history={history}
                                    isFetching={isFetching}
                                    hasMore={list[id].hasMore}
                                    loadMore={this._updownMore}
                                />
                            </div>
                            :
                            <div className="empty-info"
                                 style={{
                                     height: document.documentElement.clientHeight - 130,
                                     background: "#f7f6f6"
                                 }}
                            >
                                <img src={require('static/images/empty/tmp_shopcar@2x.png')} alt=""/>
                                <p>此分类商品正在上新中</p>
                                <p onClick={() => {
                                    history.push("/item")
                                }}> 逛逛其他的</p>

                            </div>
                    }

                </div>

            </div>
        )
    }
}
