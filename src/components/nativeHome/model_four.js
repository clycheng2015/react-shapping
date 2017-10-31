import React from 'react'
import {nativeClick} from '../../utils/native-sdk'

class ModelFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {

        const {history, data} = this.props

        console.log(data)
        return (
            <div className="model-four">
                <ul>

                    {
                        data.map((i, k) => (

                            <li
                                key={k}
                                onClick={ ()=>{nativeClick({
                                    type:3,
                                    url:'',
                                    id:'66',
                                    name:'酒水饮料',
                                    activeType:''
                                })}}
                            ><img src={i.iconpic} alt=""/></li>
                        ))

                    }

                </ul>
            </div>


        )

    }

}

export  default ModelFour
