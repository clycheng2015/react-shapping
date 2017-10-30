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
        const {data }=this.props
        return (
            <div className="model-one">
                <img src={data[0].iconpic} alt=""/>
            </div>

        )

    }

}

export  default ModelOne
