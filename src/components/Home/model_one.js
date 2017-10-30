/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'


class ModelOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {history}=this.props
        return (
            <div className="model-one">
                <img src={require('static/images/pp.png')} alt=""/>
            </div>

        )

    }

}

export  default ModelOne
