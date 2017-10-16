/**
 * Created by bear on 2017/9/9.
 */

import React from 'react'

import {Carousel, WhiteSpace, WingBlank} from 'antd-mobile'


import {Link} from "react-router-dom"


class Banner extends React.Component {
    state = {
        data: [],
        initialHeight: 300,
    }

    componentDidMount() {
        const {list} = this.props
        this.setState({
            data: list
        })
    }

    _getPath = (history, data, tab) => {

        console.log(data)

        if (data.type == 'GOODS') {
            if (tab == '推荐') {
                history.push(`/goodsDetail/${data.good_id}`)
            } else {

                history.push(`/goodsDetail/${data.id}`)
            }


        }


        if (data.type == 'CATEGORY') {

            history.push(`/itemList/${data.id}`)

        }

        if (data.type == 'SECKILL') {


            history.push(`/active/${data.id}`)

        }

        else {

            history.push(`/goodsDetail/${data.id}`)
        }


    }

    render() {
        const {tab, history, list} = this.props
        const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {}
        if (list && list.length > 1) {
            return (
                <div>


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
                                {list.map((i, key) => (

                                    <img key={key} src={i.flashpic} onLoad={() => {
                                        this.setState({initialHeight: null,})
                                    }}

                                         onClick={() => this._getPath(history, i, tab)}
                                    />

                                ))}
                            </Carousel>


                </div>
            )
        } else if (list.length === 1) {

            return (

                <div className="my-carousel" style={{width: '100%'}}>


                            <img src={list[0].flashpic} alt="" style={{width: '100%'}}

                                 onClick={() => this._getPath(history, list[0], tab)}/>

                </div>
            )
        } else {

            return (

                <div className="my-carousel">

                </div>
            )
        }
    }

}

export  default Banner
