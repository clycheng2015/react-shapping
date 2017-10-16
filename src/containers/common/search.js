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
import * as search from 'actions/search'
require('./styles/search.less')


@connect(
    state => {
        return {...state.search}
    },
    dispatch => bindActionCreators({...search, ...global}, dispatch)
)
export default class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            title: ''
        }

    }

    componentDidMount() {

        const {match, getSearchList, location} = this.props
        const {params} = match
        getSearchList({
            pagesize: 100,
            pagenum: 1,
            word: params.value
        })


    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }
    render() {
        const {data, history, location} = this.props

        console.log(data)
        const list = () => {

            if (data && data.goodList && data.goodList.length > 0) {

                return (
                    <div className="flex-container">
                        <Flex wrap="wrap">

                            {
                                data.goodList.map((i, key) => (
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
                                                    <p style={{color: "#e85c34", paddingTop: ".1rem"}}>￥{i.price}  </p>

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

                        {/*暂无商品分类*/}
                    </div>
                )
            }

        }
        console.log(this.props)

        // const title = () => {
        //
        //     if (location && (location.state !== undefined)) {
        //         return (
        //             <span>{ location.state !== undefined ? location.state.title : ''}</span>
        //         )
        //     } else {
        //
        //         return (
        //
        //             <span></span>
        //         )
        //     }
        // }

        return (
            <div className="item-list-container">
                <div className="nav-tab">

                    <Icon type="left" size="lg" onClick={() => {
                        history.goBack()
                    }} className='back-icon'/>

                    <span>
                      <span>搜索结果</span>
                    </span>

                </div>

                <div key={this.props.location.pathname} className="list">
                    {list()}
                </div>

            </div>
        )
    }
}
