import React from 'react'
import {Flex} from 'antd-mobile'
import {nativeClick} from '../../utils/native-sdk'

class ModelTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {

        const {data} = this.props



        return (
            <Flex className="model-two">
                {
                    data.map((i, k) => (
                        <Flex.Item key={k}>
                            <img src={i.iconpic} alt=""
                                 onClick={()=>{nativeClick({
                                     type:i.type,
                                     url:i.linked_txt,
                                     id:i.linked_txt,
                                     name:i.remark,
                                     activeType:''
                                 })}}
                            />
                        </Flex.Item>
                    ))
                }


            </Flex>



        )

    }

}

export  default ModelTwo
