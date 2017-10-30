/**
 * Created by bear on 2017/10/26.
 */
import React from 'react'


class ModelTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {history}=this.props
        return (


            <div className="model-tree">
                <ul>
                    <li className="bg-img"
                        onClick={() => history.push({
                            pathname: `/imported`,

                        })}><img src={require('static/images/home/i_A.png')} alt=""/></li>
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

export  default ModelTree
