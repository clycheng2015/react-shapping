/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Accordion, List, Icon, Flex} from 'antd-mobile';
import * as user from 'actions/user'
require('./styles/help.less')

@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)



export default class Help extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
        }


    }


    componentWillMount() {
        const {fetchHelp,fetchTel} = this.props
        fetchHelp()
        fetchTel()
    }


    render() {
        const {history, helpData,kefuTel} = this.props
        return (
            <div className="help-container" ref='wrapper'

                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f3f3f1"
                 }}
            >

                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">客服服务</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div className="banner-info">

                    <img src={require('static/images/user/ban_icon.png')} alt=""/>
                    人工客服服务时间（早上9.00-下午17.30）
                    {/*<img src={require('static/images/user/close_icon.png')} alt=""/>*/}

                </div>
                <div style={{height: '1.8rem'}}/>
                <div>
                    <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>

                        {
                            helpData && helpData.datalist && helpData.datalist.length > 0 && helpData.datalist.map((i, k) => (

                                <Accordion.Panel header={i.cname} key={k}>
                                    <List className="my-list">
                                        {
                                            i.list.map((j, n) => (
                                                <List.Item arrow="horizontal" key={n}
                                                onClick={()=>history.push({
                                                    pathname:"/webTxt",
                                                    state:{
                                                        cnt:j.content,
                                                        name:j.title,
                                                    }
                                                })}
                                                >
                                                    {j.title}

                                                </List.Item>
                                            ))
                                        }
                                    </List>
                                </Accordion.Panel>
                            ))
                        }
                    </Accordion>
                </div>
                {
                    kefuTel.length>0&&
                    <div className="tel-info">

                        <a href={`tel:${kefuTel[1]&&kefuTel[1].customermobile}`}>招商咨询</a>
                        <a href={`tel:${kefuTel[0]&&kefuTel[0].customermobile}`}>购物咨询</a>

                    </div>
                }

            </div>
        )
    }
}
