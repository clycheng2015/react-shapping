/**
 * Created by Administrator on 2016/7/1.
 */
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

            title: ''
        }

    }

    componentDidMount() {
        //
        // const {match, getSearchList, location} = this.props
        // const {params} = match
        // getSearchList({
        //     pagesize: 100,
        //     pagenum: 1,
        //     word: params.value
        // })


    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }


    _search = (v) => {
        const {getSearchList, pagesize, pagenum} = this.props

        getSearchList({
            pagesize: pagesize,
            pagenum: pagenum,
            word: v
        })
    }

    render() {
        const {list, history} = this.props
        console.log(list)
        return (
            <div className="search-list-container">
                <div className="nav-tab">


                    <Icon type="left" size="lg" onClick={() => {
                        history.goBack()
                    }} className='back-icon'/>


                    <div className="s-box">
                        <SearchBar
                            placeholder="搜索"
                            focused={this.state.focused}
                            // cancelText="确定"
                            onFocus={() => {
                                this.setState({
                                    focused: false,
                                });
                            }}
                            // showCancelButton={false}
                            onSubmit={value =>
                                this._search(value)
                            }
                        />
                    </div>


                </div>

                <div className="list">

                    {list && list.length > 0 &&
                    <GoodsList {...this.props}/>}

                </div>

            </div>
        )
    }
}
