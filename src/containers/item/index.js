import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon, SearchBar} from 'antd-mobile'
require('./styles/index.less')
import * as item from 'actions/item'
import TabBarMain from 'containers/common/tabbar'
import IndexList from 'components/item/treList'
@connect(
    state => {
        return {...state.item}
    },
    dispatch => bindActionCreators({...item, }, dispatch)
)
export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        }
    }
    componentDidMount() {
        const {getItemList} = this.props;
        getItemList()
    }
    render() {
        const {list, history} = this.props
        return (
            <div className="item-container" style={{height: 'auto',}}>
                <div className="nav" onClick={() => history.push('/search')}>
                    <SearchBar placeholder="上新1200种商品" focused={this.state.focused} disabled/>
                </div>
                <div style={{height: "1rem", width: "100%"}}/>
                <div className="list-info">
                    {list && list.categories && list.categories.length > 0&&<IndexList list={list.categories} history={history}/>}
                </div>
                <TabBarMain history={history} page="item"/>
            </div>
        )
    }
}
