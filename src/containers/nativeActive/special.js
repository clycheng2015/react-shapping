


import React from 'react';

import {Icon, Flex,ListView} from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky';

import './style/special.less';
import {nativeClick} from '../../utils/native-sdk'
const nameList = ['美妆个护','保健养生','食品酒水','母婴用品','家居家纺'];
const data = [
    [
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011151426.png",
            category:
                "26",
            gdesc:
                null,
            good_id:
                1430,
            gorder:
                0,
            gtitle:
                "谜尚魅力 润颜嫩白柔护霜 SPF30+ PA+++ 21#  50ml",
            id:
                1430,
            price:
                134,
            standard:
                "/支",
            stitle:
                "谜尚魅力 润颜嫩白柔护霜 SPF30+ PA+++ 21#  50ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                113.5,
            zkprice:
                113.5
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011184755.jpg",
            category:
                "26",
            gdesc:
                "面膜",
            good_id:
                1526,
            gorder:
                0,
            gtitle:
                "丽得姿美蒂优氨基酸收缩毛孔面膜",
            id:
                1526,
            price:
                90,
            standard:
                "/盒",
            stitle:
                "丽得姿美蒂优氨基酸收缩毛孔面膜",
            tags:
                "",
            type:
                "0",
            vipprice:
                74.8,
            zkprice:
                74.8
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011184519.jpg",
            category:
                "26",
            gdesc:
                "面膜",
            good_id:
                1523,
            gorder:
                0,
            gtitle:
                "丽得姿美蒂优氨基酸净肤面膜",
            id:
                1523,
            price:
                90,
            standard:
                "/盒",
            stitle:
                "丽得姿美蒂优氨基酸净肤面膜",
            tags:
                "",
            type:
                "0",
            vipprice:
                74.8,
            zkprice:
                74.8
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011184644.jpg",
            category:
                "26",
            gdesc:
                "面膜",
            good_id:
                1524,
            gorder:
                0,
            gtitle:
                "丽得姿美蒂优氨基酸深层补水面膜10片装",
            id:
                1524,
            price:
                90,
            standard:
                "/盒",
            stitle:
                "丽得姿美蒂优氨基酸深层补水面膜10片装",
            tags:
                "",
            type:
                "0",
            vipprice:
                74.8,
            zkprice:
                74.8
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011185245.jpg",
            category:
                "26",
            gdesc:
                null,
            good_id:
                1429,
            gorder:
                0,
            gtitle:
                "谜尚魅力 润颜靓白柔护霜 SPF30+ PA+++ 23# 50ml",
            id:
                1429,
            price:
                134,
            standard:
                "/支",
            stitle:
                "谜尚魅力 润颜靓白柔护霜 SPF30+ PA+++ 23# 50ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                113.5,
            zkprice:
                113.5
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171019153431.jpg",
            category:
                "26",
            gdesc:
                null,
            good_id:
                1460,
            gorder:
                0,
            gtitle:
                "日本莎娜豆乳美肤浓润化妆水200ml",
            id:
                1460,
            price:
                100,
            standard:
                "/瓶",
            stitle:
                "日本莎娜豆乳美肤浓润化妆水200ml",
            tags:
                "",
            type:
                "0",
            vipprice:
                69,
            zkprice:
                69
        }
    ],
    [
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
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171025142138.jpg",
            category:
                "33",
            gdesc:
                null,
            good_id:
                1425,
            gorder:
                0,
            gtitle:
                "天美健牌维生素Ｅ软胶囊500mg",
            id:
                1425,
            price:
                193,
            standard:
                "/瓶",
            stitle:
                "天美健牌维生素Ｅ软胶囊500mg",
            tags:
                null,
            type:
                "0",
            vipprice:
                165.4,
            zkprice:
                165.4
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011174841.jpg",
            category:
                "33",
            gdesc:
                null,
            good_id:
                708,
            gorder:
                1,
            gtitle:
                "康力士儿童水果口味糖果60粒",
            id:
                708,
            price:
                132,
            standard:
                "/瓶",
            stitle:
                "康力士儿童水果口味糖果60粒",
            tags:
                null,
            type:
                "0",
            vipprice:
                112.6,
            zkprice:
                112.6
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011160143.jpg",
            category:
                "33",
            gdesc:
                null,
            good_id:
                930,
            gorder:
                1,
            gtitle:
                "康力士®红太胶囊60粒",
            id:
                930,
            price:
                303,
            standard:
                "/瓶",
            stitle:
                "康力士®红太胶囊60粒",
            tags:
                "",
            type:
                "0",
            vipprice:
                149,
            zkprice:
                149
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011163426.jpg",
            category:
                "33",
            gdesc:
                null,
            good_id:
                944,
            gorder:
                1,
            gtitle:
                "康力士®鲨鱼软骨粉胶囊100粒",
            id:
                944,
            price:
                303,
            standard:
                "/瓶",
            stitle:
                "康力士®鲨鱼软骨粉胶囊100粒",
            tags:
                "",
            type:
                "0",
            vipprice:
                149,
            zkprice:
                149
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011162758.jpg",
            category:
                "33",
            gdesc:
                null,
            good_id:
                953,
            gorder:
                1,
            gtitle:
                "康力士牌牛初乳片60片",
            id:
                953,
            price:
                203,
            standard:
                "/瓶",
            stitle:
                "康力士牌牛初乳片60片",
            tags:
                "",
            type:
                "0",
            vipprice:
                99,
            zkprice:
                99
        },
    ],
    [
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012163610.jpg",
            category:
                "56",
            gdesc:
                null,
            good_id:
                1542,
            gorder:
                0,
            gtitle:
                "巴卡尔兰混合水果干谷物棒240g",
            id:
                1542,
            price:
                37.8,
            standard:
                "/盒",
            stitle:
                "巴卡尔兰混合水果干谷物棒240g",
            tags:
                null,
            type:
                "0",
            vipprice:
                31.5,
            zkprice:
                31.5
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012164027.jpg",
            category:
                "56",
            gdesc:
                null,
            good_id:
                1544,
            gorder:
                0,
            gtitle:
                "巴卡尔兰杏干可可牛奶味谷物棒240g ",
            id:
                1544,
            price:
                37.8,
            standard:
                "/盒",
            stitle:
                "巴卡尔兰杏干可可牛奶味谷物棒240g ",
            tags:
                null,
            type:
                "0",
            vipprice:
                31.5,
            zkprice:
                31.5
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017161054.jpg",
            category:
                "56",
            gdesc:
                null,
            good_id:
                533,
            gorder:
                0,
            gtitle:
                "乐事多蓝莓干100g",
            id:
                533,
            price:
                40,
            standard:
                "/袋",
            stitle:
                "乐事多蓝莓干100g",
            tags:
                null,
            type:
                "0",
            vipprice:
                33.4,
            zkprice:
                33.4
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171024151155.jpg",
            category:
                "66",
            gdesc:
                null,
            good_id:
                799,
            gorder:
                1,
            gtitle:
                "卡萨布兰卡酒庄天逸珍藏系列赤霞珠750ml",
            id:
                799,
            price:
                258,
            standard:
                "/瓶",
            stitle:
                "卡萨布兰卡酒庄天逸珍藏系列赤霞珠750ml",
            tags:
                "",
            type:
                "0",
            vipprice:
                209.4,
            zkprice:
                209.4
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510044879827.jpg",
            category:
                "66",
            gdesc:
                null,
            good_id:
                1634,
            gorder:
                50,
            gtitle:
                "西班牙 霓梦の幻灭重生 起泡酒（柠檬味）750ML-预售",
            id:
                1634,
            price:
                132,
            standard:
                "/瓶",
            stitle:
                "西班牙 霓梦の幻灭重生 起泡酒（柠檬味）750ML-预售",
            tags:
                "",
            type:
                "0",
            vipprice:
                68,
            zkprice:
                68
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510136032831.jpg",
            category:
                "66",
            gdesc:
                null,
            good_id:
                1656,
            gorder:
                50,
            gtitle:
                "瓦伦丁小麦啤酒（500ml听装）",
            id:
                1656,
            price:
                19,
            standard:
                "/厅",
            stitle:
                "瓦伦丁小麦啤酒（500ml听装）",
            tags:
                "",
            type:
                "0",
            vipprice:
                19,
            zkprice:
                19
        }
    ],
    [
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023113540.jpg",
            category:
                "36",
            gdesc:
                null,
            good_id:
                1082,
            gorder:
                1,
            gtitle:
                "澳洲贝拉米（Bellamys）3段有机婴儿奶粉(1-3岁)900g 原装进口奶粉",
            id:
                1082,
            price:
                403,
            standard:
                "/罐",
            stitle:
                "澳洲贝拉米（Bellamys）3段有机婴儿奶粉(1-3岁)900g 原装进口奶粉",
            tags:
                "",
            type:
                "0",
            vipprice:
                229,
            zkprice:
                229
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
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013150011.jpg",
            category:
                "36",
            gdesc:
                null,
            good_id:
                1559,
            gorder:
                50,
            gtitle:
                "澳洲A2 PLATINUM白金 2段婴幼儿奶粉 (6-12月) 900克",
            id:
                1559,
            price:
                503,
            standard:
                "/罐/6",
            stitle:
                "澳洲A2 PLATINUM白金 2段婴幼儿奶粉 (6-12月) 900克",
            tags:
                "",
            type:
                "0",
            vipprice:
                299,
            zkprice:
                299
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
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171025114450.jpg",
            category:
                "24",
            gdesc:
                null,
            good_id:
                1296,
            gorder:
                1,
            gtitle:
                "爱儿适luckybaby婴儿纸尿裤L64片装",
            id:
                1296,
            price:
                203,
            standard:
                "/包",
            stitle:
                "爱儿适luckybaby婴儿纸尿裤L64片装",
            tags:
                null,
            type:
                "0",
            vipprice:
                174.2,
            zkprice:
                174.2
        }
    ],
    [
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
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510048856531.jpg",
            category:
                "60",
            gdesc:
                null,
            good_id:
                1646,
            gorder:
                50,
            gtitle:
                "德国 爱慕莎MAMBO原装进口玻璃内胆保温壶家用热水瓶1000ML红色【预售】",
            id:
                1646,
            price:
                210,
            standard:
                "/瓶",
            stitle:
                "德国 爱慕莎MAMBO原装进口玻璃内胆保温壶家用热水瓶1000ML红色【预售】",
            tags:
                "",
            type:
                "0",
            vipprice:
                119,
            zkprice:
                119
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
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171002113111.jpg",
            category:
                "61",
            gdesc:
                null,
            good_id:
                980,
            gorder:
                0,
            gtitle:
                "西班牙原装进口MAYOR DOMO/玛玉厨房清洁浓缩型洗洁精600ml",
            id:
                980,
            price:
                17.8,
            standard:
                "/瓶",
            stitle:
                "西班牙原装进口MAYOR DOMO/玛玉厨房清洁浓缩型洗洁精600ml",
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
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171002154754.jpg",
            category:
                "61",
            gdesc:
                null,
            good_id:
                978,
            gorder:
                0,
            gtitle:
                "西班牙原装进口玛玉浓缩马赛皂液洗衣液洗衣粉超大量3L",
            id:
                978,
            price:
                34,
            standard:
                "/瓶",
            stitle:
                "西班牙原装进口玛玉浓缩马赛皂液洗衣液洗衣粉超大量3L",
            tags:
                "",
            type:
                "0",
            vipprice:
                24.9,
            zkprice:
                24.9
        },
        {
            bigpic:
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170927131632.png",
            category:
                "61",
            gdesc:
                null,
            good_id:
                1307,
            gorder:
                1,
            gtitle:
                "土耳其原装进口正品ViKing 蔚净厕所清洁剂 松香型 750ml",
            id:
                1307,
            price:
                25.8,
            standard:
                "/瓶",
            stitle:
                "土耳其原装进口正品ViKing 蔚净厕所清洁剂 松香型 750ml",
            tags:
                null,
            type:
                "0",
            vipprice:
                18.3,
            zkprice:
                18.3
        }
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

export default class Special extends React.Component{
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
        document.title = '特卖专区';
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
                    <li key={rowID}

                        onClick={ ()=>{nativeClick({
                            type:2,
                            url:rowData.id,
                            id:rowData.id,
                            name:rowData.title,
                            activeType:''
                        })}}



                    >
                        <div className='image'><img src={rowData.bigpic} alt=""  /></div>
                        <div className='box'>
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

                <div className='banner'>
                    <img src={require('static/image/special.jpg')} alt=""  />
                </div>
            </div>
        )

        return(
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs)}
                className="am-list sticky-list new-special"
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

