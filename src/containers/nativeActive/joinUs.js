


import React from 'react';

import {Icon, Flex} from 'antd-mobile'
import './style/style.less';



export default class Index extends React.Component{
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

                <div style={{overflow:'hidden'}}><img src={require('static/image/joinUs.png')} style={{width:"7.5rem",marginTop:'0.9rem',float:'left'}} alt=""/></div>


            </div>
        )
    }

}

