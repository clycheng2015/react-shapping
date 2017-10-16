/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import { Flex, Icon} from 'antd-mobile'


import * as moreList from 'actions/moreList'
import * as saveParams from 'actions/saveParams'
require('./styles/moreList.less')


let ctitle = ''

@connect(
    state => {
        return {...state.moreList,...state.saveParams,}
    },
    dispatch => bindActionCreators({...moreList,...saveParams}, dispatch)
)
export default class MoreList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            title: ''
        }

    }

    componentDidMount() {

        const {match, fetchMoreList, location,saveParams,paramsData} = this.props


        console.log(paramsData)

        const {params} = match

        if (location.state != undefined) {

            ctitle = location.state.title
            saveParams(location.state)
        }

        let  curData={}

        if(location.state ==undefined){

            curData=paramsData
        }
        else {
            curData=    location.state

        }

        fetchMoreList({
            pagesize: 100,
            pagenum: 1,

            cid: curData.type == 'CATEGORY' ? '' : (params.id == 'a' ? '' : params.id),
            type: curData.type,
            typeid:curData.typeid
        })




    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }


    componentWillUnmount() {
        const {removeList} = this.props
        removeList()
        // console.log('销毁阶段')
    }

    render() {
        const {data, history, location,paramsData} = this.props
      let  curData={}
        if(location.state ==undefined){

            curData=paramsData
        }
        else {
            curData=    location.state

        }

        const list = () => {

            if (data.goodList && data.goodList.length > 0) {

                return (
                    <div className="flex-container">
                        <Flex wrap="wrap">

                            {
                                curData.type == 'CATEGORY'?
                                    data.goodList.map((i, key) =>
                                        (
                                            <div key={key} className="inline">
                                                <Link
                                                    to={{
                                                        pathname: `/${i.type == 'GOODS' ? 'goodsDetail' : 'itemList'}/${i.good_id}`,
                                                        state: {title: i.stitle},
                                                    }}
                                                >
                                                    <div className="txt">

                                                        <p>{i.stitle}</p>
                                                        <p>{i.price}<span
                                                            style={{fontSize: '.25rem', color: '#606060'}}>元起</span></p>

                                                    </div>
                                                    <img src={i.bigpic} alt=""/>
                                                </Link>
                                            </div>
                                        )
                                    ):

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

                        {/*暂无商品分类*/}
                    </div>
                )
            }

        }

        const title = () => {

            if (location && (location.state !== undefined)) {
                return (
                    <span>{ location.state !== undefined ? location.state.title : curData.state.title}</span>
                )
            } else {

                return (

                    <span>{ctitle}</span>
                )
            }
        }

        return (
            <div className="more-list-container">
                <div className="nav-tab">

                    <Icon type="left" size="lg" onClick={() => {
                        history.goBack()
                    }} className='back-icon'/>

                    <span>
                        {title()}
                    </span>

                </div>

                <div  className="list">

                    {

                        list()

                    }


                </div>

            </div>
        )
    }
}
