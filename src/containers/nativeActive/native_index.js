/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon, Flex} from 'antd-mobile'

import * as active from 'actions/active'
require('./style/index.less')

import ActiveContent from '../../components/active/native_active_20170928'

@connect(
    state => {
        return {...state.active}
    },
    dispatch => bindActionCreators({...active}, dispatch)
)
export default class Active extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
        }
    }
    componentDidMount() {
        document.title = '美纶购秒杀活动';
    }
    render() {
        return (
            <div className="active-container" ref='wrapper'

                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: 'white'
                 }}
            >


                <ActiveContent {...this.props}/>
            </div>
        )
    }
}
