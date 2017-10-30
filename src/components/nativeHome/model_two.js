import React from 'react'
import {Flex} from 'antd-mobile'

class ModelTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {

        const {history, data} = this.props
        return (
            <Flex className="model-two">
                {
                    data.map((i, k) => (
                        <Flex.Item key={k}>
                            <img src={i.iconpic} alt=""
                                 onClick={() => history.push('/newPer')}/>
                        </Flex.Item>
                    ))
                }


            </Flex>



        )

    }

}

export  default ModelTwo
