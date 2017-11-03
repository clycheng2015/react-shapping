/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'
import {Carousel} from 'antd-mobile'
import {nativeClick} from '../../utils/native-sdk'

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {data}=this.props

        console.log(data)

        return (
            <div className="news">
                <div className="left"><span className="title">美纶购<span className="exp">公告</span></span></div>

                <div className="list">
                    <Carousel className="my-carousel"
                              vertical
                              dots={false}
                              dragging={false}
                              swiping={false}
                              autoplay
                              infinite
                    >


                        {
                            data.headLineDtoItems.map((i,k)=>(

                                <div className="v-item" key={k} onClick={()=>nativeClick({
                                    type:1,
                                    url:i.linked_txt,
                                    id:i.id,
                                    name:i.title,
                                    activeType:''

                                })}>{i.title}</div>

                            ))
                        }
                    </Carousel>
                </div>
                {/*<div className="more">*/}
                {/*<span>丨 更多</span>*/}
                {/*</div>*/}
            </div>


        )

    }

}

export  default News
