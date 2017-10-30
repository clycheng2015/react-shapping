/**
 * Created by bear on 2017/10/20.
 */
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
import IndexList from 'components/item/list'

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


        console.log(list)


        const itemList = () => {

            if (list && list.categories && list.categories.length > 0) {
                return (
                    <IndexList list={list.categories} history={history}/>
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
            <div className="item-container"

            style={{
                height:'auto',
                // height: document.documentElement.clientHeight,

            }}
            >

                <div className="nav"

                     onClick={()=>history.push('/search')}
                >
                    <SearchBar
                        placeholder="上新1200种商品"
                        focused={this.state.focused}
                        // cancelText="确定"
                        onFocus={() => {
                            this.setState({
                                focused: false,
                            });
                        }}

                        disabled

                    />
                </div>

                <div style={{height:"1rem",width:"100%"}}>

                </div>

                <div className="list-info">
                    {itemList()}
                </div>
                <TabBarMain history={history} page="item"/>
            </div>
        )
    }
}
