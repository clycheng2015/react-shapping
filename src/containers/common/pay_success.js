/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import { Flex, Icon, Button} from 'antd-mobile';
require('./styles/payResult.less')
export default class PaySuccess extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const {history,match} = this.props
        const {params}=match
        return (
            <div className="pay_result" ref='wrapper' style={{minHeight: document.documentElement.clientHeight,background:"#f3f3f1"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {

                            if(params.id==='o'){
                                history.push('/')
                            }
                            else {
                                history.goBack()
                            }
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">支付结果</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div style={{height: '.9rem'}}/>
                <div className="msg-info">

                    <div className="txt">

                        <img src={require('static/images/user/success.png')} alt=""/>
                        <p className="po">订单支付成功!</p>
                        {/*<p className="pt">稍安勿躁，我们将尽快打包安排快递送到你手中</p>*/}
                    </div>
                </div>

                <Flex style={{marginTop:".4rem"}}>
                    <Flex.Item className="btn-info">
                        {params.id==='o'&&  <Button onClick={() => {history.push('/myOrder')}}>查看订单</Button>}
                        {params.id==='p'&&  <Button onClick={() => {history.goBack()}}>返回</Button>}


                    </Flex.Item>
                    <Flex.Item className="btn-info-r">


                        {params.id==='o'&&  <Button type="warning" onClick={() => {history.push('/')}}>继续购物</Button>}
                        {params.id==='p'&&   <Button type="warning" onClick={() => {history.goBack()}}>继续充值</Button>}

                    </Flex.Item>


                </Flex>

            </div>
        )
    }
}
