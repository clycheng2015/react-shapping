/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Flex, Icon, Modal} from 'antd-mobile'
const alert = Modal.alert;
import Timer from '../../components/Commons/timer';
/*actions*/
import * as activeDetail from 'actions/activeDetail'
import * as saveParams from 'actions/saveParams'
import * as global from 'actions/global'
import ReactDrawer from '../../components/Commons/lib/react-drawer';
import {AppLocalStorage} from '../../utils/cookie'
require('../../components/Commons/lib/react-drawer.less')
require('./styles/activeDetail.less')
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'
@connect(
    state => {

        return {...state.activeDetail, ...state.saveParams, ...state.global}
    },
    dispatch => bindActionCreators({...activeDetail, ...saveParams,...global}, dispatch)
)
export default class ActiveDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false,
            position: 'bottom',
            noOverlay: false,
            tabState: true,
            tabValue: 0,

        };
        this.user = AppLocalStorage.Cache.get('user')
    }


    componentDidMount() {


        const {match, fetchSkillDetail, fetchDisDetail} = this.props
        const {params} = match
        let id = params.id.replace(/[^0-9]/ig, "");
        let type = params.id.replace(/\d+/g, '');
        // type = 'DISCOUNT'
        if (type === 'SECKILL') {
            fetchSkillDetail({id: id,type:type})
        }
        if (type === 'DISCOUNT') {
            fetchDisDetail({id: id,type:type})
        }
    }


    componentWillUnmount() {
        const {removeAcDetail} = this.props
        removeAcDetail()
        window.onScroll = null
    }
    componentWillReceiveProps(np) {



        const {data} = np
        if (isPro && data && data.id) {

            console.log(data)

            let href=window.location.href
            if(href.indexOf('?from=singlemessage&isappinstalled=0')>0){

                href= href.replace('?from=singlemessage&isappinstalled=0','')
                window.location.href=href
                return
            }

            if(href.indexOf('?')>0){
                let url= href.match(/\?(\S*)#/)[0]
                href=href.replace(url,'#')
            }
            this.props.fetchWxConfig({
                imgUrl: `${data.bigpic}?imageMogr2/thumbnail/!30p`, title: '美纶购商城', description:data.title, link: href
            });
            return
        }


    }

    _submite = () => {
        const {match, history, data} = this.props
        const {params} = match
        let type = params.id.replace(/\d+/g, '');

        if (!this.user) {
            alert('请先登录', '立即前往？', [

                {text: '取消', onPress: () => console.log('cancel')},
                {
                    text: '确定', onPress: () => {

                    let url = window.location.href

                    url = url.match(/#(\S*)/)[1];

                    url = url.replace('/', '')

                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://app.meilungo.com/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

                }
                },
            ])
            return
        }

        if(!this._isBuy()){
            return
        }
        let newData = [{
            att1: "",
            att2: "",
            goods_att1: "",
            goods_att2: "",
            goods_desc: '',
            goods_id: data.id,
            goods_num: 1,
            goods_price: data.seckillprice || data.zkprice,
            goods_smallpic: data.bigpic,
            goods_title: data.title,
            id: data.id,
            shareurl: data.shareurl,
            user_id: this.user.userInfo.id,
            type: type

        }]

        history.push({
            pathname: "/orderDetail",
            state: {data: newData, state: "det"}
        })
    }

    _tabChange = (v) => {
        if (v === 0) {
            window.scrollTo(0, 0)
        }
        else {
            window.scrollTo(0, this.dlScroll.offsetTop - 50)
        }
        if ((v === 0 || v === 1) && this.state.tabValue === v && this.state.tabState) {
            return false
        }
        else {
            this.setState({tabState: true, tabValue: v})
        }
    }

    closeDrawer = () => {
        this.setState({open: false});
    }
    onDrawerClose = () => {
        this.setState({open: false});
    }


    _isBuy=()=>{
        let stringTime = "2014-07-10 10:21:12";
        const {data}=this.props
        let timestamp = Date.parse(new Date());

        if(!data.endtime || timestamp>data.endtime){
            return false
        }
        return true
    }
    render() {
        const {data, history} = this.props

        return (
            <div className="acgoods-detail-container">
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center"><span
                            className={`${this.state.tabState && this.state.tabValue === 0 ? 'active' : ''}`}
                            onClick={() => this._tabChange(0)}>商品</span><span
                            className={`${this.state.tabState && this.state.tabValue === 1 ? 'active' : ''}`}
                            onClick={() => this._tabChange(1)}>详情</span></Flex.Item>
                        <Flex.Item className="item-head right"></Flex.Item>
                    </Flex>
                </div>
                <div className="detail-info">
                    {
                        data && data.id &&
                        <div className="cnt-info">
                            <div className="img-info"><img src={data.bigpic+'?imageMogr2/thumbnail/!99p'} alt=""/></div>
                            <div className="active-info"
                                 style={{background: 'url(' + require('static/images/gs/gs_detail_bg.png') + ') center center /  105%  105%  no-repeat'}}>
                                <div className="ac-price">
                                    <p>￥{data.seckillprice || data.zkprice }</p>
                                    <p>市场价：￥{data.price}</p>
                                </div>
                                <div className="count-info">
                                    <p> 距离结束还</p>
                                    <div><Timer
                                        date={data.endtime ? new Date(parseInt(data.endtime)).toISOString() : "2017-11-10T00:00:00+00:00"}
                                        days={{plural: 'Days ', singular: 'day '}} hours=':' mins=':' segs=''/></div>
                                </div>
                            </div>
                            <div className="msg-info"><div className="title"><p>{data.title}</p></div></div>
                            <div className="know-info"
                                 onClick={() => this.setState({drawerType: "know", open: !this.state.open,})}>
                                <ul >
                                    <li><img src={require('static/images/gs/k_icon.png')} alt=""/>正品保障</li>
                                    <li><img src={require('static/images/gs/k_icon.png')} alt=""/>假一罚百</li>
                                    <li><img src={require('static/images/gs/k_icon.png')} alt=""/>税费</li>
                                    <li><img src={require('static/images/gs/k_icon.png')} alt=""/>自提</li>
                                </ul>
                                <Icon type="right" className="r-icon"/>
                            </div>
                            <div className="more-know-info" onClick={()=>history.push('/protocol/1')}>美纶购购物须知<Icon type="right" className="r-icon"/></div>
                            <div className="url">
                                <div className="title" ref={(el) => this.dlScroll = el}>商品详情</div>
                                <div className="markdown-body" dangerouslySetInnerHTML={{__html: data.content}}/>
                            </div>
                            <ReactDrawer
                                open={this.state.open}
                                position={this.state.position}
                                onClose={this.onDrawerClose}
                                noOverlay={this.state.noOverlay}
                            >
                                <div className="know-drawer-info">
                                    <div className="drawer-title">
                                        <span className="title">服务说明</span>
                                        <span className='close-btn' onClick={this.closeDrawer}>x</span>
                                    </div>
                                    <ul className="list">
                                        <li>
                                            <div className="title"><img src={require('static/images/gs/true.png')}
                                                                        alt=""/>正品保障
                                            </div>
                                            <div className="exp">全球精选，正品保障</div>
                                        </li>
                                        <li>
                                            <div className="title"><img src={require('static/images/gs/pei.png')}
                                                                        alt=""/>假一罚百
                                            </div>
                                            <div className="exp">商品可查，假一罚百</div>
                                        </li>
                                        <li>
                                            <div className="title"><img src={require('static/images/gs/sui.png')}
                                                                        alt=""/>税费
                                            </div>
                                            <div className="exp">税费：0元，该商品已完税</div>
                                        </li>
                                        <li>
                                            <div className="title"><img src={require('static/images/gs/zi.png')}
                                                                        alt=""/>自提
                                            </div>
                                            <div className="exp">全国体验店提供自提服务</div>
                                        </li>
                                    </ul>
                                    <div className="drawer-btn"
                                         onClick={() => this.setState({open: !this.state.open})}>确定
                                    </div>
                                </div>

                            </ReactDrawer>
                        </div>
                    }
                </div>
                <div className="bottom">
                    <Flex >
                        {
                            data&&data.id&&
                            <Flex.Item className={this._isBuy()?"buy-btn":"buy-btn-ac"} onClick={() => this._submite()}>
                                {this._isBuy()?"立即抢购":"已结束"}
                            </Flex.Item>
                        }
                    </Flex>

                </div>

            </div>

        )
    }
}
