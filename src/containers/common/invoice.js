/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Icon, Radio, List, Flex,InputItem,Toast} from 'antd-mobile'

const RadioItem = Radio.RadioItem;

import * as invoice from 'actions/invoice'

require('./styles/invoice.less')

const data = [

    {value: 1, label: '明细',},

    {value: 0, label: '不开发票', },
];


@connect(
    state => {
        return {...state.invoice}
    },
    dispatch => bindActionCreators({...invoice}, dispatch)
)



export default class PostType extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
            value: 0,
            invoicetype:1
        }


    }

    onChange=(v)=>{

        const {getInvoice,invoiceType} = this.props

        let data={...invoiceType,type:v,}

        getInvoice(data)
    }
    _delChange=(v)=>{

        const {getInvoice,invoiceType} = this.props
        let data={...invoiceType,voiType:v}
        getInvoice(data)
    }
    InputChange=(t,v)=>{
        const {getInvoice,invoiceType} = this.props
        if(t===0){
            let data={...invoiceType,msg:{...invoiceType.msg,cpname:v}}
            getInvoice(data)
        }
        if(t===1) {
            let data={...invoiceType,msg:{...invoiceType.msg,number:v}}
            getInvoice(data)
        }
        if(t===2) {
            let data={...invoiceType,msg:{...invoiceType.msg,username:v}}

            getInvoice(data)
        }


    }
    _saveInv=()=>{

        const {saveInvoices,invoiceType,history} = this.props

        if(invoiceType.voiType===1&&invoiceType.msg.cpname===''){
            Toast.info('亲，公司抬头不能为空哟',1)
            return false
        }

        if(invoiceType.voiType===1&&invoiceType.msg.number===''){
            Toast.info('亲，公司识别号不能为空哟',1)
            return false
        }
        saveInvoices({...invoiceType})

        history.goBack()


    }

    render() {
        const {history,invoiceType} = this.props
        return (
            <div className="invoice-container" ref='wrapper'

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
                        <Flex.Item className="item-head center">发票信息</Flex.Item>
                        <Flex.Item className="item-head right"></Flex.Item>
                    </Flex>
                </div>
                <div style={{height: ".9rem"}}>

                </div>

                <div className="banner-info">

                    <div className="left">

                        <img src={require('static/images/user/car_icon.png')} alt=""/>

                    </div>


                    <div className="center">
                        {
                            invoiceType.type===1 && invoiceType.voiType===0&& ' 开企业抬头发票，请准确填写对应的“纳税人识别号”，以免影响您的发票报销。'
                        }
                        {
                            invoiceType.type===0&& ' 开企业抬头发票，请准确填写对应的“纳税人识别号”，以免影响您的发票报销。'
                        }

                        {
                            invoiceType.type===1 && invoiceType.voiType===1&& '开企业抬头发票，请准确填写对应的“纳税人识别号”，以免影响您的发票报销。纳税人识别号是“统一社会信用代码”或“税务登记证号”。。'
                        }


                    </div>
                    <div className="right">
                        <img src={require('static/images/user/close_icon.png')} alt=""/>
                    </div>

                </div>


                {

                    invoiceType.type===1&&
                        <div className="del-info">

                            <div className="title">
                                发票抬头
                            </div>

                            <div className="type-info">

                                <label className="per">
                                    <input type="radio" name="radiobutton" value="radiobutton" checked={  invoiceType.voiType===0}
                                           onChange={() => this._delChange(0)}/> 个人
                                </label>
                                <label className="comp">
                                    <input type="radio" name="radiobutton" value="radiobutton"  checked={  invoiceType.voiType===1}
                                           onChange={() =>  this._delChange(1)}
                                    /> 公司
                                </label>


                            </div>

                            {
                                invoiceType.voiType===1&&
                                <div className="cmp-msg">

                                    <InputItem
                                        // type="bankCard"
                                        placeholder="填写单位名称"

                                        onChange={(v)=>this.InputChange(0,v)}
                                    />
                                    <InputItem

                                        placeholder="请填写纳税人识别号"

                                        onChange={(v)=>this.InputChange(1,v)}
                                    />

                                </div>
                            }


                            {
                                invoiceType.voiType===0&&
                                <div className="cmp-msg">

                                    <InputItem
                                        // type="bankCard"
                                        placeholder="（选填）默认为会员名"

                                        onChange={(v)=>this.InputChange(2,v)}
                                    />
                                </div>
                            }



                        </div>

                }
                <div className="list-cmp">
                    <List renderHeader={() => '发票内容'}>
                        {data.map(i => (
                            <RadioItem key={i.value} checked={invoiceType.type === i.value}
                                // extra="123213"
                                       onChange={() => this.onChange(i.value)}
                            >
                                {i.label}

                            </RadioItem>
                        ))}
                    </List>
                </div>
                <div className="btn" onClick={() => {
                    this._saveInv()
                }}>
                    确定
                </div>

            </div>
        )
    }
}
