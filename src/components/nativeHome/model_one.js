/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'
import {nativeClick} from '../../utils/native-sdk'

class ModelOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {data }=this.props

        console.log(data)
        return (
            <div className="model-one">
                <img src={data[0].iconpic} alt=""
                     onClick={()=>{nativeClick({
                         type:data[0].type,
                         url:'',
                         id:'',
                         name:'',
                         activeType:''
                     })}}
                />
            </div>

        )

    }

}

export  default ModelOne
