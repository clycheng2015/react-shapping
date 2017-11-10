


import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {  Tabs, WhiteSpace} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';



import './style/ranking.less';

import {Icon, Flex} from 'antd-mobile'
import {nativeClick} from '../../utils/native-sdk'
export default class Ranking extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,

        }

    }
    componentDidMount(){

        this.props.feachAndroid({pagesize:8,pagenum:3,cid:5})

        document.title = '排行榜';
    }


    renderContent = tab =>
        (
            <div className='tab'>
                <ul>

                {this.props.data[2].dataList.map(function (item,index) {

                    return(
                        <li key={index}>
                            <div className='image'><img src={item.bigpic} alt=""  /></div>
                            <div className='box'>
                                <p className='name'>{item.title} </p>
                                <p className='price'>￥{item.vipprice} <span>￥{item.price}</span> <button>马上抢</button></p>
                            </div>
                        </li>
                    )
                })}
                </ul>
            </div>
        );
    render(){
        const{data}=this.props
        const nameList = [];
        if(data && data.length>0 ){

            this.props.data[1].dataList.forEach(function (i,index) {
                nameList.push(i)
            })
        }

        function renderTabBar(props) {
            return (
                <Sticky style={{ zIndex: 1 }}>
                    <Tabs.DefaultTabBar {...props} />
                </Sticky>
            );
        }
        const tabs = [];
        nameList.map(function (i) {
            tabs .push ({'title':<div><p><img src={require('static/image/ranking.png')} alt=""/></p><p>{i.name}</p></div>})
        })


        return(
            <div className='new-ranking'>

                <div className='ranking'>
                    <WhiteSpace />
                    <StickyContainer>
                        <Tabs tabs={tabs}
                              initalPage={'t2'}
                              swipeable={false}
                              // renderTabBar={renderTabBar}
                        >
                            {this.renderContent}

                        </Tabs>
                    </StickyContainer>
                    <WhiteSpace />
                </div>


            </div>
        )
    }

}

