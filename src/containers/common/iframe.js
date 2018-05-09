/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {Icon,Flex} from 'antd-mobile'
import './styles/iframe.less'

export default class WebIframe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const { history,location} = this.props

        console.log(location)
        return (
            <div className="iframe-container" ref='wrapper' style={{minHeight: document.documentElement.clientHeight, background: "#f3f3f1"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">{location.state.title}</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div style={{height:'.9rem'}}/>
                <div className="txt-info">
                    <iframe src={location.state.aurl}  style={{width:'100%',height: document.documentElement.clientHeight,border:"none"}}/>
                </div>
            </div>
        )
    }
}
