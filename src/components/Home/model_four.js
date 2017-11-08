import React from 'react'


class ModelFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    _click = (i, history) => {

        switch (i.type) {
            case 1:
                history.push(getPath(i.linked_txt))
                break;
            case 2:

                history.push(`/goodsDetail/${i.linked_txt}`)

                break;
            case 3:

                history.push(`/itemList/${i.linked_txt}T${i.remark}`)

                break;
            default :
                break
        }
    }


    render() {

        const {history, data} = this.props
        return (
            <div className="model-four">
                <ul>
                    {
                        data.map((i, k) => (

                            <li key={k}>
                                <img src={i.iconpic} alt="" onClick={() => this._click(i, history)}/>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
export  default ModelFour
