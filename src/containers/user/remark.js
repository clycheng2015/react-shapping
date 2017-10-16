/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon, Flex, List, TextareaItem,Toast} from 'antd-mobile'
import {createForm} from 'rc-form';
import * as user from 'actions/user'
import * as global from 'actions/global'
require('./styles/remark.less')

@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)


class Remark extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
        }
    }

    _applyRefund = (history) => {
        const {uid, fetchRefund, match} = this.props
        const {params} = match
        const {getFieldValue} = this.props.form;

        let remark=getFieldValue("count")

        if(remark==undefined){

            Toast.info("亲，为了尽快给您退款，请填写理由哟~",1)

            return false
        }

        let  data={
            uid:uid,
            id:params.id,
            backreason:remark
        }
        fetchRefund(data,history)
    }

    render() {
        const {history, order} = this.props
        const {getFieldProps} = this.props.form;
        return (
            <div className="remark-container" ref='wrapper'

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
                        <Flex.Item className="item-head center">订单退款</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>

                <div>

                    <List style={{
                        paddingTop: "1rem"
                    }}>
                        <TextareaItem
                            {...getFieldProps('count', {})}
                            placeholder="请填写退款原因！谢谢！"
                            rows={5}
                            count={100}
                            style={{
                                fontSize: ".25rem"
                            }}
                        />
                    </List>
                    <p
                        style={{
                            fontSize: ".2rem",
                            padding: ".2rem"
                        }}
                    >申请退款后，款项将在72小时内原路返回至您的支付账户中。</p>

                    <div className="btn"
                    onClick={()=>this._applyRefund(history)}
                    >

                        提交退款

                    </div>
                </div>


            </div>
        )
    }
}
export default createForm()(Remark)