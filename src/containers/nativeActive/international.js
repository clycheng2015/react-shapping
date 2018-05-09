
import React from 'react'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as getInter from '../../actions/international'
import * as search from '../../actions/search'
import {nativeClick} from '../../utils/native-sdk'

import { Icon ,SearchBar, WhiteSpace,Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { getPath } from '../../utils/tools'

import './style/international.less'
import '../../utils/swiper/swiper.min.css';
import '../../utils/swiper/swiper.min.js';


@connect(
    state => {
        return {...state.inter,...state.search}
    },
    dispatch => bindActionCreators({...getInter,...search}, dispatch)
)
export default class Internation extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }

    }

    componentDidMount(){
        document.title = '美伦国际';
        const { getInter } = this.props;
        getInter();

    }
    componentDidUpdate(){

        let swiper = new Swiper(this.swiper, {
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            autoplay : 5000,
            slidesPerView: 'auto',
            loop : true,
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            }
        });

    }

    renderContent = tab =>{
        const {history,list} = this.props

        return(
            <div className='tab'>
                <ul>
                    {list && list.map(function (item,index) {
                        return(
                            <li key={index} onClick={()=>{nativeClick({
                                type:2,
                                url:item.id,
                                id:item.id,
                                name:item.gtitle,
                                activeType:''
                            })}}>
                                <div className='image'>
                                    <img src={item.bigpic} alt=""  />
                                </div>
                                <div className='box'>
                                    <p className='name'>{item.gtitle} </p>
                                    <p className='price'>
                                        ￥{item.zkprice}<span>￥{item.price}</span>
                                        <button>立即购买</button>
                                    </p>
                                </div>
                            </li>
                        )

                    })}
                </ul>
            </div>
        )
    }

    _change = (tab, index) => {
        const {getMlSearchList} = this.props
        tab.id ===1 ?getMlSearchList({pagesize: 9999, pagenum: 1, ischoice: 1,isown:2}) : getMlSearchList({pagesize: 9999, pagenum: 1, cid: tab.category_id,isown:2})

    }


    _gettab=()=>{
        const  {data}=this.props

        const tabs = [];
        data.mlgjCategoryDto && data.mlgjCategoryDto.length>0 && data.mlgjCategoryDto.map((item,index)=>{
            tabs.push({'title':<div><p><img style={{width:'0.5rem',height:'0.5rem'}} src={item.iconpic} alt=""/></p><p>{item.name}</p></div>,...item})
        })

        return tabs

    }

    render(){

        const { history,data,list } = this.props


        function renderTabBar(props) {
            return (<Sticky>
                {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }

        return(
            <div className='inter-body'>

                <div className='top-lun' style={{ background:'url('+require('static/images/doubleActive/inter-bg.png')+') no-repeat',
                    backgroundSize:'100%'}}>
                    <div className="swiper-container" ref={(el)=>this.swiper=el} >
                        <div className="swiper-wrapper" >

                            {
                                data && data.mlgjBannerDto && data.mlgjBannerDto.length > 0 && data.mlgjBannerDto.map((item,key)=>{

                                    return (
                                        <div key={key}  className='swiper-slide'><img src={item.iconpic} alt=""/></div>
                                    )
                                })
                            }

                        </div>

                    </div>
                    <div className='lun-down'>
                        <p><img style={{width:'0.21rem'}} src={require('static/images/doubleActive/inter-1.png')} alt=""/>正品保证</p>
                        <p><img style={{width:'0.26rem'}} src={require('static/images/doubleActive/inter-2.png')} alt=""/>海外直邮</p>
                        <p><img style={{width:'0.22rem'}} src={require('static/images/doubleActive/inter-3.png')} alt=""/>品牌直销</p>
                    </div>
                </div>
                <div className='new-word'>
                    <WhiteSpace />
                    <StickyContainer>
                        {

                            data&&data.mlgjCategoryDto&&
                            <Tabs tabs={this._gettab()}
                                  swipeable={false}
                                  onChange={this._change}
                                  renderTabBar={renderTabBar}
                                  animated={false}
                            >
                                {this.renderContent}

                            </Tabs>

                        }

                    </StickyContainer>
                    <WhiteSpace />
                </div>

            </div>
        )
    }

}