/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppLocalStorage} from '../../utils/cookie'
import {ymd} from '../../utils/tools'
import {Flex, Icon, Button, List, Badge} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
require('./styles/message.less')

import * as message from 'actions/message'
@connect(
    state => {
        return {...state.message}
    },
    dispatch => bindActionCreators({...message}, dispatch)
)
export default class Logistics extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}

        this.user = AppLocalStorage.Cache.get('user')
    }

    componentDidMount() {
        const {fetchTlmeList} = this.props
        fetchTlmeList()
    }

    _isRead=(i)=>{

        const {fetchIsRead,history}=this.props
        fetchIsRead(i.id)
        history.push({pathname: `/yesOrder/${i.acid}T${1}`})
    }

    render() {
        const {history, msgData,logisticsData} = this.props

        console.log(logisticsData)
        return (
            <div className="message-container" ref='wrapper'
                 style={{minHeight: document.documentElement.clientHeight, background: "#f7f6f6"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">交易物流</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                {
                    logisticsData&&logisticsData.datalist&&logisticsData.datalist.length>0?
                        < div >
                            < div style={{height: '.9rem'}}/>
                            <div className="msg-list-info">
                                {
                                    logisticsData.datalist.map((i,k)=>(
                                        <div key={k}>
                                            <div style={{height: '.2rem'}}/>
                                            <Item
                                                onClick={() => {this._isRead(i)}}
                                                platform="android"
                                                extra={i.photo?<img src={i.photo} alt=""/>:''}
                                            >
                                                <span style={{color:`${i.isread>0?'#888':""}`}}> {i.title}</span>
                                                <Brief><span style={{color:`${i.isread>0?'#888':"#333333"}`}}>{i.content}</span> <br/>{ymd(i.addtime,'-',':')}</Brief>
                                            </Item>
                                        </div>
                                    ))

                                }

                            </div>
                            < div style={{height: '.5rem'}}/>
                        </div> :
                        <div className="empty-info"
                             style={{height: document.documentElement.clientHeight - 130, background: "#f7f6f6"}}>
                            <img src={require('static/images/empty/tmp_order@2x.png')} alt=""/>
                            <p></p>
                            <p > 暂无消息</p>
                        </div>
                }
            </div>
        )
    }
}
