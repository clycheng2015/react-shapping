import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {SearchBar, Flex, Icon} from 'antd-mobile'
import GoodsList from '../../components/Commons/codeList'
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
export default class QRCodeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            focused: false
        }
    }

    componentDidMount() {
        const {getSearchList, match} = this.props
        const {params} = match
        getSearchList({
            pagesize: 20,
            pagenum: 1,
            word: params.id || ''
        })

    }

    _updownMore = () => {
        const {pagenum, isFetching, hasMore, getSearchList, pagesize, word} = this.props
        if (isFetching || !hasMore) {
            return;
        }
        let num = pagenum
        let data = {pagesize: pagesize, pagenum: ++num,}
        if (word !== '') {
            data = {...data, word: word}
        }
        getSearchList(data)
    }

    render() {
        const {list, history, isFetching, hasMore} = this.props
        return (
            <div className="search-list-container"
                 style={{
                     height: document.documentElement.clientHeight - 200,
                     background: "#f7f6f6"
                 }}
            >
                <div className="nav-tab-code">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.push('/')
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">扫描结果</Flex.Item>
                        <Flex.Item className="item-head right"></Flex.Item>
                    </Flex>
                </div>
                <div className="list">
                    {list && list.length > 0 ?
                    <GoodsList
                        list={list}
                        history={history}
                        isFetching={isFetching}
                        hasMore={hasMore}
                        loadMore={this._updownMore}
                    />
                        :
                        <div className="empty-info"
                             style={{
                                 height: document.documentElement.clientHeight - 200,
                                 background: "#f7f6f6"
                             }}
                        >
                            <img src={require('static/images/empty/tmp_shopcar@2x.png')} alt=""/>
                            <p> 好可惜，未找到您的宝贝~</p>
                            <p onClick={() => {
                                history.push("/")
                            }}> 去逛逛</p>
                        </div>
                    }


                </div>
            </div>
        )
    }
}
