
import React from 'react'
import Timer from '../Commons/timer'
import BScroll from 'better-scroll'
import {nativeClick} from '../../utils/native-sdk'


class Active extends React.Component {
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

        new BScroll(this.swiper, options)

    }
    render() {
        const {data}=this.props
        return (
            <div className="active-info">
                <div className="skill-head">
                    <div className="name">
                        <img src={require('static/images/skill_title.png')} alt=""/>

                    </div>
                    <div className="timer">
                        <span className="title">活动结束时间</span>
                        <div className="count-info">
                            <Timer
                                date={new Date(parseInt(data.endtime)).toISOString()}
                                // date="2017-11-10T00:00:00+00:00"
                                days={{plural: 'Days ', singular: 'day '}}
                                hours=':'
                                mins=':'
                                segs=''
                            />
                        </div>


                    </div>

                </div>

                <div className="skill-active" style={{width: "100%"}} ref={(el) => this.swiper = el}>

                    <ul className="" style={{width: `${( data.goodsSimpleDtos.length+2)*1.5}rem`}}>

                        {
                            data.goodsSimpleDtos.map((i, key) => (

                                <li className="" key={key}
                                    onClick={() =>nativeClick(
                                        {
                                            type:2,
                                            url:'',
                                            id:i.good_id,
                                            name:i.name,
                                            activeType:i.type
                                        }

                                    )}>
                                    <div className="img-info">

                                        <img src={i.pic} alt=""/>

                                    </div>
                                    <div className="price-info">
                                        <p>￥{i.price}</p>
                                        <p>￥{i.originalPrice}</p>
                                    </div>
                                </li>
                            ))
                        }

                        {/*<li className="more swiper-slide">*/}

                            {/*<div className="box" onClick={() => nativeClick(*/}
                                {/*{*/}
                                    {/*type:1,*/}
                                    {/*url:'http://mlg.vo01.cn/nativeHome/index.html/#/doubleActive',*/}
                                    {/*id:'',*/}
                                    {/*name:'秒杀活动',*/}
                                    {/*activeType:''*/}
                                {/*}*/}

                            {/*)}>*/}
                                {/*查看更多*/}
                            {/*</div>*/}

                        {/*</li>*/}


                    </ul>
                </div>
            </div>
        )

    }

}

export  default Active
