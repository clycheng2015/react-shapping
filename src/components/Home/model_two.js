
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

        const {history}=this.props
        return (


            <Flex className="model-two">
                <Flex.Item>
                    <img src={require('static/images/home/newUser.png')} alt=""
                         onClick={() => history.push('/newPer')}/>
                </Flex.Item>
                <Flex.Item>
                    <img src={require('static/images/home/newDay.png')} alt=""
                         onClick={() => history.push('/newDay')}/>
                </Flex.Item>
            </Flex>



        )

    }

}

export  default ModelTwo
