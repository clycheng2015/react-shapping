/**
 * Created by bear on 2017/12/7.
 */

import React  from 'react';
import  './css/index.less'
import BScroll from 'better-scroll'

import Bubble from './bubble'
import Loading from './loading'


const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

const getRect = (el) => {
    if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        }
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }
}

class ScrollTest extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            beforePullDown: true,
            isRebounding: false,
            isPullingDown: false,
            isPullUpLoad: false,
            pullUpDirty: true,
            pullDownStyle: '',
            bubbleY: 0,
            pullDownTop:-50




        }

        this.name = COMPONENT_NAME;
        this.data = [];
        this.click = true;
        this.listenScroll = false;
        this.listenBeforeScroll = false;
        this.direction = DIRECTION_V;
        this.scrollbar = true;
        this.pullDownRefresh = {
            threshold: 90,
            stop: 40
        };
        this.pullUpLoad = {
            threshold: 0,
            txt: {more: '1123', noMore: '123123213'}
        };
        this.startY = 0;
        this.refreshDelay = 20;
        this.freeScroll = false;
        this.pullDownInitTop = -50


    }


    componentDidMount() {
        let options = {
            // probeType: this.probeType,
            // click: this.click,
            scrollY: true,
            scrollX: false,
            scrollbar: this.scrollbar,
            pullDownRefresh: {
                threshold: 90,
                stop: 40
            },
            pullUpLoad: this.pullUpLoad,
            // startY: this.startY,
            // freeScroll: this.freeScroll
        }
        this.scroll = new BScroll(this.wrapper, options)


        if (this.pullDownRefresh) {
            this._initPullDownRefresh()
        }

        if (this.pullUpLoad) {
            this._initPullUpLoad()
        }

    }

    // componentWillUpdate(){
    //     setTimeout(() => {
    //         this.forceUpdate(true)
    //     }, this.refreshDelay)
    //
    // }

    /**
     * 禁用scroll
     */

    disable = () => {
        this.scroll && this.scroll.disable()
    }

    /**
     * 启用scroll
     */
    enable = () => {
        this.scroll && this.scroll.enable()
    }

    /**
     * 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
     */
    refresh = () => {
        this.scroll && this.scroll.refresh()
    }
    /**
     * 销毁 better-scroll，解绑事件。
     */
    destroy = () => {
        this.scroll.destroy()
    }
    /**
     * 初始化下拉刷新
     */

    _initPullDownRefresh = () => {

        this.scroll.on('pullingDown', () => {
            this.setState({
                beforePullDown:false,
                isPullingDown:true

            })

            this.forceUpdate(true)
        })

        this.scroll.on('scroll', (pos) => {
            if (this.state.beforePullDown) {

                this.setState({
                    bubbleY:Math.max(0, pos.y + this.pullDownInitTop),
                    pullDownTop:Math.min(pos.y + this.pullDownInitTop, 10)
                })

            } else {
                console.log( pos.y )
                this.setState({
                    bubbleY:0
                })
            }


            if (this.state.isRebounding) {

                this.setState({
                    pullDownTop:10 - (this.pullDownRefresh.stop - pos.y)
                })

            }
        })
    }
    /**
     * 初始化上拉加载
     */
    _initPullUpLoad = () => {
        this.scroll.on('pullingUp', () => {

            this.setState({
                isPullUpLoad:true
            })

        })
    }

    /**
     * 下拉回弹
     */
    _reboundPullDown = () => {
        const {stopTime = 600} = this.pullDownRefresh

        return new Promise((resolve) => {
            setTimeout(() => {
                this.setState({

                    isRebounding:true
                })
                this.scroll.finishPullDown()
                resolve()
            }, stopTime)
        })
    }

    /**
     * 下拉刷新完成，状态初始化
     */
    _afterPullDown = () => {
        setTimeout(() => {
            this.setState({
                pullDownTop:this.pullDownInitTop,
                beforePullDown:true,
                isRebounding:false
            })
            this.refresh()
        }, this.scroll.options.bounceTime)
    }


    /**
     * 完成刷新
     */
    forceUpdate(dirty) {

        if (this.pullDownRefresh && this.state.isPullingDown) {
            this.setState({
                isPullingDown:false

            })
            this._reboundPullDown().then(() => {
                this._afterPullDown()
            })
        } else if (this.state.pullUpLoad && this.state.isPullUpLoad) {
            this.setState({
                isPullUpLoad:false

            })
            this.scroll.finishPullUp()
            this.setState({
                pullUpDirty:dirty
            })
            this.refresh()
        } else {
            this.refresh()
        }

    }


    render() {

        console.log(this.state.pullDownTop,this.state.bubbleY)

        return (
            <div style={{height: document.documentElement.clientHeight}}>
                <div ref={el => this.wrapper = el} className="list-wrapper">

                    <div className="scroll-content" style={{minHeight: document.documentElement.clientHeight + 1}}>


                        <div className="pulldown-wrapper" style={{top: this.state.pullDownTop}}>
                            <Bubble y={this.state.bubbleY}/>

                        </div>

                        <div ref="listWrapper">
                            <ul className="list-content" style={{minHeight: document.documentElement.clientHeight}}>
                                <li className="list-item">1</li>
                                <li className="list-item">1</li>
                            </ul>
                            <div className="pullup-wrapper">
                                <div className="before-trigger">
                                    {/*<span>{{pullUpTxt}}</span>*/}
                                </div>
                                <div className="after-trigger">
                                    <Loading/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
export default ScrollTest