/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {SearchBar, Flex, Icon, List, SwipeAction, Toast} from 'antd-mobile'
import GoodsList from '../../components/Commons/goodsList'
import  BScroll from 'better-scroll'

import {AppLocalStorage} from '../../utils/cookie'
/*actions*/
const Item = List.Item;
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
            focused: true,
            value: '',
            Harr: AppLocalStorage.Cache.get('Hsearch') && AppLocalStorage.Cache.get('Hsearch').data || [],

        }

        this.hotArr = ["进口", "幼儿", "奶粉", "纸尿裤", "康力士", "护手霜", "润肤", "零食"]
        this.inputHotArr = ["进口", "幼儿", "  奶粉", "纸尿裤"]

    }

    componentDidMount() {
        const options = {
            scrollY: false,
            scrollX: true,
            eventPassthrough: 'vertical' // 因为scrollY默认为true，其实可以省略
        }
        new BScroll(this.hot, options)
    }

    _search = (v) => {

        if (v === '') {
            Toast.info('亲，请输入您要找的宝贝~',1)
            return false
        }
        const {getSearchList, history} = this.props;
        let Harr = this.state.Harr
        Harr.push(v.replace(/\s+/g, ""))

        Harr = Array.from(new Set(Harr))

        this.setState({Harr: Harr}, () => {
            AppLocalStorage.Cache.put('Hsearch', {data: Harr}, 9999999999999999999999)
            getSearchList({pagesize: 20, pagenum: 1, word: v})
            history.replace(`/search/${v}`)
        })

    }
    _hotWord = () => {
        let word = this.inputHotArr.join(',')
        return word
    }
    _delHistory = () => {
        this.setState({Harr: []}, () => {
            AppLocalStorage.Cache.remove('Hsearch')
        })
    }
    _delOne = (v) => {
        let Harr = this.state.Harr
        Harr.forEach((i, k) => {
            if (i === v) {
                Harr.splice(k)
            }
        })
        this.setState({Harr: Harr}, () => {
            AppLocalStorage.Cache.put('Hsearch', {data: Harr}, 9999999999999999999999)
        })
    }
    onChange = (v) => {

        this.setState({value: v})

    }

    render() {
        const {list, history, isFetching, hasMore} = this.props
        return (
            <div className="search-list-container"
                 style={{backgroundColor: "white", minHeight: document.documentElement.clientHeight}}>
                <div className="nav-s">
                    <SearchBar
                        placeholder={this._hotWord()}
                        focused={this.state.focused}
                        value={this.state.value}
                        onSubmit={value => this._search(value)}
                        onClear={value => () => this.setState({value: ''})}
                        onFocus={() => {
                            this.setState({focused: false,});
                        }}
                        onBlur={() => console.log('onBlur')}
                        onCancel={() => this.setState({value: ''}, () => {
                            history.goBack()
                        })}
                        showCancelButton
                        onChange={this.onChange}
                    />
                </div>
                <div className="hot-s">
                    <p>热搜</p>
                    <div ref={el => this.hot = el}
                         style={{width: document.documentElement.clientWidth, overflow: 'hidden'}}>

                        <ul style={{
                            width: `${this.hotArr.length * (1.6)}rem`,
                            minWidth: document.documentElement.clientWidth + 1
                        }}>{this.hotArr.map((i, k) => (<li key={k} onClick={(() => this._search(i))}>{i}</li>))}</ul>
                    </div>
                </div>
                <div style={{height: ".2rem", backgroundColor: "#f3f3f1"}}/>
                <div className="his-info">
                    <p>历史搜索</p>
                    {
                        this.state.Harr.map((i, k) => (
                            <SwipeAction
                                key={k}
                                style={{backgroundColor: 'gray'}}
                                autoClose
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () => this._delOne(i),
                                        style: {backgroundColor: '#F4333C', color: 'white'},
                                    },
                                ]}

                                onOpen={() => console.log('global open')}
                                onClose={() => console.log('global close')}
                            >
                                <List.Item onClick={() => this._search(i)}>
                                    {i}
                                </List.Item>
                            </SwipeAction>

                        ))
                    }
                    {
                        this.state.Harr.length > 0 &&
                        <div className="del-s" onClick={() => this._delHistory()}>
                            清空历史记录
                        </div>
                    }
                </div>

            </div>
        )
    }
}

