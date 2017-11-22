/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {SearchBar, Flex, Icon,List,SwipeAction} from 'antd-mobile'
import GoodsList from '../../components/Commons/goodsList'

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
            value: '美食',
            Harr:AppLocalStorage.Cache.get('Hsearch').data||[]
        }

    }

    componentDidMount() {
        // this.autoFocusInst.focus();
    }

    _search = (v) => {
        const {getSearchList, history} = this.props;
        this.state.Harr.push(v)
        AppLocalStorage.Cache.put('Hsearch', {data: this.state.Harr},9999999999999999999999 )

        // history.push('/searchList')
        // getSearchList({
        //     pagesize: 20,
        //     pagenum: 1,
        //     word: v
        // })
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


    _delHistory=()=>{
        AppLocalStorage.Cache.clear()
        this.setState({
            Harr:[]
        })
    }
    _delOne=(v)=>{
        this.state.Harr.forEach((i,k)=>{
            if(i===v){this.state.Harr.splice(k)}
        })
        this.setState({Harr:this.state.Harr})
        AppLocalStorage.Cache.put('Hsearch', {data: this.state.Harr},9999999999999999999999 )
    }
    render() {
        const {list, history, isFetching, hasMore} = this.props
        return (
            <div className="search-list-container" style={{backgroundColor: "white",minHeight: document.documentElement.clientHeight}}>

                {/*<div className="nav-tab">*/}
                {/*/!*<Icon type="left" size="lg" onClick={() => {history.goBack()}} className='back-icon'/>*!/*/}


                {/*<div className="s-c-box">*/}

                {/*<SearchBar placeholder="搜索"*/}
                {/*focused={this.state.focused}*/}
                {/*onFocus={() => {*/}
                {/*this.setState({*/}
                {/*focused: false,*/}
                {/*});*/}
                {/*}}*/}
                {/*onSubmit={value =>*/}
                {/*this._search(value)*/}
                {/*}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*</div>*/}

                <div className="nav-s">
                    <SearchBar

                        placeholder="进口，美食，母婴，美妆"
                        focused={this.state.focused}
                        onSubmit={value => this._search(value)}
                        onClear={value => console.log(value, 'onClear')}
                        onFocus={() => {
                            this.setState({focused: false,});
                        }}
                        onBlur={() => console.log('onBlur')}
                        onCancel={() => console.log('onCancel')}
                        showCancelButton
                        onChange={this.onChange}
                    />
                </div>

                <div className="hot-s">

                    <p>热搜</p>
                    <ul>
                        <li>进口</li>
                        <li>美食</li>
                        <li>母婴</li>
                        <li>美妆</li>
                    </ul>
                </div>
                <div style={{height:".2rem",backgroundColor:"#f3f3f1"}}/>
                <div className="his-info">
                    <p>历史搜索</p>
                    {
                        this.state.Harr.map((i,k)=>(
                            <SwipeAction
                                key={k}
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () => this._delOne(i),
                                        style: { backgroundColor: '#F4333C', color: 'white' },
                                    },
                                ]}

                                onOpen={() => console.log('global open')}
                                onClose={() => console.log('global close')}
                            >
                                <List.Item onClick={e => console.log(e)}>
                                    {i}
                                </List.Item>
                            </SwipeAction>

                        ))
                    }

                    {
                        this.state.Harr.length>0&&
                            <div className="del-s" onClick={()=>this._delHistory()}>
                                清空历史记录
                            </div>
                    }
                </div>

            </div>
        )
    }
}

