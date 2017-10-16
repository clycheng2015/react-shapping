/**
 * Created by bear on 2017/9/9.
 */

import React, {PropTypes} from 'react'
import {Tabs, WhiteSpace} from 'antd-mobile';
import List from './list'



class Slider extends React.Component{


    constructor(props) {
        super(props);

    }
    change = (tab, index) => {
        const {tabs, tabChange, getHomeList} = this.props
        let data = {
            pagenum: 1,
            pagesize: 20,
            cid: ''
        }
        tabChange(tab)
        tabs.forEach(i => {
            if (tab.title == i.title) {
                data = {...data, cid: i.cid}
                getHomeList(tab.title,data)
            }
        })

    }

    render(){
        const {tabs, tabChange, getHomeList,homeList} =this.props
        return(
            <div style={{height: 'auto'}} className="tabs">
                <Tabs
                    swipeable={false}
                    tabs={tabs}
                    // tabBarUnderlineStyle
                    tabBarActiveTextColor='black'
                    onTabClick={this.change}
                >
                    <List />
                </Tabs>

            </div>
        )
    }






}
// const Slider = (props) => {
//
//     const {tabs, tabChange, getHomeList} = props
//
//     let data = {
//         pagenum: 1,
//         pagesize: 20,
//         cid: ''
//     }
//     const change = (tab, index) => {
//         tabChange(tab)
//         "use strict";
//         tabs.forEach(i => {
//             if (tab.title == i.title) {
//                 data = {...data, cid: i.cid}
//                 getHomeList(tab.title,data)
//             }
//         })
//
//     }
//     return (
//         <div style={{height: 'auto'}} className="tabs">
//             <Tabs
//                 swipeable={false}
//                 tabs={tabs}
//                 // tabBarUnderlineStyle
//                 tabBarActiveTextColor='black'
//                 onTabClick={change}
//             >
//                 <List {...props}/>
//             </Tabs>
//
//         </div>
//     )
// }
export  default Slider