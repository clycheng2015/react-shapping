/**
 * Created by Administrator on 2016/7/1.
 */
import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


import {Icon,SearchBar} from 'antd-mobile'
require('./styles/index.less')
/*actions*/
import * as item from 'actions/item'
import * as global from 'actions/global'
import TabBarMain from 'containers/common/tabbar'
import IndexList from 'components/item/indexList'

@connect(
    state => {
        return {...state.item}
    },
    dispatch => bindActionCreators({...item, ...global}, dispatch)
)
export default class Item extends React.Component {
    // static propTypes = {
    //     list: PropTypes.object,
    // }

    constructor(props) {
        super(props);

        this.state={
            value: '美食',
            focused: false,
        }

    }

    componentDidMount() {
        const {getItemList} = this.props;
        getItemList()
    }

    render() {
        const {list, history} = this.props


        const itemList = () => {

            if (list && list.categories && list.categories.length > 0) {
                return (
                    <IndexList list={list.categories}/>
                )
            } else {

                return (
                    <div style={{width:"100%",textAlign:"center",marginTop:"1rem"}}>
                        <Icon type="loading" />
                    </div>
                )
            }
        }

        return (
            <div className="item-container">
                <SearchBar
                    placeholder="搜索商品,共1200件商品"
                    focused={this.state.focused}
                    // cancelText="确定"
                    onFocus={() => {
                        this.setState({
                            focused: false,
                        });
                    }}
                    onCancel={this._onSearch}
                    onSubmit={value =>

                        history.push(`/search/${value}`)

                    }
                />
                <div className="list-info">
                    {itemList()}
                </div>
                <TabBarMain history={history} page="item"/>
            </div>
        )
    }
}
