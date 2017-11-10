


import React from 'react';

import {Icon, Flex} from 'antd-mobile'
import './style/style.less';



export default class JoinUs extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
        }

    }
    componentDidMount(){
        // this.props.getActiveList({});
        // this.props.getNameList({pagesize:0,pagenum:100,cid:12})

    }

    render(){
        const {data,history} = this.props


        return(
            <div className='new-exclusive'>
                <div className='nav-tab'>

                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">加盟店专区</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div style={{overflow:'hidden'}}><img src={require('static/image/joinUs.png')} style={{width:"7.5rem",marginTop:'0.9rem',float:'left'}} alt=""/></div>


            </div>
        )
    }

}

