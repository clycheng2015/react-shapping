
import React from 'react';
import {Icon, Flex,ListView} from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky';

import './style/newPer.less';

const nameList = ['食品酒水','保健养生','美妆个护','母婴用品','家居家纺'];
const data = [
    [
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013165042.jpg",
            category:
                "58",
            gdesc:
                null,
            good_id:
                499,
            gorder:
                0,
            gtitle:
                "名屋红甘蔗汁500ml",
            id:
                499,
            price:
                14,
            standard:
                "/罐",
            stitle:
                "名屋红甘蔗汁500ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                10.6,
            zkprice:
                10.6
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013152751.jpg",
            category:
                "58",
            gdesc:
                null,
            good_id:
                852,
            gorder:
                0,
            gtitle:
                "蜜儿沃克1.5%脂肪 超高温半脱脂牛奶 1L",
            id:
                852,
            price:
                18.9,
            standard:
                "/瓶",
            stitle:
                "蜜儿沃克1.5%脂肪 超高温半脱脂牛奶 1L",
            tags:
                "",
            type:
                "0",
            vipprice:
                9.9,
            zkprice:
                9.9
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017162759.jpg",
            category:
                "58",
            gdesc:
                null,
            good_id:
                539,
            gorder:
                0,
            gtitle:
                "斐济斐泉天然矿泉水500ml",
            id:
                539,
            price:
                23,
            standard:
                "/瓶",
            stitle:
                "斐济斐泉天然矿泉水500ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                18.5,
            zkprice:
                18.5
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171019134220.jpg",
            category:
                "58",
            gdesc:
                null,
            good_id:
                1565,
            gorder:
                0,
            gtitle:
                "台湾原装进口饮料 名屋芒果汁500ml ",
            id:
                1565,
            price:
                14,
            standard:
                "/罐",
            stitle:
                "台湾原装进口饮料 名屋芒果汁500ml ",
            tags:
                null,
            type:
                "0",
            vipprice:
                10.6,
            zkprice:
                10.6
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017164252.jpg",
            category:
                "58",
            gdesc:
                null,
            good_id:
                1569,
            gorder:
                0,
            gtitle:
                "巴黎天然有气矿泉水330ml",
            id:
                1569,
            price:
                19,
            standard:
                "/瓶",
            stitle:
                "巴黎天然有气矿泉水330ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                15,
            zkprice:
                15
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012165444.jpg",
            category:
                "58",
            gdesc:
                null,
            good_id:
                1547,
            gorder:
                0,
            gtitle:
                "趣味泰国进口特色风味饮品果蔬饮料葡萄味瓶装果汁饮料（含椰果）320ml",
            id:
                1547,
            price:
                13,
            standard:
                "/瓶",
            stitle:
                "趣味泰国进口特色风味饮品果蔬饮料葡萄味瓶装果汁饮料（含椰果）320ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                9.7,
            zkprice:
                9.7
        }
    ],
    [
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171020162847.jpg",
            category:
                "39",
            gdesc:
                null,
            good_id:
                1112,
            gorder:
                1,
            gtitle:
                "冈本纯10只",
            id:
                1112,
            price:
                48.9,
            standard:
                "/盒",
            stitle:
                "冈本纯10只",
            tags:
                null,
            type:
                "0",
            vipprice:
                38.6,
            zkprice:
                38.6
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171020161800.jpg",
            category:
                "39",
            gdesc:
                null,
            good_id:
                1117,
            gorder:
                1,
            gtitle:
                "冈本至尊10只",
            id:
                1117,
            price:
                59.5,
            standard:
                "/盒",
            stitle:
                "冈本至尊10只",
            tags:
                null,
            type:
                "0",
            vipprice:
                48,
            zkprice:
                48
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171010144616.jpg",
            category:
                "33",
            gdesc:
                null,
            good_id:
                1415,
            gorder:
                0,
            gtitle:
                "康力士牌三文鱼油维生素E软胶囊300粒",
            id:
                1415,
            price:
                393,
            standard:
                "/瓶",
            stitle:
                "康力士牌三文鱼油维生素E软胶囊300粒",
            tags:
                "",
            type:
                "0",
            vipprice:
                194,
            zkprice:
                194
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011172242.jpg",
            category:
                "33",
            gdesc:
                null,
            good_id:
                961,
            gorder:
                1,
            gtitle:
                "康力士乳清蛋白粉(香草味)400g",
            id:
                961,
            price:
                403,
            standard:
                "/罐",
            stitle:
                "康力士乳清蛋白粉(香草味)400g",
            tags:
                null,
            type:
                "0",
            vipprice:
                350.2,
            zkprice:
                350.2
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011162113.jpg",
            category:
                "33",
            gdesc:
                null,
            good_id:
                958,
            gorder:
                1,
            gtitle:
                "康力士牌纤维康片60片",
            id:
                958,
            price:
                173,
            standard:
                "/瓶",
            stitle:
                "康力士牌纤维康片60片",
            tags:
                "",
            type:
                "0",
            vipprice:
                84,
            zkprice:
                84
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011170623.jpg",
            category:
                "33",
            gdesc:
                null,
            good_id:
                964,
            gorder:
                1,
            gtitle:
                "康鹰牌多种维生素片60片",
            id:
                964,
            price:
                193,
            standard:
                "/瓶",
            stitle:
                "康鹰牌多种维生素片60片",
            tags:
                "",
            type:
                "0",
            vipprice:
                94,
            zkprice:
                94
        }
    ],
    [
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171018110414.jpg",
            category:
                "21",
            gdesc:
                null,
            good_id:
                1343,
            gorder:
                1,
            gtitle:
                "花缪蕾智能芯超长立体护围夜用卫生巾350mm4片",
            id:
                1343,
            price:
                27.9,
            standard:
                "/袋",
            stitle:
                "花缪蕾智能芯超长立体护围夜用卫生巾350mm4片",
            tags:
                null,
            type:
                "0",
            vipprice:
                20.1,
            zkprice:
                20.1
        }  ,
        {

            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171018110101.jpg",
            category:
                "21",
            gdesc:
                null,
            good_id:
                1345,
            gorder:
                1,
            gtitle:
                "花缪蕾智能芯超薄夜用卫生巾280mm8片",
            id:
                1345,
            price:
                27.9,
            standard:
                "/袋",
            stitle:
                "花缪蕾智能芯超薄夜用卫生巾280mm8片",
            tags:
                null,
            type:
                "0",
            vipprice:
                20.1,
            zkprice:
                20.1
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171018135750.jpg",
            category:
                "28",
            gdesc:
                null,
            good_id:
                278,
            gorder:
                1,
            gtitle:
                "虹克林畔 足部清洁香皂100g",
            id:
                278,
            price:
                13.8,
            standard:
                "/盒",
            stitle:
                "虹克林畔 足部清洁香皂100g",
            tags:
                null,
            type:
                "0",
            vipprice:
                7.7,
            zkprice:
                7.7
        },
        {

            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171018142416.jpg",
            category:
                "28",
            gdesc:
                null,
            good_id:
                1342,
            gorder:
                1,
            gtitle:
                "德国爱姬玛琳海洋清爽沐浴露/Freshness Shower Gel",
            id:
                1342,
            price:
                104,
            standard:
                "/瓶",
            stitle:
                "德国爱姬玛琳海洋清爽沐浴露/Freshness Shower Gel",
            tags:
                null,
            type:
                "0",
            vipprice:
                87.1,
            zkprice:
                87.1
        },
        {

            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510035193772.jpg",
            category:
                "28",
            gdesc:
                null,
            good_id:
                1603,
            gorder:
                1,
            gtitle:
                "菲诗小铺大米调理持久保湿水-大米系列150ml【预售】",
            id:
                1603,
            price:
                59,
            standard:
                "/瓶",
            stitle:
                "菲诗小铺大米调理持久保湿水-大米系列150ml【预售】",
            tags:
                "",
            type:
                "0",
            vipprice:
                39,
            zkprice:
                39
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013183821.jpg",
            category:
                "28",
            gdesc:
                null,
            good_id:
                1348,
            gorder:
                1,
            gtitle:
                "爱姬玛琳（Algemarin）经典香水沐浴露300ml",
            id:
                1348,
            price:
                95.5,
            standard:
                "/瓶",
            stitle:
                "爱姬玛琳（Algemarin）经典香水沐浴露300ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                82.3,
            zkprice:
                82.3
        }
    ],
    [
        {

            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023100130.jpg",
            category:
                "37",
            gdesc:
                null,
            good_id:
                1102,
            gorder:
                1,
            gtitle:
                "AMOS-吸管杯300ml",
            id:
                1102,
            price:
                44,
            standard:
                "/个",
            stitle:
                "AMOS-吸管杯300ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                34.3,
            zkprice:
                34.3
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023115102.jpg",
            category:
                "36",
            gdesc:
                null,
            good_id:
                1074,
            gorder:
                1,
            gtitle:
                "新西兰澳洲(Aptamil)可瑞康爱他美1段婴幼儿奶粉900g",
            id:
                1074,
            price:
                403,
            standard:
                "/罐",
            stitle:
                "新西兰澳洲(Aptamil)可瑞康爱他美1段婴幼儿奶粉900g",
            tags:
                null,
            type:
                "0",
            vipprice:
                350.2,
            zkprice:
                350.2
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171030162949.jpg",
            category:
                "24",
            gdesc:
                null,
            good_id:
                423,
            gorder:
                1,
            gtitle:
                "Bambo自然系列婴儿纸尿裤6号大包",
            id:
                423,
            price:
                204,
            standard:
                "/袋",
            stitle:
                "Bambo自然系列婴儿纸尿裤6号大包",
            tags:
                null,
            type:
                "0",
            vipprice:
                175.1,
            zkprice:
                175.1
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170923134749.png",
            category:
                "24",
            gdesc:
                null,
            good_id:
                913,
            gorder:
                1,
            gtitle:
                "日本花王妙而舒婴儿纸尿裤特大号(XL)44片",
            id:
                913,
            price:
                163,
            standard:
                "/袋",
            stitle:
                "日本花王妙而舒婴儿纸尿裤特大号(XL)44片",
            tags:
                "",
            type:
                "0",
            vipprice:
                109,
            zkprice:
                109
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171018144953.jpg",
            category:
                "37",
            gdesc:
                "奶瓶 奶嘴",
            good_id:
                460,
            gorder:
                50,
            gtitle:
                "优觅yoomi慢流奶嘴(两个装)",
            id:
                460,
            price:
                104,
            standard:
                "/个",
            stitle:
                "优觅yoomi慢流奶嘴(两个装)",
            tags:
                "",
            type:
                "0",
            vipprice:
                87.1,
            zkprice:
                87.1
        },
        {

            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171101151514.jpg",
            category:
                "37",
            gdesc:
                null,
            good_id:
                456,
            gorder:
                50,
            gtitle:
                "NUK夜光硅胶安抚奶嘴成长",
            id:
                456,
            price:
                64,
            standard:
                "/个",
            stitle:
                "NUK夜光硅胶安抚奶嘴成长",
            tags:
                null,
            type:
                "0",
            vipprice:
                51.9,
            zkprice:
                51.9
        }
    ],
    [
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017160906.jpg",
            category:
                "61",
            gdesc:
                null,
            good_id:
                1315,
            gorder:
                1,
            gtitle:
                "土耳其原装进口正品ViKing 蔚净免洗搓手液 芦荟味 100ml ",
            id:
                1315,
            price:
                15.9,
            standard:
                "/瓶",
            stitle:
                "土耳其原装进口正品ViKing 蔚净免洗搓手液 芦荟味 100ml ",
            tags:
                null,
            type:
                "0",
            vipprice:
                9.6,
            zkprice:
                9.6
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012180723.jpg",
            category:
                "61",
            gdesc:
                null,
            good_id:
                1316,
            gorder:
                1,
            gtitle:
                "土耳其原装进口正品ViKing 蔚净洗手液 铃兰&香柏树味 500ml   ",
            id:
                1316,
            price:
                17.9,
            standard:
                "/瓶",
            stitle:
                "土耳其原装进口正品ViKing 蔚净洗手液 铃兰&香柏树味 500ml  ",
            tags:
                null,
            type:
                "0",
            vipprice:
                11.3,
            zkprice:
                11.3
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171020095039.jpg",
            category:
                "61",
            gdesc:
                null,
            good_id:
                1323,
            gorder:
                1,
            gtitle:
                "香蔓林鲜花洗衣液3000ml",
            id:
                1323,
            price:
                94,
            standard:
                "/瓶",
            stitle:
                "香蔓林鲜花洗衣液3000ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                78.3,
            zkprice:
                78.3
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017145154.jpg",
            category:
                "60",
            gdesc:
                null,
            good_id:
                1095,
            gorder:
                1,
            gtitle:
                "Kitchen-art 不粘炒锅28cm",
            id:
                1095,
            price:
                164,
            standard:
                "/个",
            stitle:
                "Kitchen-art 不粘炒锅28cm",
            tags:
                null,
            type:
                "0",
            vipprice:
                139.9,
            zkprice:
                139.9
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171002155201.jpg",
            category:
                "61",
            gdesc:
                null,
            good_id:
                369,
            gorder:
                0,
            gtitle:
                "西班牙进口MAYOR DOMO 玛玉2合1洗衣液",
            id:
                369,
            price:
                42.8,
            standard:
                "/瓶",
            stitle:
                "西班牙进口MAYOR DOMO 玛玉2合1洗衣液",
            tags:
                null,
            type:
                "0",
            vipprice:
                33.3,
            zkprice:
                33.3
        },
    ]
];
let pageIndex = 0;

