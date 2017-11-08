

import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as doubleActive from 'actions/doubleActive'
import { Icon, Flex,ListView, List } from 'antd-mobile';

import './style/doubleActive.less';
import DoubleActiveA from '../../components/active/doubleActive'


@connect(
    state => {
        return {...state.doubleActive}
    },
    dispatch => bindActionCreators({...doubleActive}, dispatch)
)

export default class DoubleActive extends React.Component{
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    componentDidMount(){

    }

    render(){

        const{history}=this.props

        return(
            <div className='double-content'>
                <div className='nav-tab'>
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">双十一活动</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div className='double-box'>
                    <div className='banner'><img src={require('static/images/doubleActive/banner.jpg')} alt=""/></div>
                    <div className='recharge'>
                        <img src={require('static/images/doubleActive/active.png')} alt=""/>
                        <img src={require('static/images/doubleActive/500.png')} alt=""/>
                    </div>
                    <DoubleActiveA {...this.props}/>
                </div>
            </div>

        )
    }

}

