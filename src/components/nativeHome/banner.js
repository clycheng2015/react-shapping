/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'
import {Carousel} from 'antd-mobile'

const data = [

    {img: require('static/images/home/banner.png')},
    {img: require('static/images/home/banner1.jpg')},

]
class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }

    render() {

        const {data}=this.props

        return(
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
                    />

                ))}
            </Carousel>

        )

    }

}

export  default Banner