const dataBlobs = [];
let sectionIDs = [];
let rowIDs = [];

function genData(pIndex = 0) {
    if(sectionIDs.length>0){
        return
    }
    for (let i = 0; i < nameList.length; i++) {
        const ii = (pIndex * nameList.length) + i;
        const sectionName = nameList[i];
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];


        for (let jj = 0; jj < data[ii].length; jj++) {

            const rowName = data[i][jj];
            rowIDs[ii].push(rowName.id);
            dataBlobs[rowName.id] = rowName;
        }
    }

    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];

}

export default class NewPer extends React.Component{
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
            dataSource,
            isLoading: true
        }

    }
    componentDidMount(){
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
        // simulate initial Ajax
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });

        }, 600);
    }
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false判断结束
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            // genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    render(){

        const {history} = this.props
        const separator = (sectionID, rowID) => {
            return(
                <div
                    key={`${sectionID}-${rowID}`}
                    style={{
                        backgroundColor: '#F5F5F9',
                        height: 8,
                        borderTop: '1px solid #ECECED',
                        borderBottom: '1px solid #ECECED',
                    }}
                />
            )
        };

        const row = (rowData, sectionID, rowID) => {

            return (
                <ul>
                    <li key={rowID} onClick={()=>{
                        history.push(`/goodsDetail/${rowData.id}`)
                    }}>
                        <p><img src={rowData.bigpic} alt=""/></p>
                        <div>
                            <p className='name'>{rowData.gtitle} </p>
                            <p className='price'>￥{rowData.zkprice} <span>￥{rowData.price}</span>
                                {/*<button>马上抢</button>*/}
                            </p>
                        </div>
                    </li>
                </ul>
            );
        };
        const heder = ()=>(
            <div>
                <div className='nav-tab'>

                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">新人福利专享</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div className='banner'>
                    <img src={require('static/image/newPre.jpg')} alt=""  />
                </div>
                <div className='quality '>100%正品 假一赔百</div>
            </div>
        )

        return(
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs)}
                className="am-list sticky-list new-exclusive"
                useBodyScroll
                renderSectionWrapper={sectionID => (
                    <StickyContainer
                        key={`s_${sectionID}_c`}
                        className="sticky-container"
                        style={{ zIndex: 4 }}
                    />
                )}
                renderSectionHeader={sectionID =>{

                    return(
                        <Sticky>
                            {({
                                  style,
                              }) => (
                                <div
                                    className="sticky title"
                                    style={{
                                        ...style,
                                        zIndex: 3,
                                        color: 'white',

                                    }}
                                >{`${sectionID}`}</div>
                            )}
                        </Sticky>
                    )
                } }
                renderHeader={heder}
                renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
                    {this.state.isLoading ? '努力加载中...' : '没有更多了！'}
                </div>)}
                renderRow={row}
                renderSeparator={separator}
                pageSize={4}
                onScroll={() => {
                    // console.log('scroll');
                }}
                scrollEventThrottle={200}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        )
    }

}

