/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon, Flex, List} from 'antd-mobile'

import * as user from 'actions/user'
import * as global from 'actions/global'
import {AppLocalStorage} from '../../utils/cookie'
require('./styles/jinfu.less')

@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user,...global}, dispatch)
)
export default class Jinfu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
        }
    }

    componentDidMount() {

        const {fetchJinfu, getUserInfo} = this.props
        fetchJinfu({pagesize: 20, pagenum: 0})
        let user = AppLocalStorage.Cache.get('user')
        if (user && user.userInfo) {
            getUserInfo({
                uid: user.userInfo.id,
                version: "1.1.0"
            })
        }
    }

    render() {
        const {history, jinfuData, userInfo,currentAnimate} = this.props

        return (
            <div className="jinfu-container" ref='wrapper'
                 style={{minHeight: document.documentElement.clientHeight, background: "#f3f3f1"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack();currentAnimate('right')
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">金凤金服</Flex.Item>
                        <Flex.Item className="item-head right"><span style={{color: "#999999"}} onClick={()=>history.push('/protocol/5')}>协议</span></Flex.Item>
                    </Flex>
                </div>
                <div style={{height: ".9rem"}}>

                </div>
                <div className="count-info" style={{
                    background: 'url(' + require('static/images/user/jin_bg.png') + ') center center /  100%  100%  no-repeat'
                }}>

                    <div className="bill-box" onClick={() => history.push(`/bill/${1}`)}>
                        <img src={require('static/images/user/bill.png')} alt=""/>
                        账单

                    </div>
                    <div className="box">

                        <p>单位(元)</p>
                        <p className="count">{Number(userInfo.money).toFixed(2)}</p>
                    </div>


                    <div className="draw-info">
                        <p>累计可提现</p>
                        <p >{Number(userInfo.jftomoney).toFixed(2)}</p>
                    </div>
                    <div className="op-box">

                    </div>
                </div>
                <div className="img-info">

                    {
                        jinfuData && jinfuData.datalist && jinfuData.datalist.length > 0 && jinfuData.datalist.map((i, k) => (

                            <div key={k}>{
                                i.list.map((i, index) => (
                                    <img  key={index} src={i.smallpic} alt=""   onClick={()=>history.push(`/jinTopUp/${i.id}`)}/>
                                ))}

                            </div>
                        ))
                    }
                </div>
                <div className={`${userInfo.istixian == 1 ? 'draw-btn' : "no-draw"}`} onClick={() => {if (userInfo.istixian == 1) {history.push('/jinDraw')} else {return}}}>
                    提现 (每周二可提现)
                </div>

            </div>
        )
    }
}
