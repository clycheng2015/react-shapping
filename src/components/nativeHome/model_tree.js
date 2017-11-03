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
        const {data}=this.props

        return (
            <div className="model-tree">
                <ul>
                    <li className="bg-img"
                        onClick={()=>{nativeClick({
                            type:data[0].type,
                            url:data[0].linked_txt,
                            id:data[0].linked_txt,
                            name:data[0].remark,
                            activeType:''
                        })}}><img src={data[0].iconpic} alt=""/>
                    </li>



                    <li
                        onClick={ ()=>{nativeClick({
                            type:data[1].type,
                            url:data[1].linked_txt,
                            id:data[1].linked_txt,
                            name:data[1].remark,
                            activeType:''
                        })}}><img src={data[1].iconpic} alt=""/></li>
                    <li
                        onClick={()=>{nativeClick({
                            type:data[2].type,
                            url:data[2].linked_txt,
                            id:data[2].linked_txt,
                            name:data[2].remark,
                            activeType:''
                        })}}
                    ><img src={data[2].iconpic} alt=""/></li>
                </ul>
            </div>


        )

    }

}

export  default ModelTree
