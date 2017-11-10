/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {Icon,Flex} from 'antd-mobile'
import './styles/web.less'

export default class WebTxt extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { history,location} = this.props

        const {state}=location

        console.log(location)

        return (
            <div className="web-container" ref='wrapper' style={{minHeight: document.documentElement.clientHeight, background: "#f3f3f1"}}>
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">{state.name}</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div style={{height: '1rem'}}/>
                <div className="txt-info">


                    <div dangerouslySetInnerHTML={{__html:state.cnt}}/>
                </div>
            </div>
        )
    }
}
