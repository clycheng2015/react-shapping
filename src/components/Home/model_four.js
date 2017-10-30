
import React from 'react'


class ModelFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {

        const {history}=this.props
        return (
            <div className="model-four">
                <ul>
                    <li
                        onClick={() => history.push({
                            pathname: `/itemList/66`,
                            state: {title: '酒水饮料'}

                        })}><img src={require('static/images/home/i_1.png')} alt=""/></li>
                    <li
                        onClick={() => history.push({
                            pathname: `/itemList/60`,
                            state: {title: '厨卫清洁'}

                        })}
                    ><img src={require('static/images/home/i_2.png')} alt=""/></li>
                    <li
                        onClick={() => history.push({
                            pathname: `/itemList/66`,
                            state: {title: '酒水饮料'}

                        })}><img src={require('static/images/home/i_1.png')} alt=""/></li>
                    <li
                        onClick={() => history.push({
                            pathname: `/itemList/60`,
                            state: {title: '厨卫清洁'}

                        })}
                    ><img src={require('static/images/home/i_2.png')} alt=""/></li>
                </ul>
            </div>


        )

    }

}

export  default ModelFour
