/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {Button, Flex, Icon} from 'antd-mobile'
/*actions*/

import * as global from 'actions/global'
import * as itemList from 'actions/itemList'

import List from '../../components/item/itemList'
require('./styles/itemList.less')


let ctitle = ''

@connect(
    state => {
        return {...state.itemList}
    },
    dispatch => bindActionCreators({...itemList, ...global}, dispatch)
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

        const {match, getItemGoodsList, location} = this.props

        console.log(location)
        const {params} = match
        getItemGoodsList({
            pagesize: 100,
            pagenum: 1,
            cid: parseInt(params.id)
        })

        if (location.state !== undefined) {
            ctitle = location.state.title
        }


    }

    componentWillUnmount() {
        const {removeList} = this.props
        removeList()
        // console.log('销毁阶段')
    }


    handleClick() {

    }

    render() {
        const {data, history, location} = this.props

        const title = () => {

            if (location && (location.state !== undefined)) {
                return (
                    <span>{ location.state !== undefined ? location.state.title : ''}</span>
                )
            } else {

                return (

                    <span>{ctitle}</span>
                )
            }
        }

        return (
            <div className="item-list-container"


            >
                <div className="nav-tab">

                    <Icon type="left" size="lg" onClick={() => {
                        history.goBack()
                    }} className='back-icon'/>

                    <span>
                        {title()}
                    </span>

                </div>

                <div key={this.props.location.pathname} className="list">

                    <Flex className="tab-bar">
                        <Flex.Item  onClick={()=>{}}>
                            综合
                        </Flex.Item>
                        <Flex.Item onClick={()=>{this.setState({price:!this.state.price})}}>
                            价格

                            <img src={require("static/images/ite/up_icon.png")} alt="" className={`${this.state.price?'img-up':''}`}/>

                        </Flex.Item>
                    </Flex>

                    {
                        data.datalist && data.datalist.length > 0?  <List list={data.datalist} history={history}/>:


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
