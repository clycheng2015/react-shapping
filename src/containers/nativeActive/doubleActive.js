

import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {nativeClick} from '../../utils/native-sdk'
import {getSize} from '../../utils/getSize'
import * as doubleActive from 'actions/doubleActive'

import { StickyContainer, Sticky } from 'react-sticky';
import { Icon, Flex,ListView, List,Tabs, WhiteSpace ,Toast,  WingBlank, Button } from 'antd-mobile';

import './style/doubleActive.less';


let arr=[];
let arrList = [];
let aaa=[];

@connect(
    state => {
        return {...state.doubleActive}
    },
    dispatch => bindActionCreators({...doubleActive}, dispatch)
)
export default class DoubleActive extends React.Component{
    constructor(props) {
        super(props)
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            inputValue: '',
            dataSource,
            isLoading: true,
            tabsShow:false,
            tabIndex:0,
            navShow:true,
            dataNum:[]



        }
    }

    componentDidMount(){

        const {scrollT} = this.props
        window.scrollTo(0, scrollT);

        document.title = '圣诞狂欢节';
    }
    componentDidUpdate(){

        if(this.state.tabsShow === true && window.scrollY<this.Top.offsetHeight ){
            this.setState({tabsShow:false})
        }
        if(this.state.tabsShow === false && window.scrollY>this.Top.offsetHeight ){

            this.setState({tabsShow:true})
        }

        let scrollNum = 0;
        let scrollArr = [0];
        for(var i=0;i<arr.length;i++){
            scrollNum += Math.ceil(arrList[i]/3)*(this.One.offsetHeight + 5) + this.nav.offsetHeight + 35;
            scrollArr.push(this.Top.offsetHeight +scrollNum)
        }

        aaa=scrollArr
    }

    componentWillUnmount() {
        let {scrollT} = getSize();

        const {recordScrollT} = this.props;

        recordScrollT(scrollT);

        window.onscroll = null;
    }


    onSearch = (val) => {
        const pd = { ...provinceData };
        Object.keys(pd).forEach((item) => {
            const arr = pd[item].filter(jj => jj.spell.toLocaleLowerCase().indexOf(val) > -1);
            if (!arr.length) {
                delete pd[item];
            } else {
                pd[item] = arr;
            }
        });
        this.setState({
            inputValue: val,
            dataSource: genData(this.state.dataSource, pd),
        });
    }

    tabchange=(scroll)=>{
        let data=aaa

        for (let i=0;i<=data.length;i++){

            if((data[i]<scroll+this.nav.offsetHeight)&&(scroll+this.nav.offsetHeight<data[i+1])){
                if(this.state.tabIndex===i){
                    break;
                }
                this.setState({tabIndex:i})
            }
        }
    }


    render(){

        const {datalist,tabs} = this.props

        const {dataBlob, sectionIDs, rowIDs}=datalist

        arr = sectionIDs;
        for(let i=0;i<rowIDs.length;i++){
            arrList.push(rowIDs[i].length);
        }
        //
        // let tabs = [];
        // sectionIDs.map((i, index) => {
        //     tabs.push({title: i})
        // })
        function renderTabBar(props) {
            return (<Sticky>
                {({ style }) => <div style={{ ...style, zIndex: 999999,position:'fixed',top:'0',left:'0' }}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }

        const row = (rowData, sectionID, rowID) => {
            return (
                <div className='double-goods-box'  ref={(el)=>this.One=el}>
                    <div className='double-goods' key={rowID}
                         onClick={ ()=>{nativeClick({
                             type:2,
                             url:rowData.id,
                             id:rowData.id,
                             name:rowData.gtitle,
                             activeType:''
                         })}}>
                        <div className='title'>{rowData.gtitle}</div>
                        <div className='image'><img src={rowData.bigpic} alt=""  /></div>
                        <div className='box'>
                            <p className='price'>￥{rowData.zkprice} </p>
                            <p className='button'>立即购买</p>
                        </div>
                    </div>
                </div>


            );
        };



        return(
            <div className='double-content' style={{background:'url(' + require('static/images/doubleActive/bg.png') + ')'}}>


                <div  className='nav-tab'
                      ref={(el)=>this.nav=el}
                      style={{
                          background:"transparent",
                          border:"none",
                          opacity:0,
                          position:'fixed',
                          top:0,
                          left:0,
                          zIndex:-1
                      }}
                />


                <div className='double-box'>
                    <div ref={(el)=>this.Top=el}>
                        <div className='banner'><img src={require('static/images/doubleActive/shaungdan.jpg')} alt=""/> </div>

                        <ul className='activeName'>
                            {sectionIDs.map((i,index)=>{

                             return(
                                 <li key={index}
                                     onClick={()=>{
                                         this.setState({tabIndex:index})
                                        let scrollNum = 0;

                                        for(var i=0;i<index;i++){
                                            scrollNum += Math.ceil(arrList[i]/3)*(this.One.offsetHeight+5)+this.nav.offsetHeight+35
                                        }

                                        window.scrollTo(0, this.Top.offsetHeight + scrollNum-this.nav.offsetHeight)
                                     }}>{i}</li>
                                 )

                            })}
                        </ul>


                    </div>
                    <div className='active-list'>

                        <WhiteSpace />
                        <StickyContainer>
                            {
                                this.state.tabsShow &&
                                <Tabs
                                    tabs={tabs}

                                    page={this.state.tabIndex}
                                    renderTabBar={renderTabBar}
                                    onTabClick={(title,index)=>{
                                        this.setState({tabIndex:index})

                                        let scrollNum = 0;
                                        for(var i=0;i<index;i++){
                                            scrollNum += Math.ceil(arrList[i]/3)*(this.One.offsetHeight+5)+this.nav.offsetHeight+35;

                                        }

                                        window.scrollTo(0,this.Top.offsetHeight +scrollNum-this.nav.offsetHeight)
                                    }}
                                >


                                </Tabs>
                            }
                        </StickyContainer>
                        <WhiteSpace />


                        <ListView.IndexedList
                            onQuickSearch={(el) => {

                            }}

                            onScroll={()=>{
                                this.tabchange(window.scrollY)
                                if(this.state.tabsShow === true && window.scrollY<this.Top.offsetHeight ){
                                    this.setState({tabsShow:false})
                                }
                                if(this.state.tabsShow === false && window.scrollY>this.Top.offsetHeight ){

                                    this.setState({tabsShow:true})
                                }

                            }}
                            quickSearchBarTop={
                                {
                                    value: '回到顶部',
                                    label: '回到顶部'
                                }
                            }
                            dataSource={this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)}
                            className="am-list sticky-list"
                            useBodyScroll
                            renderSectionWrapper={sectionID => (
                                <StickyContainer
                                    key={`s_${sectionID}_c`}
                                    className="sticky-container"

                                    style={{ zIndex: 4 }}
                                />
                            )}
                            renderSectionHeader={sectionData => (
                                <Sticky>
                                    {({
                                          style,
                                      }) => (
                                        <div
                                            className="sticky"
                                            style={{
                                                ...style,
                                                position:'absolute',
                                                width:"7.5rem",
                                                height:".9rem",
                                                fontWeight:"600",
                                                lineHeight: '1rem',
                                                textAlign:"center",
                                                color:"#fffefe",
                                                fontSize: "0.26rem",
                                                zIndex: 3,
                                                background: 'url(' + require('static/images/doubleActive/12-title1.png') + ') center center no-repeat',
                                                backgroundSize:"90%",
                                                top:0,
                                                left:0

                                            }}
                                        >{sectionData}</div>
                                    )}
                                </Sticky>
                            )}

                            renderRow={row}
                            quickSearchBarStyle={{

                                top:"1rem"
                            }}
                            // delayTime={10}
                            // delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}>rendering...</div>}
                        />
                    </div>

                </div>
            </div>

        )
    }

}

