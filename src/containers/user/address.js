/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppLocalStorage} from '../../utils/cookie'
import {Modal, Icon, Flex, Radio, Button} from 'antd-mobile'
import * as user from 'actions/user'
require('./styles/ads.less')
const alert = Modal.alert;

@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)

export default class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const {uid, fetchGetAds} = this.props
        fetchGetAds({uid: uid})
    }

<<<<<<< HEAD
    _updateDefault = (id) => {
        const {uid, fetchDefAdsge} = this.props
=======
    _updateDefault = (i) => {
        const {uid, fetchDefAds,match,history,chooseAddress} = this.props
        const {params}=match
        const id=i.id
        if(params.id==='0'){
            const alertInstance = alert('提示', '设为默认地址？', [
                {text: '取消', onPress: () => console.log('取消'), style: 'default'},
                {text: '确定', onPress: () => fetchDefAds({uid: uid, id: id})},
            ]);
            setTimeout(() => {
                alertInstance.close();
            }, 5000)
        }
>>>>>>> v1.50

        if(params.id==='1'){
            chooseAddress(i)
            setTimeout(() => {
                history.goBack()
            }, 100)

        }

    }
    _delAddress = (id) => {
        const {uid, fetchDelAds} = this.props


        const alertInstance = alert('提示', '删除该地址？', [
            {text: '取消', onPress: () => console.log('取消'), style: 'default'},
            {text: '确定', onPress: () => fetchDelAds({uid: uid, id: id})},
        ]);
        setTimeout(() => {
            alertInstance.close();
        }, 500000);
    }

    componentWillReceiveProps(np) {
        const {address} = np
        const {isFetchingDef} = address
        if (isFetchingDef) {
            const {uid, fetchGetAds} = this.props
            fetchGetAds({uid: uid})
        }
    }

    render() {
        const {address, history, match} = this.props
        const {data} = address

        return (
            <div className="ads-container"
                 style={{minHeight: document.documentElement.clientHeight, background: "#f3f3f1"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">收货地址</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                {data && data.length > 0 ?
                    <div>
                        <div className="list-info">
                            {data.map((i, key) => (
                                <div key={key} className="item">
                                    <div onClick={() => this._updateDefault(i)}>
                                        <div className="head">
                                            <span>{i.realname}</span><span>{i.mobile}</span></div>
                                        <div className="ads">
                                            {i.province === '/' ? '' : i.province}
                                            {i.city === '/' ? '' : i.city}
                                            {i.county === '/' ? '' : i.county}
                                            {i.address}
                                        </div>
                                    </div>
                                    <div className="btn">
                                        <Radio className="my-radio" checked={i.isdefault} value={i.id}
                                               onChange={e => this._updateDefault(i)}>
                                            <span className="name">默认地址</span>
                                        </Radio>
                                        <span className="right">
                                            <Link className="edit-info" to={{pathname: "/newAds", state: {data: i}}}>
                                         <img src={require('static/image/ic_edit_address.png')} alt=""
                                              className="edit-img"/>编辑
                                            </Link>
                                            <span onClick={() => this._delAddress(i.id)}><img
                                                src={require('static/image/ic_delte_address.png')} alt=""
                                                className="del-img"/>删除</span>
                                        </span>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        <Button type="primary" style={{width: "100%", margin: "0 auto"}} className="add-btn"
                                onClick={() => history.push('/newAds')}>新建地址</Button>
                    </div>
                    : <div className="empty-info"
                           style={{height: document.documentElement.clientHeight - 130, background: "#f3f3f1"}}>
                        <img src={require('static/images/empty/noads_icon.png')} alt=""/><p> 您还没有添加收货地址</p>
                        <p onClick={() => {
                            history.push("/newAds")
                        }}> 赶紧去添加一个</p>
                    </div>
                }
            </div>)
    }

}
