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


let ctitle = ''
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
        const {match, getItemGoodsList,pagesize,pagenum,list} = this.props
        const {params} = match
        let id=params.id.split('T')[0]
        let name=params.id.split('T')[1]
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
        const { isFetching,match,getItemGoodsList,list} = this.props
        const {params} = match
        let id=params.id.split('T')[0]
        const {pagesize,pagenum,hasMore}=list[id]
        if (isFetching || !hasMore) {
            return;
        }
        let num = pagenum
        let data = {
            pagesize: pagesize,
            pagenum: ++num,
            cid:id
        }
        getItemGoodsList(data)
    }

    /***
     * 综合排序
     * @private
     */

    _priceAll=()=>{


    }
    /***
     * 价格升序
     * @private
     */

    _priceUp=()=>{



    }
    /***
     * 价格降序
     * @private
     */

    _priceDown=()=>{



    }
    render() {
        const {list, history, isFetching,match} = this.props
        const {params} = match
        let id=params.id.split('T')[0]
        let name=params.id.split('T')[1]

        return (
            <div className="item-list-container">
                <div className="nav-tab">
                    <Icon type="left" size="lg" onClick={() => {history.goBack()}} className='back-icon'/><span>{name}</span>
                </div>
                <div key={this.props.location.pathname} className="list">
                    <Flex className="tab-bar">
                        <Flex.Item  onClick={()=>{}}>综合</Flex.Item>
                        <Flex.Item onClick={()=>{this.setState({price:!this.state.price})}}>价格
                            <img src={require("static/images/ite/up_icon.png")} alt="" className={`${this.state.price?'img-up':''}`}/>
                        </Flex.Item>
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
