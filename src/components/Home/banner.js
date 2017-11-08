/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'
import {Carousel} from 'antd-mobile'

import {getPath} from '../../utils/tools'
class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }


    _click=(i,history)=>{

        switch(i.type){
            case 1:
                history.push(getPath(i.linked_txt))
                break;
            case 2:

                history.push(`/goodsDetail/${i.linked_txt}`)

                break;
            case 3:

                history.push(`/itemList/${i.linked_txt}T${i.title}`)

                break;
            default :
                break
        }
    }
    render() {
        const {data,history} = this.props
        return (
            <Carousel
                className="my-carousel"
                autoplay
                infinite
                selectedIndex={1}
                swipeSpeed={35}
                beforeChange={(from, to) => {
                }}
                afterChange={index => {
                }}
            >
                {data.map((i, key) => (

                    <img key={key} src={i.iconpic} onLoad={() => {
                        this.setState({initialHeight: null,})
                    }}
                         onClick={() => this._click(i,history)}
                    />

                ))}
            </Carousel>

        )

    }

}

export  default Banner
