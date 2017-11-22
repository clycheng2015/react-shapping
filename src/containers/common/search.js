
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {SearchBar, Flex, Icon} from 'antd-mobile'
import GoodsList from '../../components/Commons/goodsList'
/*actions*/

import * as global from 'actions/global'
import * as search from 'actions/search'
require('./styles/search.less')
@connect(
    state => {
        return {...state.search}
    },
    dispatch => bindActionCreators({...search, ...global}, dispatch)
)
export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            focused:false
        }
    }
    _search = (v) => {
        const {getSearchList} = this.props
        getSearchList({
            pagesize: 20,
            pagenum: 1,
            word: v
        })
    }

    _updownMore = () => {
        const {pagenum, isFetching, hasMore, getSearchList, pagesize, word} = this.props
        if (isFetching || !hasMore) {
            return;
        }
        let num = pagenum
        let data = {pagesize: pagesize, pagenum: ++num,}
        if (word !== '') {data = {...data, word: word}}
        getSearchList(data)
    }

    render() {
        const {list, history, isFetching, hasMore} = this.props
        return (
            <div className="search-list-container"
                 style={{
                     height: document.documentElement.clientHeight - 100,
                     background: "#f7f6f6"
                 }}
            >
                <div className="nav-tab">
                    <Icon type="left" size="lg" onClick={() => {history.goBack()}} className='back-icon'/>
                    <div className="s-box">
                        <SearchBar placeholder="搜索"
                                   focused={this.state.focused}
                                   onFocus={() => {
                                       this.setState({
                                           focused: false,
                                       });
                                   }}
                                   onSubmit={value =>
                                       this._search(value)
                                   }
                        />
                    </div>
                </div>
                <div className="list">
                    {list && list.length > 0 &&
                    <GoodsList
                        list={list}
                        history={history}
                        isFetching={isFetching}
                        hasMore={hasMore}
                        loadMore={this._updownMore}
                    />
                    }
                </div>
            </div>
        )
    }
}
