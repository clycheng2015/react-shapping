
import React from 'react'
import BScroll from 'better-scroll'
import {nativeClick} from '../../utils/native-sdk'
class ModelFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {


        const options = {
            scrollY: false,
            scrollX: true,
            eventPassthrough: 'vertical' // 因为scrollY默认为true，其实可以省略
        }
        new BScroll(this.shop, options)
    }
    render() {
        const {history ,data,linkedDtos}=this.props


        return (
                <div className="model-five" ref={el => this.shop = el} style={{width: "100%"}}>
                    <ul style={{width: `${(data.length+3)*2}rem`}}>
                        {
                            data.map((i, index) => (
                                <li className="" key={index}
                                    onClick={ ()=>{nativeClick({
                                        type:i.type,
                                        url:i.linked_txt,
                                        id:i.linked_txt,
                                        name:i.remark,
                                        activeType:''
                                    })}}
                                >
                                    <div className="img-info">
                                        <img src={i.pic} alt=""/>
                                    </div>

                                    <div className="txt-info">
                                        <p className="title">
                                            {i.name}
                                        </p>
                                        <p className="price">￥{i.price}</p>
                                    </div>

                                </li>
                            ))
                        }
                        <li className="more">

                            <div className="box"
                                 onClick={ ()=>{nativeClick({
                                     type:linkedDtos.type,
                                     url:linkedDtos.linked_txt,
                                     id:linkedDtos.linked_txt,
                                     name:linkedDtos.remark,
                                     activeType:''
                                 })}}>
                                查看更多
                            </div>

                        </li>

                    </ul>

            </div>
        )

    }

}

export  default ModelFour
