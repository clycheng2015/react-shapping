import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import BScroll from 'better-scroll'
import {Tabs, WhiteSpace, Icon, SearchBar} from 'antd-mobile';
require('./styles/index.less')
import * as item from 'actions/item'
import TabBarMain from 'containers/common/tabbar'
import IndexList from 'components/item/list'

@connect(
    state => {
        return {...state.item}
    },
    dispatch => bindActionCreators({...item,}, dispatch)
)

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            tab: 0
        }
    }

    componentDidMount() {
        const {getItemList,scrollT} = this.props;

        window.scrollTo(0,scrollT)
        getItemList()

        // const options = {
        //     scrollY: true,
        //     scrollX: false,
        //     // eventPassthrough: 'vertical' // 因为scrollY默认为true，其实可以省略
        // }
        // new BScroll(this.indexList, options)

    }

    _getTabs = () => {
        const {list, history} = this.props;
        let tabs = list.categories.map((i) => {
                return {title: i.name}
            }) || [];

        return tabs
    }

    _changeTab = (v, i) => {
        const {tabChange, dataH, recordScroll} = this.props
        tabChange(v.title, i)
        let scollH = 0
        dataH.map(i=>{if(Object.keys(i)[0]===v.title){scollH=i[v.title]}})

        window.scrollTo(0, scollH)



    }

    render() {
        const {list, history, tabIndex, scrollTabH,tabChange,recordScroll} = this.props

        return (
            <div className="item-container">
                <div className="nav" onClick={() => history.push('/search')}>
                    <SearchBar placeholder="上新1200种商品" focused={this.state.focused} disabled/>
                </div>
                <div style={{height: "1rem", width: "100%"}}/>

                {list && list.categories && list.categories.length > 0 &&
                <div>
                    <div style={{height: document.documentElement.clientHeight - 100}} className="index-list-info">
                        <div
                            style={this._getTabs().length > 12 ? {height: document.documentElement.clientHeight - 100} : {height: `${this._getTabs().length}rem`}}
                            className="index-list">
                            <Tabs.DefaultTabBar
                                tabs={this._getTabs()}
                                tabBarPosition="left"
                                tabDirection="vertical"
                                page={12}
                                activeTab={tabIndex}
                                animated={true}
                                onTabClick={((v, i) => {
                                    this._changeTab(v, i)
                                })}
                            />
                        </div>
                    </div>

                    <div className="list-cnt-info">
                        <div className="list-info">
                            <IndexList list={list.categories} history={history} scrollTabH={scrollTabH} tabIndex={tabIndex} tabChange={tabChange} recordScroll={recordScroll}/>
                        </div>
                    </div>
                </div>

                }
                <div style={{height: "1rem", width: "100%"}}/>
                <TabBarMain history={history} page="item"/>
            </div>
        )
    }
}
