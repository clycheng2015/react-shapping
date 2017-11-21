/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import { Button, Icon, Flex} from 'antd-mobile';
require('./styles/payResult.less')
export default class PayFail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }


    }
    componentDidMount() {

    }

    render() {
        const {history,match} = this.props
        const{params}=match
        return (
            <div className="pay_result" ref='wrapper' style={{minHeight: document.documentElement.clientHeight,background:"#f3f3f1"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {

                            if(params.id==='o'){
                                history.goBack()
                            }
                            else {
                                history.push('/user')
                            }

                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">支付结果</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div style={{height: '.9rem'}}/>
                <div className="msg-info">


                    <div className="txt">

                        <img src={require('static/images/user/fail.png')} alt=""/>
                        <p className="po">订单支付失败!</p>
                        <p className="pt">请重新操作</p>
                        <p className="pt">检查网络是否正常</p>
                    </div>
                </div>

                <Flex style={{marginTop:".4rem"}}>
                    <Flex.Item className="btn-info">



                        {params.id==='o'&&  <Button onClick={() => {history.push('/myOrder')}}>查看订单</Button>}
                        {params.id==='p'&&  <Button onClick={() => {history.goBack()}}>返回</Button>}

                    </Flex.Item>
                    <Flex.Item className="btn-info-r">
                        <Button type="warning" onClick={() => {
                            history.goBack()
                        }}>重试</Button>
                    </Flex.Item>


                </Flex>

            </div>
        )
    }
}
