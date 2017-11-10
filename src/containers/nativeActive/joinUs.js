


import React from 'react';

import {Icon, Flex} from 'antd-mobile'
import './style/style.less';


import {nativeClick} from '../../utils/native-sdk'
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

        document.title = '加盟店专区';

    }

    render(){
        const {data,history} = this.props


        return(
            <div className='new-exclusive'>

                <div style={{overflow:'hidden'}}><img src={require('static/image/joinUs.png')} style={{width:"7.5rem",float:'left'}} alt=""/></div>


            </div>
        )
    }

}

