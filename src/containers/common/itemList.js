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

            title: ''
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
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    render() {
        const {data, history, location} = this.props

        const list = () => {

            if (data.datalist && data.datalist.length > 0) {

                return (
                    <div className="flex-container">
                        <Flex wrap="wrap">

                            {
                                data.datalist.map((i, key) => (
                                        <div key={key} className="per">
                                            <Link
                                                to={{
                                                    pathname: `/goodsDetail/${i.id}`,
                                                    // state:location.state.title

                                                }}
                                            >
                                                <div className="img-info">

                                                    <img src={i.bigpic} alt=""/>
                                                </div>
                                                <div className="pretxt">

                                                    <p className="mall-title">{i.gtitle}</p>
                                                    <p style={{color: "#e85c34", paddingTop: ".1rem"}}>￥{i.zkprice}  </p>

                                                </div>
                                            </Link>
                                        </div>

                                    )
                                )
                            }
                        </Flex>
                    </div>
                )
            } else {

                return (

                    <div className="no-goods">

                        暂无商品分类
                    </div>
                )
            }

        }
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
            <div className="item-list-container">
                <div className="nav-tab">

                    <Icon type="left" size="lg" onClick={() => {
                        history.goBack()
                    }} className='back-icon'/>

                    <span>
                        {title()}
                    </span>

                </div>

                <div key={this.props.location.pathname} className="list">
                    {list()}
                </div>

            </div>
        )
    }
}
