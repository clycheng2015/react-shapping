
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

    _updownMore = () => {
        const {pagenum, isFetching, hasMore, getSearchList, pagesize, word,match} = this.props
        if (isFetching || !hasMore) {
            return;
        }
        let num = pagenum
        let data = {
            pagesize: pagesize,
            pagenum: ++num,
            isown:match.params.id,
        }
        if (word !== '') {data = {...data, word: word}}
        getSearchList(data)
    }

    render() {
        const {list, history, isFetching, hasMore,word} = this.props

        return (
            <div className="search-list-container"
                 style={{
                     height: document.documentElement.clientHeight - 100,
                     background: "#f7f6f6"
                 }}
            >
                <div className="nav-tab">
                    <Icon type="left" size="lg" onClick={() => {history.goBack()}} className='back-icon'/>
                    <div className="s-box" onClick={()=>history.replace('/searchList')}>
                        <SearchBar placeholder={word} disabled/>
                    </div>
                </div>
                <div className="list">
                    {list && list.length > 0 ? <GoodsList list={list} history={history} isFetching={isFetching} hasMore={hasMore} loadMore={this._updownMore}/>:
                        <div className="empty-info"
                             style={{
                                 height: document.documentElement.clientHeight - 130,
                                 background: "#f7f6f6"
                             }}
                        >
                            <img src={require('static/images/empty/tmp_shopcar@2x.png')} alt=""/>
                            <p>未找到您的宝贝儿~</p>
                        </div>
                    }

                </div>
            </div>
        )
    }
}
