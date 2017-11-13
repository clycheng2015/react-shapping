


import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import { ListView , Tabs, WhiteSpace, PullToRefresh, Button,Progress} from 'antd-mobile';
import {Icon, Flex} from 'antd-mobile'
import './style/newDay.less';
import '../../utils/swiper/swiper.min.css';
import '../../utils/swiper/swiper.min.js';


const goodsList = [];

export default class NewDay extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,

        }
        this.titleList =['美妆个护','保健养生','食品酒水','母婴用品','家居家纺'];
        this.goods = [
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
                        129,
                    zkprice:
                        129
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
                        null,
                    type:
                        "0",
                    vipprice:
                        85,
                    zkprice:
                        85
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
                        null,
                    type:
                        "0",
                    vipprice:
                        85,
                    zkprice:
                        85
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
                        null,
                    type:
                        "0",
                    vipprice:
                        85,
                    zkprice:
                        85
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
                        188,
                    zkprice:
                        188
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
                        128,
                    zkprice:
                        128
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
                }
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
                        35.8,
                    zkprice:
                        35.8
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
                        35.8,
                    zkprice:
                        35.8
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
                        38,
                    zkprice:
                        38
                },
                {

                    bigpic:
                        "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017151451.jpg",
                    category:
                        "56",
                    gdesc:
                        null,
                    good_id:
                        1566,
                    gorder:
                        0,
                    gtitle:
                        "爱时乐香草牛奶味威化卷心酥 150g罐装",
                    id:
                        1566,
                    price:
                        25,
                    standard:
                        "/瓶",
                    stitle:
                        "爱时乐香草牛奶味威化卷心酥 150g罐装",
                    tags:
                        null,
                    type:
                        "0",
                    vipprice:
                        23,
                    zkprice:
                        23
                },
                {

                    bigpic:
                        "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171010152306.jpg",
                    category:
                        "56",
                    gdesc:
                        null,
                    good_id:
                        1422,
                    gorder:
                        0,
                    gtitle:
                        "丽芝士纳宝帝奶酪威化饼干290克",
                    id:
                        1422,
                    price:
                        16,
                    standard:
                        "/盒",
                    stitle:
                        "丽芝士纳宝帝奶酪威化饼干290克",
                    tags:
                        null,
                    type:
                        "0",
                    vipprice:
                        14.9,
                    zkprice:
                        14.9
                },
                {

                    bigpic:
                        "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171019142412.jpg",
                    category:
                        "56",
                    gdesc:
                        null,
                    good_id:
                        1535,
                    gorder:
                        0,
                    gtitle:
                        "好乔牌台湾好味道咸紫菜方酥500g",
                    id:
                        1535,
                    price:
                        44.6,
                    standard:
                        "/瓶",
                    stitle:
                        "好乔牌台湾好味道咸紫菜方酥500g",
                    tags:
                        null,
                    type:
                        "0",
                    vipprice:
                        42.6,
                    zkprice:
                        42.6
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
                        "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023110615.jpg",
                    category:
                        "36",
                    gdesc:
                        null,
                    good_id:
                        1090,
                    gorder:
                        1,
                    gtitle:
                        "新西兰澳洲(Aptamil)可瑞康爱他美2段婴幼儿奶粉900g",
                    id:
                        1090,
                    price:
                        403,
                    standard:
                        "/罐",
                    stitle:
                        "新西兰澳洲(Aptamil)可瑞康爱他美2段婴幼儿奶粉900g",
                    tags:
                        null,
                    type:
                        "0",
                    vipprice:
                        398,
                    zkprice:
                        398
                },
                {

                    bigpic:
                        "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023114048.jpg",
                    category:
                        "36",
                    gdesc:
                        null,
                    good_id:
                        1081,
                    gorder:
                        1,
                    gtitle:
                        "澳洲贝拉米（Bellamys）2段有机婴儿奶粉(6-12个月)900g 原装进口奶粉",
                    id:
                        1081,
                    price:
                        403,
                    standard:
                        "/罐",
                    stitle:
                        "澳洲贝拉米（Bellamys）2段有机婴儿奶粉(6-12个月)900g 原装进口奶粉",
                    tags:
                        "",
                    type:
                        "0",
                    vipprice:
                        239,
                    zkprice:
                        239
                },
                {

                    bigpic:
                        "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023114855.jpg",
                    category:
                        "36",
                    gdesc:
                        null,
                    good_id:
                        1078,
                    gorder:
                        1,
                    gtitle:
                        "新西兰澳洲(Aptamil)可瑞康爱他美4段婴幼儿奶粉900g",
                    id:
                        1078,
                    price:
                        403,
                    standard:
                        "/罐",
                    stitle:
                        "新西兰澳洲(Aptamil)可瑞康爱他美4段婴幼儿奶粉900g",
                    tags:
                        null,
                    type:
                        "0",
                    vipprice:
                        398,
                    zkprice:
                        398
                },
                {
                    bigpic:
                        "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171023112349.jpg",
                    category:
                        "36",
                    gdesc:
                        null,
                    good_id:
                        1085,
                    gorder:
                        1,
                    gtitle:
                        "澳洲可瑞康（Karicare）婴幼儿羊奶粉1段900g ",
                    id:
                        1085,
                    price:
                        403,
                    standard:
                        "/桶",
                    stitle:
                        "澳洲可瑞康（Karicare）婴幼儿羊奶粉1段900g ",
                    tags:
                        null,
                    type:
                        "0",
                    vipprice:
                        398,
                    zkprice:
                        398
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
                        398,
                    zkprice:
                        398
                }
            ],
            [
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
                        37.8,
                    zkprice:
                        37.8
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
                        20.8,
                    zkprice:
                        20.8
                },
                {

                    bigpic:
                        "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171020104019.jpg",
                    category:
                        "61",
                    gdesc:
                        null,
                    good_id:
                        1309,
                    gorder:
                        1,
                    gtitle:
                        "土耳其原装进口正品ViKing 蔚净厨房清洁喷雾 清新型 750ml",
                    id:
                        1309,
                    price:
                        25.8,
                    standard:
                        "/瓶",
                    stitle:
                        "土耳其原装进口正品ViKing 蔚净厨房清洁喷雾 清新型 750ml",
                    tags:
                        null,
                    type:
                        "0",
                    vipprice:
                        20.8,
                    zkprice:
                        20.8
                },
                {
                    bigpic:
                        "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171020095815.jpg",
                    category:
                        "61",
                    gdesc:
                        null,
                    good_id:
                        1313,
                    gorder:
                        1,
                    gtitle:
                        "土耳其原装进口正品ViKing 蔚净手用碗碟洗洁精 经典味 750ml   ",
                    id:
                        1313,
                    price:
                        18.8,
                    standard:
                        "/瓶",
                    stitle:
                        "土耳其原装进口正品ViKing 蔚净手用碗碟洗洁精 经典味 750ml  ",
                    tags:
                        null,
                    type:
                        "0",
                    vipprice:
                        13.8,
                    zkprice:
                        13.8
                }
            ]
        ];
        this.getData = this.goods[0];

    }
    componentDidMount(){
        const {history} = this.props
        // this.props.getTitleList({pagesize:8,pagenum:3})
        // 轮播
        const swiper = new Swiper(this.swiper, {
                pagination: '.swiper-pagination',
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                autoplay : 3000,
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

        let lunbo1 = document.getElementsByClassName('lunbo1');
        let lunbo2 = document.getElementsByClassName('lunbo2');
        let lunbo3 = document.getElementsByClassName('lunbo3');


        for(var i=0;i<lunbo1.length;i++){
            lunbo1[i].addEventListener('click',()=>{
                history.push(`/goodsDetail/1558`)
            })
        }
        for(var i=0;i<lunbo2.length;i++){
            lunbo2[i].addEventListener('click',()=>{
                history.push(`/goodsDetail/241`)
            })
        }
        for(var i=0;i<lunbo3.length;i++){
            lunbo3[i].addEventListener('click',()=>{
                history.push(`/goodsDetail/305`)
            })
        }



    }

    renderContent = tab =>{
        const {history} = this.props
        return(
            <div className='tab'>
                <ul>
                    {this.getData.map(function (item,index) {
                        return(
                            <li key={index} onClick={()=>{
                                history.push(`/goodsDetail/${item.id}`)
                            }}>
                                <div className='image'>
                                    <img src={item.bigpic} alt=""  />
                                </div>
                                <div className='box'>
                                    <p className='name'>{item.gtitle} </p>
                                    <p className='price'>
                                        ￥{item.zkprice}<span>￥{item.price}</span>
                                        {/*<button>马上抢</button>*/}
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

        // const {tabChange} = this.props
        // tabChange(tab.title, tab.cid, index)
        this.getData = this.goods[index];


    }

    render(){
        const {data,history}=this.props
        const tabs = [];
        this.titleList.map((item,index)=>{
            tabs.push({'title':item})
        })



        return(

            <div className='new-day'>
                <div className='nav-tab'>

                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">每日上新</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>

               <div className='lunBo'

               style={{
                   background:'url('+require('static/image/lunbobg.jpg')+') no-repeat'
               }}
               >
                    <p className='title'>新品首发 <br/> <span>每日大牌新品推荐 折扣超前</span></p>
                   <div className="swiper-container" ref={(el)=>this.swiper=el}>
                        <div className="swiper-wrapper">

                           <div className='swiper-slide lunbo1' ><img src={require('static/image/newDay1.jpg')} alt=""/></div>
                           <div className='swiper-slide lunbo2' ><img src={require('static/image/newDay2.jpg')} alt=""/></div>
                           <div className='swiper-slide lunbo3' ><img src={require('static/image/newDay3.jpg')} alt=""/></div>

                        </div>

                       <div className="swiper-pagination">

                       </div>
                   </div>
               </div>
               <div className='new-word'>
                   <p className='title'>今日新品到货 <br/> <span>每日17点准时更新</span></p>
                   <WhiteSpace />
                       <Tabs tabs={tabs} swipeable={false}  onChange={this._change}>
                           {this.renderContent}

                       </Tabs>
                   <WhiteSpace />


               </div>
            </div>

        )
    }

}

