/**
 * Created by bear on 2017/10/26.
 */
import React from 'react'
import {nativeClick} from '../../utils/native-sdk'


class ModelTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {history,data}=this.props
        console.log(data)
        return (


            <div className="model-tree">
                <ul>
                    <li className="bg-img"
                        onClick={()=>{nativeClick({
                            type:'',
                            url:'',
                            id:'',
                            name:'',
                            activeType:''
                        })}}><img src={require('static/images/home/i_A.png')} alt=""/></li>
                    <li
                        onClick={ ()=>{nativeClick({
                            type:3,
                            url:'',
                            id:'66',
                            name:'酒水饮料',
                            activeType:''
                        })}}><img src={require('static/images/home/i_1.png')} alt=""/></li>
                    <li
                        onClick={()=>{nativeClick({
                            type:3,
                            url:'',
                            id:'60',
                            name:'厨卫清洁',
                            activeType:''
                        })}}
                    ><img src={require('static/images/home/i_2.png')} alt=""/></li>
                </ul>
            </div>


        )

    }

}

export  default ModelTree
