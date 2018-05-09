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

        const {data} = this.props

        return (
            <div className="model-four">
                <ul>

                    {
                        data.map((i, k) => (

                            <li
                                key={k}
                                onClick={ ()=>{nativeClick({
                                    type:i.type,
                                    url:i.linked_txt,
                                    id:i.linked_txt,
                                    name:i.remark,
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
