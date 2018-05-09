/**
 * Created by Administrator on 2016/7/1.
 */
import React, {PropTypes}from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Tabs, Icon, SearchBar, Button} from 'antd-mobile'
import * as home from '../../actions/home'
import getSize from '../../utils/getSize'
import List from 'components/Home/newList'
import TabBarMain from 'containers/common/tabbar'
require('./styles/index.less')

@connect(
    state => {
        return {...state.home}
    },
    dispatch => bindActionCreators({...home}, dispatch)
)
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
    }


    componentDidMount() {
        const {pagenum, pagesize, cid, tabs, tab, getHomeList, getTabs, isFetching} = this.props
        if (tabs.length === 0) {

            getTabs()
        }

    }


    componentWillReceiveProps(nextProps) {

        const {pagenum, pagesize, cid, success, isFetching, tab, getHomeList, homeList} = nextProps
        // && ! homeList[tab]
        if (!isFetching && !success && tab != this.props.tab && !homeList[tab]) {

            getHomeList(tab, {pagesize: pagesize, pagenum: pagenum, cid: cid})


        }

    }


    _change = (tab, index) => {

        const {tabChange} = this.props
        let {scrollT} = getSize();

        console.log(scrollT)

        tabChange(tab.title, tab.cid, index)

    }

    render() {
        const {list, tabs, location, history, success, homeList, tab, isFetching, tabIndex, pagenum, pagesize, cid, getHomeList} = this.props
        console.log(this.props)


        const cnt = () => {

            if (homeList[tab]) {
                // console.log("2132")
                return (

                    <List list={homeList[tab]} tab={tab} pagesize={homeList[tab].pagesize} isFetching={isFetching}
                          history={history} pagenum={homeList[tab].pagenum} cid={cid} getHomeList={getHomeList}/>

                )
            } else {

                return (<div style={{width: "100%", textAlign: "center", marginTop: ".1rem"}}>

                    {/*<Icon type="loading"/>*/}
                </div>)
            }


        }
        return (
            <div className="home-container"

                 style={{

                     minHeight: document.documentElement.clientHeight,
                     background: "#f3f3f1"
                 }}
            >

                <div key={location.pathname}>
                    {/*<Slider images={imgArray}/>*/}

                    <div style={{
                        background:"white"
                    }}>
                        {/*<img src={require('static/image/')} alt=""/>*/}
                        <div style={{
                            float:"left",

                        }}>
                            <img src={require('static/image/logo_head.png')} alt="" style={{

                                width:"1.5rem",
                                display:"inline-block",
                                marginLeft:".2rem",
                                marginTop:".15rem",
                            }}/>
                        </div>


                            <SearchBar
                                placeholder="搜索商品,共1200件商品"
                                focused={this.state.focused}
                                showCancelButton={false}
                                style={{

                                    width: "60%",

                                }}

                                onFocus={() => {
                                    this.setState({
                                        focused: false,
                                    });
                                }}
                                // onCancel={this._onSearch}
                                onSubmit={value =>

                                    history.push(`/search/${value}`)

                                }
                            />
                    </div>
                    <div className="tabs" style={{

                        minHeight: document.documentElement.clientHeight,
                        // paddingBottom: "1rem"
                    }}>
                        {
                            tabs && tabs.length>0&&

                                <div>

                                    <Tabs
                                        swipeable={false}
                                        initialPage={tabIndex}
                                        tabs={tabs}
                                        // tabBarUnderlineStyle
                                        tabBarActiveTextColor='black'
                                        // destroyInactiveTabPane={true}
                                        onChange={this._change}
                                    >
                                        {/*{cnt()}*/}

                                    </Tabs>
                                    {cnt()}
                                </div>


                        }

                    </div>

                </div>
                <TabBarMain history={history} page="/"/>
            </div>
        )


    }

}
