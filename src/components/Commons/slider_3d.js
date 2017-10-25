/**
 * Created by bear on 2017/10/18.
 */
import React, { Component } from 'react'
import Slider from 'react-slick'

export default class CenterMode extends Component {
    render() {
        const settings = {
            className: 'center',
            centerMode: true,
            infinite: true,
            centerPadding: '60px',
            slidesToShow: 3,
            speed: 500
        };
        return (
            <div>
                <h2>Center Mode</h2>
                <Slider {...settings}>
                    <div style={{
                        width:"7rem",
                        height:"2rem",
                        background:"blue",
                        marginLeft:".4rem"
                    }}><h3>1</h3></div>
                    <div style={{
                        height:"2rem",
                        background:"blue",
                        marginLeft:".4rem"
                    }}><h3>1</h3></div>
                    <div style={{
                        height:"2rem",
                        background:"blue",
                        marginLeft:".4rem",
                    }}><h3>1</h3></div>

                </Slider>
            </div>
        );
    }
}