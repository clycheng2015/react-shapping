/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon, Flex, List,Radio} from 'antd-mobile'

import * as postType from 'actions/postType'
import ReactDrawer from '../../components/Commons/lib/react-drawer';
const RadioItem = Radio.RadioItem;
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
            open: false,
            copen: false,
            position: 'bottom',
            noOverlay: false,
            value:0,
            cvalue:0

        }
    }

    componentDidMount(){

        const {fetchStoreAds} =this.props

        fetchStoreAds()

    }


    onDrawerClose = () => {
        this.setState({open: false});
    }

    onChange=(v)=>{


        this.setState({value:v})

    }
    toggleDrawer=()=>{

        this.setState({open: !this.state.open});

    }
    _choose = (v) => {
        const {getPostType,postData,storeAds} = this.props
        if ((v === 0 || v === 1) && postData.type === v && this.state.tabState) {
            return false
        }
        else {
            this.setState({
                tabState: true,
            })
            getPostType({
                type:v,
                ads:v===1&&storeAds&&storeAds.length>0?storeAds[this.state.cvalue].ads.realname:'',
                adsId:v===1&&storeAds&&storeAds.length>0?storeAds[this.state.cvalue].ads.id:'',
                cvalue:postData.cvalue

            })


        }
    }

    _save=()=>{
        const {savePost,postData,history} = this.props

        savePost({...postData})
        history.goBack()

    }
    _chooseStore=()=>{

        const {getPostType,storeAds}=this.props
        let v=1
        this.setState({open: !this.state.open,cvalue:this.state.value},()=>{
            getPostType({
                type:v,
                ads:v===1&&storeAds&&storeAds.length>0?storeAds[this.state.cvalue].ads.realname:'',
                adsId:v===1&&storeAds&&storeAds.length>0?storeAds[this.state.cvalue].ads.id:'',
                cvalue:this.state.cvalue
            })
        });
    }
    render() {
        const {history, postData,storeAds} = this.props

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

                                {storeAds && storeAds.length > 0 &&
                                <List.Item
                                    onClick={() => this.toggleDrawer()}
                                    platform="android"
                                    arrow="horizontal"
                                >
                                    {storeAds[postData.cvalue].ads.realname}
                                    <List.Item.Brief>{storeAds[postData.cvalue].ads.province+storeAds[postData.cvalue].ads.city+storeAds[postData.cvalue].ads.county+storeAds[postData.cvalue].ads.address}</List.Item.Brief>
                                </List.Item>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="btn" onClick={() => {
                   this._save()
                }}>
                    确定
                </div>
                <div>

                </div>
                <ReactDrawer
                    open={this.state.open}
                    position={this.state.position}
                    onClose={this.onDrawerClose}
                    noOverlay={this.state.noOverlay}
                >
                    <div className="s-title">
                        门店列表
                    </div>
                    <List>
                        {storeAds&&storeAds.length>0&&storeAds.map((i,k) => (
                            <RadioItem key={k} checked={this.state.value === i.key} onChange={() => this.onChange(i.key)}>
                                {i.ads.realname}
                                <List.Item.Brief>{i.ads.province+i.ads.city+i.ads.county+i.ads.address}</List.Item.Brief>
                            </RadioItem>
                        ))}

                    </List>

                    <div style={{height:"1rem"}}/>
                    <div className="cbtn" onClick={()=>this._chooseStore()}>确定</div>
                </ReactDrawer>
            </div>
        )
    }
}
