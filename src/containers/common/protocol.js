/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Accordion, List, Icon, Flex} from 'antd-mobile';
import * as protocol from 'actions/protocol'
require('./styles/pro.less')

@connect(
    state => {
        return {...state.protocol}
    },
    dispatch => bindActionCreators({...protocol}, dispatch)
)
export default class Protocol extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }


    }
    componentDidMount() {
        const {fetchProtocol,match,list,protocol} = this.props
        const{params}=match

        if(! protocol[list[params.id].type]){

            fetchProtocol({type:list[params.id].type})
        }
    }

    render() {
        const {protocol,list,match,history} = this.props
        const{params}=match


        return (
            <div className="web-container" ref='wrapper' style={{minHeight: document.documentElement.clientHeight}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">{list[params.id].title}</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div style={{height: '1rem'}}/>
                <div className="txt-info">

                    {protocol&&protocol[list[params.id].type]&& <div dangerouslySetInnerHTML={{__html:protocol[list[params.id].type].content}}/>}

                </div>
            </div>
        )
    }
}
