import React from 'react'


class ModelFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {

        const {history, data} = this.props
        return (
            <div className="model-four">
                <ul>

                    {
                        data.map((i, k) => (

                            <li
                                key={k}
                                onClick={() => history.push({
                                    pathname: `/itemList/66`,
                                    state: {title: '酒水饮料'}

                                })}><img src={i.iconpic} alt=""/></li>
                        ))

                    }

                </ul>
            </div>


        )

    }

}

export  default ModelFour
