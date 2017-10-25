/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon,Flex,List} from 'antd-mobile'

import * as user from 'actions/user'
import * as global from 'actions/global'
require('./styles/jinfu.less')

@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user, ...global}, dispatch)
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

    componentDidMount(){

     const {fetchJinfu}=this.props


        fetchJinfu({})


    }
    render() {
        const { history,jinfuList,userInfo} = this.props


        console.log(userInfo)
        return (
            <div className="jinfu-container" ref='wrapper'

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
                        <Flex.Item className="item-head center">金凤金服</Flex.Item>
                        <Flex.Item className="item-head right"><span style={{color:"#999999"}}>协议</span></Flex.Item>
                    </Flex>
                </div>
                <div style={{height:".9rem"}}>

                </div>
                <div className="count-info" style={{
                    background:'url('+require('static/images/user/jin_bg.png')+') center center /  100%  100%  no-repeat'
                }}>

                    <div className="bill-box" onClick={()=>history.push("/bill")}>
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
                    jinfuList && jinfuList.length>0&&jinfuList.map((i,k)=>(

                        <img  key={k} src={i.smallpic} alt="" onClick={()=>history.push(`/jinTopUp/${i.id}`)}/>
                    ))
                }
                </div>


                <div className={`${userInfo.istixian==1?'draw-btn':"no-draw"}`}

                onClick={()=>{if(userInfo.istixian==1){history.push('/jinDraw')}else {return}}}
                >
                    提现
                </div>




                {/*<List.Item*/}
                    {/*thumb={require('../../static/images/user/top_icon.png')} arrow="horizontal"*/}
                    {/*onClick={() => {*/}

                        {/*history.push('/jinTopUp')*/}
                    {/*}}*/}
                {/*>充值</List.Item>*/}

                {/*<List.Item*/}
                    {/*thumb={require('../../static/images/user/top_icon.png')} arrow="horizontal"*/}
                    {/*onClick={() => {*/}

                        {/*history.push('/jinDraw')*/}
                    {/*}}*/}
                {/*>提现</List.Item>*/}


                {/*<List.Item*/}
                    {/*thumb={require('../../static/images/user/record_icon.png')}*/}
                    {/*arrow="horizontal"*/}
                    {/*onClick={() => {*/}

                        {/*history.push('/bill')*/}
                    {/*}}*/}

                {/*>资金记录</List.Item>*/}


                {/*<div className="msg-info">*/}
                    {/*<p>温馨提示</p>*/}
                    {/*<p>1、开业大酬宾：充值500送100。</p>*/}
                    {/*<p> 2、VIP：余额与金凤余额充值累计达到500元，即可升级成为VIP，享受VIP专属价格。</p>*/}
                {/*</div>*/}

            </div>
        )
    }
}
