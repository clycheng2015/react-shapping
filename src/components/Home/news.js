/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'
import {Carousel} from 'antd-mobile'

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {data,history}=this.props
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

                                <div className="v-item" key={k}
                                     onClick={()=>history.push({
                                         pathname:"/webTxt",
                                         state:{
                                             cnt:i.linked_txt,
                                             name:i.title,
                                         }
                                     })}
                                >{i.title}</div>

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
