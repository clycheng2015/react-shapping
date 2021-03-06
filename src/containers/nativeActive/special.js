


import React from 'react';

import {Icon, Flex,ListView} from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky';

import './style/special.less';
import {nativeClick} from '../../utils/native-sdk'
const nameList = ['食品酒水','美妆个护','母婴用品','保健养生','家居家纺'];
const data = [
    [
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171016170309.jpg",
            category
                :
                "56",
            gdesc
                :
                null,
            good_id
                :
                918,
            gorder
                :
                1,
            gtitle
                :
                "韩国进口零食品 ZEK海苔儿童即食烤海苔15g原味",
            id
                :
                918,
            price
                :
                16,
            standard
                :
                "/袋",
            stitle
                :
                "韩国进口零食品 ZEK海苔儿童即食烤海苔15g原味",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                12.9,
            zkprice
                :
                12.9
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171027171952.jpg",
            category
                :
                "56",
            gdesc
                :
                null,
            good_id
                :
                908,
            gorder
                :
                1,
            gtitle
                :
                "哥尼斯可可味燕麦曲奇饼干150g",
            id
                :
                908,
            price
                :
                15,
            standard
                :
                "/袋",
            stitle
                :
                "哥尼斯可可味燕麦曲奇饼干150g",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                13,
            zkprice
                :
                13
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171027173351.jpg",
            category
                :
                "56",
            gdesc
                :
                null,
            good_id
                :
                628,
            gorder
                :
                1,
            gtitle
                :
                "印尼进口卡乐米斯 草莓味夹心饼干120g 早餐休闲零食 ",
            id
                :
                628,
            price
                :
                8,
            standard
                :
                "/袋",
            stitle
                :
                "印尼进口卡乐米斯 草莓味夹心饼干120g 早餐休闲零食 ",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                6.5,
            zkprice
                :
                6.5
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171020152534.jpg",
            category
                :
                "56",
            gdesc
                :
                null,
            good_id
                :
                1137,
            gorder
                :
                1,
            gtitle
                :
                "台湾进口张君雅 草莓味甜甜圈 40g",
            id
                :
                1137,
            price
                :
                10,
            standard
                :
                "/盒",
            stitle
                :
                "台湾进口张君雅  草莓味甜甜圈 40g",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                9,
            zkprice
                :
                9
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171020153650.jpg",
            category
                :
                "56",
            gdesc
                :
                null,
            good_id
                :
                1133,
            gorder
                :
                1,
            gtitle
                :
                "台湾进口张君雅  碳烤鸡汁点心面100g",
            id
                :
                1133,
            price
                :
                12,
            standard
                :
                "/只",
            stitle
                :
                "台湾进口张君雅  碳烤鸡汁点心面100g",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                9,
            zkprice
                :
                9
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171025102939.jpg",
            category
                :
                "66",
            gdesc
                :
                null,
            good_id
                :
                778,
            gorder
                :
                1,
            gtitle
                :
                "拉睦上梅多克佳酿干红葡萄酒750ml",
            id
                :
                778,
            price
                :
                1880,
            standard
                :
                "/瓶",
            stitle
                :
                "拉睦上梅多克佳酿干红葡萄酒750ml",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                1580,
            zkprice
                :
                1580
        }
    ],
    [
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171019153431.jpg",
            category
                :
                "26",
            gdesc
                :
                null,
            good_id
                :
                1460,
            gorder
                :
                0,
            gtitle
                :
                "日本莎娜豆乳美肤浓润化妆水200ml",
            id
                :
                1460,
            price
                :
                100,
            standard
                :
                "/瓶",
            stitle
                :
                "日本莎娜豆乳美肤浓润化妆水200ml",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                95,
            zkprice
                :
                95
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013184456.jpg",
            category
                :
                "26",
            gdesc
                :
                null,
            good_id
                :
                1388,
            gorder
                :
                1,
            gtitle
                :
                "艾佩丽可 圆形压边双效化妆棉120片",
            id
                :
                1388,
            price
                :
                17.9,
            standard
                :
                "/袋",
            stitle
                :
                "艾佩丽可 圆形压边双效化妆棉120片",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                12.9,
            zkprice
                :
                12.9
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171019171921.jpg",
            category
                :
                "30",
            gdesc
                :
                null,
            good_id
                :
                1352,
            gorder
                :
                1,
            gtitle
                :
                "美迪妮澳 烫染护理滋养洗发水S05（护理型）600ml",
            id
                :
                1352,
            price
                :
                114,
            standard
                :
                "/瓶",
            stitle
                :
                "美迪妮澳 烫染护理滋养洗发水S05（护理型）600ml",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                109,
            zkprice
                :
                109
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170924155912.jpg",
            category
                :
                "30",
            gdesc
                :
                null,
            good_id
                :
                289,
            gorder
                :
                5,
            gtitle
                :
                "好本清洋甘菊银杏洗发水(柔细与一般发质)",
            id
                :
                289,
            price
                :
                91.9,
            standard
                :
                "/个",
            stitle
                :
                "好本清洋甘菊银杏洗发水(柔细与一般发质)",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                86.9,
            zkprice
                :
                86.9
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
                129,
            zkprice:
                129
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171027100421.jpg",
            category
                :
                "30",
            gdesc
                :
                null,
            good_id
                :
                303,
            gorder
                :
                50,
            gtitle
                :
                "韩国进口正品RYO  吕含光耀护损伤修护洗发水400g",
            id
                :
                303,
            price
                :
                112.8,
            standard
                :
                "/瓶",
            stitle
                :
                "韩国进口正品RYO 吕含光耀护损伤修护洗发水400g",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                107.8,
            zkprice
                :
                107.8
        }
    ],
    [
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023110310.jpg",
            category
                :
                "36",
            gdesc
                :
                null,
            good_id
                :
                1091,
            gorder
                :
                1,
            gtitle
                :
                "新西兰澳洲(Aptamil)可瑞康爱他美3段婴幼儿奶粉900g",
            id
                :
                1091,
            price
                :
                403,
            standard
                :
                "/罐",
            stitle
                :
                "新西兰澳洲(Aptamil)可瑞康爱他美3段婴幼儿奶粉900g",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                398,
            zkprice
                :
                398
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023111350.jpg",
            category
                :
                "36",
            gdesc
                :
                null,
            good_id
                :
                1086,
            gorder
                :
                1,
            gtitle
                :
                "澳洲可瑞康（Karicare）婴幼儿羊奶粉2段900g",
            id
                :
                1086,
            price
                :
                403,
            standard
                :
                "/罐",
            stitle
                :
                "澳洲可瑞康（Karicare）婴幼儿羊奶粉2段900g",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                398,
            zkprice
                :
                398
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023115427.jpg",
            category
                :
                "45",
            gdesc
                :
                null,
            good_id
                :
                1061,
            gorder
                :
                1,
            gtitle
                :
                "德国sanosan哈罗闪婴儿洁肤皂100g",
            id
                :
                1061,
            price
                :
                64,
            standard
                :
                "/盒",
            stitle
                :
                "德国sanosan哈罗闪婴儿洁肤皂100g",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                59,
            zkprice
                :
                59
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171002154138.jpg",
            category
                :
                "45",
            gdesc
                :
                "牙刷",
            good_id
                :
                477,
            gorder
                :
                1,
            gtitle
                :
                "日本进口川西儿童宝宝软毛牙刷 (柔软毛1.5岁以上)",
            id
                :
                477,
            price
                :
                34,
            standard
                :
                "/支",
            stitle
                :
                "日本进口川西儿童宝宝软毛牙刷 (柔软毛1.5岁以上)",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                29,
            zkprice
                :
                29
        },
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171027133907.jpg",
            category
                :
                "45",
            gdesc
                :
                null,
            good_id
                :
                1024,
            gorder
                :
                1,
            gtitle
                :
                "狮王天然木糖醇儿童防蛀牙膏/防龋齿-葡萄味60g",
            id
                :
                1024,
            price
                :
                40,
            standard
                :
                "/支",
            stitle
                :
                "狮王天然木糖醇儿童防蛀牙膏/防龋齿-葡萄味60g",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                35,
            zkprice
                :
                35
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171031095623.jpg",
            category
                :
                "45",
            gdesc
                :
                null,
            good_id
                :
                470,
            gorder
                :
                2,
            gtitle
                :
                "飞利浦新安怡宽口径自然质柔型奶嘴六个月+快流量（4孔）（对装）",
            id
                :
                470,
            price
                :
                104,
            standard
                :
                "/个",
            stitle
                :
                "飞利浦新安怡宽口径自然质柔型奶嘴六个月+快流量（4孔）（对装）",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                99,
            zkprice
                :
                99
        }
    ],
    [
        {
            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011163426.jpg",
            category
                :
                "33",
            gdesc
                :
                null,
            good_id
                :
                944,
            gorder
                :
                1,
            gtitle
                :
                "康力士®鲨鱼软骨粉胶囊100粒",
            id
                :
                944,
            price
                :
                303,
            standard
                :
                "/瓶",
            stitle
                :
                "康力士®鲨鱼软骨粉胶囊100粒",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                298,
            zkprice
                :
                298
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011174841.jpg",
            category
                :
                "33",
            gdesc
                :
                null,
            good_id
                :
                708,
            gorder
                :
                1,
            gtitle
                :
                "康力士儿童水果口味糖果60粒",
            id
                :
                708,
            price
                :
                132,
            standard
                :
                "/瓶",
            stitle
                :
                "康力士儿童水果口味糖果60粒",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                128,
            zkprice
                :
                128
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011162113.jpg",
            category
                :
                "33",
            gdesc
                :
                null,
            good_id
                :
                958,
            gorder
                :
                1,
            gtitle
                :
                "康力士牌纤维康片60片",
            id
                :
                958,
            price
                :
                173,
            standard
                :
                "/瓶",
            stitle
                :
                "康力士牌纤维康片60片",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                168,
            zkprice
                :
                168
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011154326.jpg",
            category
                :
                "33",
            gdesc
                :
                null,
            good_id
                :
                1037,
            gorder
                :
                1,
            gtitle
                :
                "立安降脂灵胶囊60粒ｘ500mg",
            id
                :
                1037,
            price
                :
                163,
            standard
                :
                "/瓶",
            stitle
                :
                "立安降脂灵胶囊60粒ｘ500mg",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                158,
            zkprice
                :
                158
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011171721.jpg",
            category
                :
                "33",
            gdesc
                :
                null,
            good_id
                :
                966,
            gorder
                :
                1,
            gtitle
                :
                "康鹰牌银杏胶囊60粒",
            id
                :
                966,
            price
                :
                203,
            standard
                :
                "/瓶",
            stitle
                :
                "康鹰牌银杏胶囊60粒",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                198,
            zkprice
                :
                198
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171011120257.jpg",
            category
                :
                "33",
            gdesc
                :
                null,
            good_id
                :
                1358,
            gorder
                :
                1,
            gtitle
                :
                "康力士®磷脂胶囊100粒",
            id
                :
                1358,
            price
                :
                163,
            standard
                :
                "/瓶",
            stitle
                :
                "康力士®磷脂胶囊100粒",
            tags
                :
                null,
            type
                :
                "0",
            vipprice
                :
                79,
            zkprice
                :
                79
        }
    ],
    [
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510130706805.jpg",
            category
                :
                "60",
            gdesc
                :
                null,
            good_id
                :
                201,
            gorder
                :
                50,
            gtitle
                :
                "椿岛之恋 魔法吸水面巾 32cm*85cm奶白",
            id
                :
                201,
            price
                :
                306,
            standard
                :
                "/包",
            stitle
                :
                "椿岛之恋 魔法吸水面巾 32cm*85cm奶白",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                209,
            zkprice
                :
                209
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510047553405.jpg",
            category
                :
                "60",
            gdesc
                :
                null,
            good_id
                :
                1643,
            gorder
                :
                50,
            gtitle
                :
                "德国 爱慕莎MAMBO原装进口玻璃内胆保温壶家用热水瓶1L白色【预售】",
            id
                :
                1643,
            price
                :
                210,
            standard
                :
                "/瓶",
            stitle
                :
                "德国 爱慕莎MAMBO原装进口玻璃内胆保温壶家用热水瓶1L白色【预售】",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                199,
            zkprice
                :
                199
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017150147.jpg",
            category
                :
                "60",
            gdesc
                :
                null,
            good_id
                :
                196,
            gorder
                :
                1,
            gtitle
                :
                "德国倍世净水壶白色",
            id
                :
                196,
            price
                :
                254,
            standard
                :
                "/个",
            stitle
                :
                "德国倍世净水壶白色",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                249,
            zkprice
                :
                249
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171020095642.jpg",
            category
                :
                "61",
            gdesc
                :
                null,
            good_id
                :
                1314,
            gorder
                :
                1,
            gtitle
                :
                "土耳其原装进口正品ViKing 蔚净手用碗碟洗洁精 橘子味 750ml ",
            id
                :
                1314,
            price
                :
                18.8,
            standard
                :
                "/瓶",
            stitle
                :
                "土耳其原装进口正品ViKing 蔚净手用碗碟洗洁精 橘子味 750ml  ",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                13.8,
            zkprice
                :
                13.8
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170927131632.png",
            category
                :
                "61",
            gdesc
                :
                null,
            good_id
                :
                1307,
            gorder
                :
                1,
            gtitle
                :
                "土耳其原装进口正品ViKing 蔚净厕所清洁剂 松香型 750ml",
            id
                :
                1307,
            price
                :
                25.8,
            standard
                :
                "/瓶",
            stitle
                :
                "土耳其原装进口正品ViKing 蔚净厕所清洁剂 松香型 750ml",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                20.8,
            zkprice
                :
                20.8
        },
        {

            bigpic
                :
                "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017161045.jpg",
            category
                :
                "61",
            gdesc
                :
                null,
            good_id
                :
                1312,
            gorder
                :
                1,
            gtitle
                :
                "土耳其原装进口正品ViKing 蔚净手用碗碟洗洁精 柠檬味 750ml",
            id
                :
                1312,
            price
                :
                18.8,
            standard
                :
                "/瓶",
            stitle
                :
                "土耳其原装进口正品ViKing 蔚净手用碗碟洗洁精 柠檬味 750ml",
            tags
                :
                "",
            type
                :
                "0",
            vipprice
                :
                13.8,
            zkprice
                :
                13.8
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

