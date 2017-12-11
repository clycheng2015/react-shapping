

import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getSize} from '../../utils/getSize'

import * as doubleActive from 'actions/doubleActive'
import {StickyContainer, Sticky} from 'react-sticky';
import {Icon, Flex, ListView, List, Tabs, WhiteSpace, Toast, WingBlank, Button} from 'antd-mobile';
import {AppLocalStorage} from '../../utils/cookie'

import './style/doubleActive.less';


let aaa = [];
let arr = [];
let arrList = [];


@connect(
    state => {
        return {...state.doubleActive}
    },
    dispatch => bindActionCreators({...doubleActive}, dispatch)
)

export default class DoubleActive extends React.Component {
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
            tabsShow: false,
            tabIndex: 0,
            navShow: true,
            dataNum: [],

        }
    }
    componentDidMount() {
        // this.props.getDeadList(provinceData);
        const {scrollT} = this.props
        window.scrollTo(0, scrollT);

    }

    componentDidUpdate() {

        if (this.state.tabsShow === true && window.scrollY < this.Top.offsetHeight) {
            this.setState({tabsShow: false})
        }
        if (this.state.tabsShow === false && window.scrollY > this.Top.offsetHeight) {

            this.setState({tabsShow: true})
        }

        let scrollNum = 0;
        let scrollArr = [0];

        for (var i = 0; i < arr.length; i++) {
            scrollNum += Math.ceil(arrList[i] / 3) * (this.One.offsetHeight + 5) + this.nav.offsetHeight + 35;
            scrollArr.push(this.Top.offsetHeight + scrollNum)

        }
        aaa = scrollArr
    }
    componentWillUnmount() {

        let {scrollT} = getSize();

        const {recordScrollT} = this.props;

        recordScrollT(scrollT);

        window.onscroll = null;
    }

    _turnTop=()=>{

        let user=AppLocalStorage.Cache.get("user")
        const {history}=this.props
        if(user){
            history.push(`/topUp`)
        }
        else {
            let url=window.location.href
            url= url.match(/#(\S*)/)[1];
            url=url.replace('/','')
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://app.meilungo.com/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        }
    }

    onSearch = (val) => {
        const pd = {...provinceData};
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

    tabchange = (scroll) => {

        let data = aaa

        for (let i = 0; i <= data.length; i++) {

            if ((data[i] < scroll) && (scroll < data[i + 1])) {
                if (this.state.tabIndex === i) {
                    break;
                }
                this.setState({tabIndex: i})
            }
        }
    }

    getstate = (scroll) => {

        if (this.state.navShow === false && scroll < this.Top.offsetHeight) {
            this.setState({navShow: true})
        }
        if (this.state.navShow === true && scroll > this.Top.offsetHeight) {

            this.setState({navShow: false})
        }

    }

    render() {

        const {history, getstate,datalist,tabs} = this.props

        const {dataBlob, sectionIDs, rowIDs}=datalist

        arr = sectionIDs;

        for(let i=0;i<rowIDs.length;i++){
            arrList.push(rowIDs[i].length);
        }

        // let tabs = [];
        // sectionIDs.map((i, index) => {
        //     tabs.push({title: i})
        // })
        function renderTabBar(props) {
            return (<Sticky>
                {({style}) => <div style={{...style, zIndex: 999999, position: 'fixed', top: '0', left: '0'}}>
                    <Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }

        const row = (rowData, sectionID, rowID) => {

            return (
                <div className='double-goods-box' ref={(el) => this.One = el}>
                    <div className='double-goods' key={rowID} onClick={() => {
                        history.push({
                            pathname: `/goodsDetail/${rowData.id}`,

                        })


                    }}>
                        <div className='title'>{rowData.gtitle}</div>
                        <div className='image'><img src={rowData.bigpic} alt=""/></div>
                        <div className='box'>
                            <p className='price'>￥{rowData.zkprice} </p>
                            <p className='button'>立即购买</p>
                        </div>
                    </div>
                </div>


            );
        };


        return (

            <div className='double-content'>

                {
                    this.state.navShow &&
                    <div className='nav-tab' ref={(el) => this.nav = el}>
                        <Flex justify="center" align="center">
                            <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                                history.goBack()
                            }}/></Flex.Item>
                            <Flex.Item className="item-head center">双十二活动</Flex.Item>
                            <Flex.Item className="item-head right"><span></span></Flex.Item>
                        </Flex>
                    </div>
                }


                <div className='double-box'>
                    <div ref={(el) => this.Top = el}>
                        <div className='banner'><img src={require('static/images/doubleActive/1212.png')} alt=""/> </div>

                        <ul className='activeName'>
                            {sectionIDs.map((i, index) => {

                                return (
                                    <li key={index}
                                        onClick={() => {
                                            this.setState({tabIndex: index})
                                            let scrollNum = 0;

                                            for (var i = 0; i < index; i++) {
                                                scrollNum += Math.ceil(arrList[i] / 3) * (this.One.offsetHeight + 5) + this.nav.offsetHeight + 35
                                            }

                                            window.scrollTo(0, this.Top.offsetHeight + scrollNum)
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
                                    onTabClick={(title, index) => {
                                        this.setState({tabIndex: index})

                                        let scrollNum = 0;
                                        for (var i = 0; i < index; i++) {
                                            scrollNum += Math.ceil(arrList[i] / 3) * (this.One.offsetHeight + 5) + this.nav.offsetHeight + 35;

                                        }

                                        window.scrollTo(0, this.Top.offsetHeight + scrollNum)
                                    }}
                                >


                                </Tabs>
                            }
                        </StickyContainer>
                        <WhiteSpace />


                        <ListView.IndexedList

                            ref='listview'
                            onQuickSearch={(el) => {

                            }}
                            onScroll={() => {
                                this.tabchange(window.scrollY)
                                if (this.state.tabsShow === true && window.scrollY < this.Top.offsetHeight) {
                                    this.setState({tabsShow: false})
                                }
                                if (this.state.tabsShow === false && window.scrollY > this.Top.offsetHeight) {

                                    this.setState({tabsShow: true})
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

                                    style={{zIndex: 4}}
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
                                                width: "7.5rem",
                                                height: ".9rem",
                                                fontWeight: "600",
                                                lineHeight: '1rem',
                                                textAlign: "center",
                                                color: "#fffefe",
                                                fontSize: "0.26rem",
                                                zIndex: 3,
                                                background: 'url(' + require('static/images/doubleActive/12-title1.png') + ') center center no-repeat',
                                                backgroundSize: "90%",
                                                position:'absolute',
                                                top:0,
                                                left:0

                                            }}
                                        >{sectionData}</div>
                                    )}
                                </Sticky>
                            )}

                            renderRow={row}
                            quickSearchBarStyle={{

                                top: "1rem"
                            }}
                            // delayTime={10000}
                            initialListSize={1000}
                            pageSize={1000}
                            // delayActivityIndicator={<div style={{padding: 25, textAlign: 'center'}}>rendering...</div>}
                        />
                    </div>

                </div>
            </div>

        )
    }

}

