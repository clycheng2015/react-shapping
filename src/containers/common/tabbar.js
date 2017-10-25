import React, {PropTypes}from "react";
import {Icon, TabBar} from 'antd-mobile';
import {connect} from 'react-redux'

import {localItem} from '../../utils/cookie'
class TabBarMain extends React.Component {

    constructor(props) {
        super(props);
        this.displayName = "TabBar";
        this.state = {
            hidden: false,
            userInfo: 'undefined'
        }

    }

    componentWillMount() {
        let userInfo = localItem('userInfo')
        if ((typeof userInfo)== 'string' ) {

            this.setState({
                userInfo:JSON.parse(userInfo)
            })
        }

    }

    render() {
        const {changeTab, page, history} = this.props;

        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="black"
                barTintColor="white"
                hidden={this.state.hidden}
            >

                <TabBar.Item
                    icon={
                        <div style={{
                            width: '.4rem',
                            height: '.4rem',

                            background: 'url(' + require('static/images/tabbar/home.png') + ') center center /  .4rem .4rem no-repeat',
                            overflow: 'hidden'
                        }}
                        />}
                    selectedIcon={
                        <div style={{
                            width: '.4rem',
                            height: '.4rem',

                            background: 'url(' + require('static/images/tabbar/home_filter.png') + ') center center /  .4rem .4rem no-repeat',
                            overflow: 'hidden'
                        }}
                        />
                    }

                    title="主页"
                    key="主页"
                    // dot
                    selected={page === '/'}
                    onPress={() => {
                        changeTab('/')
                        history.push('/')
                    }}
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '.4rem',
                            height: '.4rem',

                            background: 'url(' + require('static/images/tabbar/item.png') + ') center center /  .4rem .4rem no-repeat',
                            overflow: 'hidden'
                        }}
                        />}
                    selectedIcon={
                        <div style={{
                            width: '.4rem',
                            height: '.4rem',

                            background: 'url(' + require('static/images/tabbar/item_filter.png') + ') center center /  .4rem .4rem no-repeat',
                            overflow: 'hidden'
                        }}
                        />
                    }
                    title="分类"
                    key="分类"
                    // dot
                    selected={page === 'item'}
                    onPress={() => {

                        changeTab('item')
                        history.push('/item')
                    }}
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '.4rem',
                            height: '.4rem',

                            background: 'url(' + require('static/images/tabbar/car.png') + ') center center /  .4rem .4rem no-repeat',
                            overflow: 'hidden'
                        }}
                        />}
                    selectedIcon={
                        <div style={{
                            width: '.4rem',
                            height: '.4rem',

                            background: 'url(' + require('static/images/tabbar/car_filter.png') + ') center center /  .4rem .4rem no-repeat',
                            overflow: 'hidden'
                        }}
                        />
                    }
                    title="购物车"
                    key="购物车"
                    // dot
                    selected={page === 'buyCar'}
                    onPress={() => {
                        changeTab('buyCar')
                        history.push(`/burCar/${'a'}`)
                    }}
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '.4rem',
                            height: '.4rem',

                            background: 'url(' + require('static/images/tabbar/my.png') + ') center center /  .4rem .4rem no-repeat',
                            overflow: 'hidden'
                        }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '.4rem',
                            height: '.4rem',

                            background: 'url(' + require('static/images/tabbar/my_filter.png') + ') center center /  .4rem .4rem no-repeat',
                        }}
                        />
                    }
                    title="我的"
                    key="我的"
                    // dot
                    selected={page === 'user'}
                    onPress={() => {
                        changeTab('user')
                        // history.push('/user')
                        if (this.state.userInfo=='undefined') {
                            // history.push('/auth')


                            let url=window.location.href

                            url= url.match(/#(\S*)/)[1];

                            url=url.replace('/','')

                            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://www.worldwideapp.chinazjtc.com/app/user/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

                        } else {
                            history.push('/user')

                        }

                    }}
                >
                </TabBar.Item>
            </TabBar>
        )
    }
}


function actionCreate(witchTab) {
    return {
        type: 'CHANGE_TAB',
        payload: {selectedTab: witchTab}
    }
}

export default  connect((state) => ({selectedTab: state.selectedTab}), (dispatch) => ({changeTab: (witchTab) => dispatch(actionCreate(witchTab))}))(TabBarMain);


