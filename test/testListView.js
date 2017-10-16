/**
 * Created by bear on 2017/10/2.
 */

import React, {ReactDOM}from 'react'
import BScroll from 'better-scroll'


let scroll = null
class Demo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
        console.log(this.wrapper)

        let options = {
            scrollbar:true,
            startX: 0,
            startY: 0,
            scrollY: true,
            pullDownRefresh:{
                threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
                stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
            },
            pullUpLoad:{
                threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
            }
        }

        scroll = new BScroll(this.wrapper, options)

        scroll.on('pullingDown', () => {
            // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置

            console.log('正在下拉')

            scroll.finishPullDown()
            // RefreshData()
            //     .then((newData) => {
            //         this.data = newData
            //         // 在刷新数据完成之后，调用 finishPullDown 方法，回弹到顶部
            //
            //     })
        })
        scroll.on('pullingUp', () => {
            console.log('正在上拉')
            // loadData()
            //     .then((newData) => {
            //         this.data.push(newData)
            //     })
        })
    }

    componentDidUpdate() {
        scroll.refresh()
    }

    componentWillUnmount() {
        scroll && scroll.destroy()
    }

    render() {

        return (


                <div className="container"
                     style={{height:'1px'}}
                     ref={(el) => {
                    this.wrapper = el
                }}>
                    <ul style={{height:document.documentElement.clientHeight}}>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                    </ul>

                </div>




        );
    }
}
export default Demo
