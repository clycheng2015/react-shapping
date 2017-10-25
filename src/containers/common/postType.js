/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon, Flex, List} from 'antd-mobile'

import * as postType from 'actions/postType'
require('./styles/postType.less')

@connect(
    state => {
        return {...state.postType}
    },
    dispatch => bindActionCreators({...postType,}, dispatch)
)



export default class PostType extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
            tabState: true,
        }


    }

    _choose = (v) => {


        const {getPostType,postData} = this.props

        if ((v === 0 || v === 1) && postData.type === v && this.state.tabState) {

            return false

        }
        else {

            this.setState({
                tabState: true,
            })

            getPostType({
                type:v,
                ads:v===1?'四川省成都市武侯区航空路美纶购体验店':''
            })
        }
    }

    _save=()=>{
        const {savePost,postData,history} = this.props

        savePost({...postData})
        history.goBack()

    }
    render() {
        const {history, postData} = this.props
        return (
            <div className="post-container" ref='wrapper'

                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f7f6f6"
                 }}
            >

                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">选择配送方式</Flex.Item>
                        <Flex.Item className="item-head right"></Flex.Item>
                    </Flex>
                </div>
                <div style={{height: ".9rem"}}>

                </div>

                <div className="title-info">
                    <img src={require('static/images/order/post_ic.png')} alt=""/>

                    <span>配送方式</span>

                </div>
                <div className="post-info">


                    <div className="btn-box">


                        <span className={`${this.state.tabState && postData.type=== 0 ? 'active' : ''}`}
                              onClick={() => this._choose(0)}
                        >快递运输</span>

                        <span
                            className={`${this.state.tabState && postData.type === 1 ? 'active' : ''}`}
                            onClick={() => this._choose(1)}
                        >上门自提</span>


                    </div>

                    <div className="msg-info">


                        {
                            postData.type === 0 && <div className="post">
                                <p>中小件送货时间</p>
                                <p>工作日、双休日与节假日均可送货</p>
                            </div>

                        }

                        {

                            postData.type === 1 && <div className="door">
                                <p>四川省成都市武侯区航空路美纶购体验店</p>
                                <p>地址：四川省成都市武侯区航空路6号1栋1号附3号</p>
                            </div>
                        }


                    </div>

                </div>
                <div className="btn" onClick={() => {
                   this._save()
                }}>
                    确定
                </div>
            </div>
        )
    }
}
