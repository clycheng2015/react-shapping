/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon, Flex} from 'antd-mobile'

import * as active from 'actions/active'
require('./style/index.less')
import {nativeClick} from '../../utils/native-sdk'
import ActiveContent from '../../components/active/avtive_20170928'

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
        document.title = '活动中心';

    }

    render() {
        const {history, list} = this.props

        return (
            <div className="active-container" ref='wrapper'

                 style={{
                     // minHeight: document.documentElement.clientHeight,
                     // background: "#f3f3f1"
                 }}
            >


                <ActiveContent {...this.props}/>
            </div>
        )
    }
}
