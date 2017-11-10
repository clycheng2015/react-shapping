import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getSize} from '../../utils/getSize'

import * as active from 'actions/active'
import {StickyContainer, Sticky} from 'react-sticky';
import {Icon, Flex, ListView, List, Tabs, WhiteSpace, Toast, WingBlank, Button} from 'antd-mobile';
import {AppLocalStorage} from '../../utils/cookie'

import './style/doubleActive.less';


const provinceData = {
    '面部护理': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171019153431.jpg",
            gtitle: "日本莎娜豆乳美肤浓润化妆水200ml",
            id: 1460,
            price: "95.00",
            standard: "/瓶",
            stitle: "日本莎娜豆乳美肤浓润化妆水200ml",
            vipprice: "95.00",
            zkprice: "69.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026103444.jpg",
            gtitle: "花印乳液水漾润颜补水乳液150ml补水保湿温和不刺激日本进口 ",
            id: 1598,
            price: "189.00",
            standard: "/瓶",
            stitle: "花印乳液水漾润颜补水乳液150ml补水保湿温和不刺激日本进口 ",
            vipprice: "109.00",
            zkprice: "149.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026104303.jpg",
            gtitle: "花印水漾润颜补水化妆水 补水保湿滋润 持续锁水190ml",
            id: 1599,
            price: "189.00",
            standard: "/瓶",
            stitle: "花印水漾润颜补水化妆水  补水保湿滋润 持续锁水190ml",
            vipprice: "109.00",
            zkprice: "149.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031131100.jpg",
            gtitle: "印（HANAJIRUSHI）清新净肤卸妆水180ml(深层清洁 补水保湿 温和快速 眼唇可用） ",
            id: 1600,
            price: "99.00",
            standard: "/瓶",
            stitle: "印（HANAJIRUSHI）清新净肤卸妆水180ml(深层清洁 补水保湿 温和快速 眼唇可用） ",
            vipprice: "59.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026111912.jpg",
            gtitle: "菲诗小铺大米调理持久保湿水-大米系列150ml",
            id: 1603,
            price: "59.00",
            standard: "/瓶",
            stitle: "菲诗小铺大米调理持久保湿水-大米系列150ml",
            vipprice: "29.00",
            zkprice: "39.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031130323.jpg",
            gtitle: "菲诗小铺大米调理保湿乳液大米系列150ml",
            id: 1604,
            price: "59.00",
            standard: "/瓶",
            stitle: "菲诗小铺大米调理保湿乳液大米系列150ml",
            vipprice: "29.00",
            zkprice: "39.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031112516.jpg",
            gtitle: "花印汤村温泉补水套装（水漾洁面150g+99ml水+99ml乳液）（深层清洁滋养保湿温和护肤） ",
            id: 1605,
            price: "259.00",
            standard: "/盒",
            stitle: "花印汤村温泉补水套装（水漾洁面150g+99ml水+99ml乳液）（深层清洁滋养保湿温和护肤） ",
            vipprice: "118.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026115523.jpg",
            gtitle: "Medius玫帝婀思保湿忍者面膜-提亮粉 33ml*5片",
            id: 1606,
            price: "59.00",
            standard: "/盒",
            stitle: "Medius玫帝婀思保湿忍者面膜-提亮粉 33ml*5片",
            vipprice: "29.50",
            zkprice: "39.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031111510.jpg",
            gtitle: "Medius玫帝婀思保湿忍者面膜-水泉蓝",
            id: 1617,
            price: "59.00",
            standard: "/盒",
            stitle: "Medius玫帝婀思保湿忍者面膜-水泉蓝",
            vipprice: "29.50",
            zkprice: "39.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031110304.jpg",
            gtitle: "Medius玫帝婀思保湿忍者面膜-净化黑(33ml*5片）",
            id: 1618,
            price: "59.00",
            standard: "/盒",
            stitle: "Medius玫帝婀思保湿忍者面膜-净化黑(33ml*5片）",
            vipprice: "29.50",
            zkprice: "39.00"

        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026120952.jpg",
            gtitle: "banila芭妮兰卸妆膏zero致柔脸部温和深层卸妆膏100ml ",
            id: 1608,
            price: "159.00",
            standard: "/盒",
            stitle: "banila芭妮兰卸妆膏zero致柔脸部温和深层卸妆膏100ml ",
            vipprice: "89.00",
            zkprice: "99.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026121528.jpg",
            gtitle: "自然共和国 Nature Republic芦荟胶舒缓保湿凝胶300ml  进口补水保湿舒缓晒后修复面膜 ",
            id: 1609,
            price: "39.00",
            standard: "/盒",
            stitle: "自然共和国 Nature Republic芦荟胶舒缓保湿凝胶300ml 进口补水保湿舒缓晒后修复面膜 ",
            vipprice: "19.00",
            zkprice: "25.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171022143752.jpg",
            gtitle: "韩国可莱丝 美迪惠尔 胶原蛋白面膜10片",
            id: 246,
            price: "98.00",
            standard: "/盒",
            stitle: "韩国可莱丝 美迪惠尔 胶原蛋白面膜10片",
            vipprice: "98.00",
            zkprice: "69.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171022143328.jpg",
            gtitle: "韩国可莱丝 美迪惠尔维生素面膜10片/盒(升级版）",
            id: 247,
            price: "98.00",
            standard: "/盒",
            stitle: "韩国可莱丝 美迪惠尔维生素面膜10片/盒(升级版）",
            vipprice: "98.00",
            zkprice: "69.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171022140025.jpg",
            gtitle: "斯内普海洋燕窝补水安瓶精华面膜25ml*10",
            id: 876,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普海洋燕窝补水安瓶精华面膜25ml*10",
            vipprice: "158.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171022140912.jpg",
            gtitle: "斯内普黄金胶原蛋白精华面膜25ml*10",
            id: 877,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普黄金胶原蛋白精华面膜25ml*10",
            vipprice: "158.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171022135121.jpg",
            gtitle: "斯内普虎形抗皱面膜(改善皱纹功能性产品)25ml*10",
            id: 878,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普虎形抗皱面膜(改善皱纹功能性产品)25ml*10",
            vipprice: "158.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171022133801.jpg",
            gtitle: "斯内普熊猫形美白面膜(美白功能性产品)25ml*10",
            id: 879,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普熊猫形美白面膜(美白功能性产品)25ml*10",
            vipprice: "158.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171022134633.jpg",
            gtitle: "斯内普龙形舒缓面膜25ml*10",
            id: 1067,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普龙形舒缓面膜25ml*10",
            vipprice: "158.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026135107.jpg",
            gtitle: "兰芝（Laneige） 气垫BB霜/防晒隔离霜 雪润无暇粉凝霜+替换装13号 15g",
            id: 1610,
            price: "325.00",
            standard: "/盒",
            stitle: "兰芝（Laneige） 气垫BB霜/防晒隔离霜 雪润无暇粉凝霜+替换装13号 15g",
            vipprice: "239.00",
            zkprice: "259.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031163517.jpg",
            gtitle: "韩国兰芝夜间保湿修护唇膜20g",
            id: 1447,
            price: "128.00",
            standard: "/盒",
            stitle: "韩国兰芝夜间保湿修护唇膜20g",
            vipprice: "128.00",
            zkprice: "108.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031165818.jpg",
            gtitle: "澳洲HOLA 茶树植物调理净痘面膜泥120g",
            id: 1438,
            price: "219.00",
            standard: "/盒",
            stitle: "澳洲HOLA 茶树植物调理净痘面膜泥120g",
            vipprice: "219.00",
            zkprice: "159.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031164749.jpg",
            gtitle: "澳洲HOLA 茶树植物调理平衡水150ml",
            id: 1439,
            price: "159.00",
            standard: "/瓶",
            stitle: "澳洲HOLA 茶树植物调理平衡水150ml",
            vipprice: "159.00",
            zkprice: "119.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031164511.jpg",
            gtitle: "澳洲HOLA 茶树植物调理卸妆油190ml",
            id: 1440,
            price: "219.00",
            standard: "/瓶",
            stitle: "澳洲HOLA 茶树植物调理卸妆油190ml",
            vipprice: "219.00",
            zkprice: "159.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171017172248.jpg",
            gtitle: "后天气丹花献光彩紧颜系列礼盒(308ml)6件套",
            id: 1376,
            price: "2080.00",
            standard: "/组",
            stitle: "后天气丹花献光彩紧颜系列礼盒(308ml)6件套",
            vipprice: "2080.00",
            zkprice: "1456.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171017170951.jpg",
            gtitle: "后拱辰享气韵生系列(321ml)6件套",
            id: 1379,
            price: "1220.00",
            standard: "/组",
            stitle: "后拱辰享气韵生系列(321ml)6件套",
            vipprice: "1220.00",
            zkprice: "888.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171017171912.jpg",
            gtitle: "后津率享红华凝香系列礼盒(329ml)7件套",
            id: 1378,
            price: "1580.00",
            standard: "/组",
            stitle: "后津率享红华凝香系列礼盒(329ml)7件套",
            vipprice: "1580.00",
            zkprice: "1198.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031172557.jpg",
            gtitle: "后拱辰享水沄系列礼盒(309ml+2g)6件套",
            id: 1413,
            price: "1150.00",
            standard: "/组",
            stitle: "后拱辰享水沄系列礼盒(309ml+2g)6件套",
            vipprice: "1150.00",
            zkprice: "856.00"

        }
    ],
    '休闲食品': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171101144131.jpg",
            gtitle: "皇冠丹麦曲奇饼干 72g（原味）",
            id: 569,
            price: "9.00",
            standard: "/袋",
            stitle: "皇冠丹麦曲奇饼干 72g（原味）",
            vipprice: "9.00",
            zkprice: "4.80"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/170923174203.jpg",
            gtitle: "皇冠丹麦曲奇饼干 72g（葡萄）",
            id: 570,
            price: "9.00",
            standard: "/袋",
            stitle: "皇冠丹麦曲奇饼干 72g（葡萄）",
            vipprice: "9.00",
            zkprice: "4.80"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031151911.jpg",
            gtitle: "蓝钻石盐烤风味扁桃仁150g",
            id: 1596,
            price: "39.00",
            standard: "/罐",
            stitle: "蓝钻石盐烤风味扁桃仁150g",
            vipprice: "29.00",
            zkprice: "29.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026101513.jpg",
            gtitle: "德国进口 Schogetten斯格登黑巧克力100g 美味夹心 纸盒装",
            id: 1597,
            price: "15.90",
            standard: "/盒",
            stitle: "德国进口 Schogetten斯格登黑巧克力100g 美味夹心 纸盒装",
            vipprice: "8.8",
            zkprice: "8.8"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027102926.jpg",
            gtitle: "德国进口 Schogetten斯格登黑白配巧克力制品100g 美味夹心 纸盒装",
            id: 1619,
            price: "15.90",
            standard: "/盒",
            stitle: "德国进口 Schogetten斯格登黑白配巧克力制品100g 美味夹心 纸盒装",
            vipprice: "8.8",
            zkprice: "8.8"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031100357.jpg",
            gtitle: "德国进口 Schogetten斯格登阿尔卑斯榛子巧克力制品100g美味夹心 纸盒装",
            id: 1620,
            price: "15.90",
            standard: "/盒",
            stitle: "德国进口 Schogetten斯格登阿尔卑斯榛子巧克力制品100g 美味夹心 纸盒装",
            vipprice: "8.8",
            zkprice: "8.8"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027105109.jpg",
            gtitle: "德国进口 Schogetten斯格登酸奶草莓味巧克力制品100g 美味夹心 纸盒装",
            id: 1623,
            price: "15.90",
            standard: "/盒",
            stitle: "德国进口 Schogetten斯格登酸奶草莓味巧克力制品100g 美味夹心 纸盒装",
            vipprice: "8.8",
            zkprice: "8.8"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027111632.jpg",
            gtitle: "德国进口 Schogetten斯格登卡布奇诺巧克力制品100g 美味夹心 纸盒装",
            id: 1622,
            price: "15.90",
            standard: "/盒",
            stitle: "德国进口 Schogetten斯格登卡布奇诺巧克力制品100g 美味夹心 纸盒装",
            vipprice: "8.8",
            zkprice: "8.8"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031100735.jpg",
            gtitle: "斯格登可可粒巧克力制品100g ",
            id: 1625,
            price: "15.90",
            standard: "/盒",
            stitle: "斯格登可可粒巧克力制品100g ",
            vipprice: "8.8",
            zkprice: "8.8"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026135928.jpg",
            gtitle: "费列罗进口巧克力 婚庆喜糖零食生日礼物情人节礼物巧克力糖果 T24粒礼盒装 ",
            id: 1611,
            price: "98.00",
            standard: "/盒",
            stitle: "费列罗进口巧克力 婚庆喜糖零食生日礼物情人节礼物巧克力糖果 T24粒礼盒装 ",
            vipprice: "69.00",
            zkprice: "79.00"

        }
    ],
    '冲调/咖啡': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026145637.jpg",
            gtitle: "超级牌 3合1 经典炭烧白咖啡（固体饮料）",
            id: 1613,
            price: "25.90",
            standard: "/盒",
            stitle: "超级牌 3合1 经典炭烧白咖啡（固体饮料）",
            vipprice: "19.90",
            zkprice: "14.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171106113650.jpg",
            gtitle: "马来西亚 super咖啡Essenso艾昇斯3合1微磨速溶咖啡300g【预售】",
            id: 1640,
            price: "45.90",
            standard: "/盒",
            stitle: "马来西亚 super咖啡Essenso艾昇斯3合1微磨速溶咖啡300g【预售】",
            vipprice: "35.90",
            zkprice: "35.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171018154800.jpg",
            gtitle: "Plantree保罗森水果麦片500g",
            id: 553,
            price: "29.80",
            standard: "/袋",
            stitle: "Plantree保罗森水果麦片500g",
            vipprice: "29.80",
            zkprice: "22.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510033231350.jpg",
            gtitle: "马来西亚蓝酷白咖啡300克",
            id: 1639,
            price: "29.90",
            standard: "/盒",
            stitle: "马来西亚蓝酷白咖啡300克",
            vipprice: "26.00",
            zkprice: "16.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171018153942.jpg",
            gtitle: "Plantree保罗森坚果麦片500g",
            id: 554,
            price: "29.80",
            standard: "/袋",
            stitle: "Plantree保罗森坚果麦片500g",
            vipprice: "29.80",
            zkprice: "22.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171019140030.jpg",
            gtitle: "保罗森 德国进口经典麦片  谷物冲饮营养早餐麦片 500g",
            id: 555,
            price: "29.80",
            standard: "/袋",
            stitle: "保罗森 德国进口经典麦片  谷物冲饮营养早餐麦片 500g",
            vipprice: "29.80",
            zkprice: "22.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171018152504.jpg",
            gtitle: "Plantree保罗森五谷物麦片500g",
            id: 556,
            price: "29.80",
            standard: "/袋",
            stitle: "Plantree保罗森五谷物麦片500g",
            vipprice: "29.80",
            zkprice: "22.90"
        },
    ],
    '饮料/牛奶': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171031132811.jpg",
            gtitle: "蜜儿沃克3.5%脂肪 超高温全脂牛奶 200ml",
            id: 1513,
            price: "78",
            standard: "/瓶",
            stitle: "蜜儿沃克3.5%脂肪 超高温全脂牛奶 200ml",
            vipprice: "6.50",
            zkprice: "39.9"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171013152751.jpg",
            gtitle: "蜜儿沃克1.5%脂肪 超高温半脱脂牛奶 1L",
            id: 852,
            price: "16.90",
            standard: "/瓶",
            stitle: "蜜儿沃克1.5%脂肪 超高温半脱脂牛奶 1L",
            vipprice: "16.90",
            zkprice: "9.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171013162613.jpg",
            gtitle: "蜜儿沃克3.5%脂肪 超高温全脂牛奶 1L",
            id: 853,
            price: "16.90",
            standard: "/瓶",
            stitle: "蜜儿沃克3.5%脂肪 超高温全脂牛奶 1L",
            vipprice: "16.90",
            zkprice: "9.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171016114613.jpg",
            gtitle: "贝利玛芒果汁1l",
            id: 841,
            price: "15.90",
            standard: "/瓶",
            stitle: "贝利玛芒果汁1l",
            vipprice: "15.90",
            zkprice: "9.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171016114637.jpg",
            gtitle: "贝利玛复合果汁1l",
            id: 840,
            price: "15.90",
            standard: "/瓶",
            stitle: "贝利玛复合果汁1l",
            vipprice: "15.90",
            zkprice: "9.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171016114717.jpg",
            gtitle: "贝利玛菠萝汁1l",
            id: 839,
            price: "15.90",
            standard: "/瓶",
            stitle: "贝利玛菠萝汁1l",
            vipprice: "15.90",
            zkprice: "9.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171016114737.jpg",
            gtitle: "贝利玛苹果汁1l",
            id: 838,
            price: "15.90",
            standard: "/瓶",
            stitle: "贝利玛苹果汁1l",
            vipprice: "15.90",
            zkprice: "9.90"

        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171016114818.jpg",
            gtitle: "贝利玛橙子汁1l",
            id: 837,
            price: "15.90",
            standard: "/瓶",
            stitle: "贝利玛橙子汁1l",
            vipprice: "15.90",
            zkprice: "9.90"
        }
    ],
    '粮油米面': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171012160322.jpg",
            gtitle: "安达卢特级初榨橄榄油1L",
            id: 751,
            price: "110.00",
            standard: "/瓶",
            stitle: "安达卢特级初榨橄榄油1L",
            vipprice: "110.00",
            zkprice: "59.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171103173323.jpg",
            gtitle: "易贝斯特特级初榨橄榄油1L",
            id: 1633,
            price: "118.00",
            standard: "/罐",
            stitle: "易贝斯特特级初榨橄榄油1l",
            vipprice: "118.00",
            zkprice: "89.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171012095610.jpg",
            gtitle: "欧立味佳（Olivija ）佳葵花籽油 乌克兰原装进口 高品质健康食用油5L",
            id: 1392,
            price: "99.00",
            standard: "/瓶",
            stitle: "欧立味佳（Olivija ）佳葵花籽油 乌克兰原装进口 高品质健康食用油5L",
            vipprice: "99.00",
            zkprice: "69.00"
        },
    ],
    '婴儿奶粉': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171013145857.jpg",
            gtitle: "澳洲a2 Platinum 白金版婴幼儿奶粉1段 900g ( 0-6个月 )",
            id: 1558,
            price: "398.00",
            standard: "/罐/6",
            stitle: "澳洲a2 Platinum 白金版婴幼儿奶粉1段 900g ( 0-6个月 )",
            vipprice: "398.00",
            zkprice: "309.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013150011.jpg",
            gtitle: "澳洲A2 PLATINUM白金 2段婴幼儿奶粉 (6-12月) 900克",
            id: 1559,
            price: "498.00",
            standard: "/罐/6",
            stitle: "澳洲A2 PLATINUM白金 2段婴幼儿奶粉 (6-12月) 900克",
            vipprice: "299.00",
            zkprice: "299.00",
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171031132103.jpg",
            gtitle: "澳洲a2白金版婴儿奶粉 宝宝进口奶粉3段900g （1-3周岁）",
            id: 1560,
            price: "398.00",
            standard: "/罐/6",
            stitle: "澳洲a2白金版婴儿奶粉 宝宝进口奶粉3段900g （1-3周岁）",
            vipprice: "289.00",
            zkprice: "289.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171023114654.jpg",
            gtitle: "澳洲Bellamys贝拉米奶粉1段(0-6个月)900g\罐",
            id: 1079,
            price: "398.00",
            standard: "/罐",
            stitle: "澳洲Bellamys贝拉米奶粉1段(0-6个月)900g\罐",
            vipprice: "398.00",
            zkprice: "249.00"

        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171023114048.jpg",
            gtitle: "澳洲贝拉米（Bellamys）2段有机婴儿奶粉(6-12个月)900g",
            id: 1081,
            price: "398.00",
            standard: "/罐",
            stitle: "澳洲贝拉米（Bellamys）2段有机婴儿奶粉(6-12个月)900g",
            vipprice: "398.00",
            zkprice: "239.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171023113540.jpg",
            gtitle: "澳洲贝拉米（Bellamys）3段有机婴儿奶粉(1-3岁)900g 原装进口奶粉",
            id: 1082,
            price: "398.00",
            standard: "/罐",
            stitle: "澳洲贝拉米（Bellamys）3段有机婴儿奶粉(1-3岁)900g 原装进口奶粉",
            vipprice: "398.00",
            zkprice: "229.00"
        }
    ],
    "饮料/酒水": [
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510044879827.jpg",
            gtitle: "西班牙 霓梦の幻灭重生 起泡酒（柠檬味）750ML-预售",
            id: 1634,
            price: "129.00",
            standard: "/瓶",
            stitle: "西班牙 霓梦の幻灭重生 起泡酒（柠檬味）750ML-预售",
            vipprice: "113.50",
            zkprice: "68.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510050409110.jpg",
            gtitle: "西班牙 霓梦の蠢蠢欲动 起泡酒（甜橙味）750ML-预售",
            id: 1635,
            price: "129.00",
            standard: "/瓶",
            stitle: "西班牙 霓梦の蠢蠢欲动 起泡酒（甜橙味）750ML-预售",
            vipprice: "113.50",
            zkprice: "68.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510047921538.jpg",
            gtitle: "西班牙 霓梦の奢华至尊 起泡酒（车厘子味）750ML",
            id: 1636,
            price: "129.00",
            standard: "/瓶",
            stitle: "西班牙 霓梦の奢华至尊 起泡酒（车厘子味）750ML-预售",
            vipprice: "113.50",
            zkprice: "68.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510036980154.jpg",
            gtitle: "西班牙  霓梦の浪漫物语 起泡酒（水蜜桃味）750ML-预售",
            id: 1637,
            price: "129.00",
            standard: "/瓶",
            stitle: "西班牙  霓梦の浪漫物语 起泡酒（水蜜桃味）750ML-预售",
            vipprice: "113.50",
            zkprice: "68.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510041580160.jpg",
            gtitle: "西班牙   霓梦の命运女神 起泡酒（蓝莓味）750ML-预售",
            id: 1638,
            price: "129.00",
            standard: "/瓶",
            stitle: "西班牙   霓梦の命运女神 起泡酒（蓝莓味）750ML-预售",
            vipprice: "113.50",
            zkprice: "68.00"
        }
    ],
    '婴儿尿不湿': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171025113910.jpg",
            gtitle: "日本原装花王纸尿裤NB90片",
            id: 1029,
            price: "158.00",
            standard: "/袋",
            stitle: "日本原装花王纸尿裤NB90片",
            vipprice: "158.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171025111926.jpg",
            gtitle: "日本花王妙而舒婴儿纸尿裤小号(S) 82片",
            id: 919,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿纸尿裤小号(S) 82片",
            vipprice: "158.00",
            zkprice: "109.00"

        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/170923134749.png",
            gtitle: "日本花王妙而舒婴儿纸尿裤特大号(XL)44片",
            id: 913,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿纸尿裤特大号(XL)44片",
            vipprice: "158.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027170026.jpg",
            gtitle: "日本花王妙而舒婴儿纸尿裤大号(L)54片",
            id: 910,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿纸尿裤大号(L)54片",
            vipprice: "158.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027171400.jpg",
            gtitle: "日本花王妙而舒婴儿学步裤大号(L) 44 片",
            id: 909,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿学步裤大号(L) 44 片",
            vipprice: "158.00",
            zkprice: "109.00"
        },
        {

            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171025115135.jpg",
            gtitle: "日本花王妙而舒婴儿学步裤 特大号(XL) 38片",
            id: 440,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿学步裤 特大号(XL) 38片",
            vipprice: "158.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171025115528.jpg",
            gtitle: "日本花王纸尿裤M64片",
            id: 435,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王纸尿裤M64片",
            vipprice: "158.00",
            zkprice: "109.00"
        }
    ],
    '婴儿护理': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011184004.jpg",
            gtitle: "德国sanosan哈罗闪婴幼儿爽身粉/痱子粉100g",
            id: 1505,
            price: "89.00",
            standard: "/瓶",
            stitle: "德国sanosan哈罗闪婴幼儿爽身粉/痱子粉100g",
            vipprice: "89.00",
            zkprice: "69.00"

        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011182044.jpg",
            gtitle: "德国sanosan哈罗闪婴儿润肤霜150ML",
            id: 1503,
            price: "129.00",
            standard: "/瓶",
            stitle: "德国sanosan哈罗闪婴儿润肤霜150ML",
            vipprice: "129.00",
            zkprice: "99.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011183036.jpg",
            gtitle: "德国sanosan哈罗闪婴儿无泪洗发水沐浴露二合一500ml",
            id: 1504,
            price: "169.00",
            standard: "/瓶",
            stitle: "德国sanosan哈罗闪婴儿无泪洗发水沐浴露二合一500ml",
            vipprice: "169.00",
            zkprice: "99.00"

        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026110510.jpg",
            gtitle: "施巴婴儿护面霜50ml ",
            id: 1601,
            price: "169.00",
            standard: "/瓶",
            stitle: "施巴婴儿护面霜50ml ",
            vipprice: "119.00",
            zkprice: "119.00"
        },
        {

            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026111646.jpg",
            gtitle: "施巴婴儿护臀膏100ml ",
            id: 1602,
            price: "129.00",
            standard: "/瓶",
            stitle: "施巴婴儿护臀膏100ml ",
            vipprice: "89.00",
            zkprice: "89.00"

        }
    ],
    '母婴用品': [
        {

            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026112709.jpg",
            gtitle: "黄色小鸭婴幼儿指甲剪",
            id: 485,
            price: "49.00",
            standard: "/个",
            stitle: "黄色小鸭婴幼儿指甲剪",
            vipprice: "45.00",
            zkprice: "29.00"

        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026113911.jpg",
            gtitle: "欧乐B多动向动力儿童牙刷（8岁以上）",
            id: 484,
            price: "59.00",
            standard: "/个",
            stitle: "欧乐B多动向动力儿童牙刷（8岁以上）",
            vipprice: "59.00",
            zkprice: "39.00"
        },
    ],
    '手部护理': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026154258.jpg",
            gtitle: "发希fascy（陆心媛）倍润手霜-草莓40ml",
            id: 1614,
            price: "35.00",
            standard: "/支",
            stitle: "发希fascy（陆心媛）倍润手霜-草莓40ml",
            vipprice: "19.00",
            zkprice: "19.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026142406.jpg",
            gtitle: "发希fascy（陆心媛）倍润手霜-牛奶40ml",
            id: 1612,
            price: "35.00",
            standard: "/支",
            stitle: "发希fascy（陆心媛）倍润手霜-牛奶40ml",
            vipprice: "19.00",
            zkprice: "19.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171026120539.jpg",
            gtitle: "发希fascy（陆心媛）倍润手霜-桃子40ml",
            id: 1607,
            price: "35.00",
            standard: "/支",
            stitle: "发希fascy（陆心媛）倍润手霜-桃子40ml",
            vipprice: "19.00",
            zkprice: "19.00"
        },
    ],
    '身体护理': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171103162054.jpg",
            gtitle: "LG安宝笛浪漫邂逅香水保湿身体乳（紫色百合）400g",
            id: 1616,
            price: "99.00",
            standard: "/瓶",
            stitle: "LG安宝笛浪漫邂逅香水保湿身体乳（紫色百合）400g",
            vipprice: "49.00",
            zkprice: "59.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171103164629.jpg",
            gtitle: " LG安宝笛甜蜜爱恋香水保湿身体乳（粉色玫瑰）400g",
            id: 1629,
            price: "99.00",
            standard: "/瓶",
            stitle: " LG安宝笛甜蜜爱恋香水保湿身体乳（粉色玫瑰）400g",
            vipprice: "99.00",
            zkprice: "59.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171103171321.jpg",
            gtitle: "LG安宝笛梦中诱惑香水美肌沐浴露500ml ",
            id: 1630,
            price: "99.00",
            standard: "/瓶",
            stitle: "LG安宝笛梦中诱惑香水美肌沐浴露500ml ",
            vipprice: "99.00",
            zkprice: "59.00"

        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510040289777.jpg",
            gtitle: "韩国进口LG安宝笛 守护爱恋香水美肌沐浴露 500ml【预售】",
            id: 1631,
            price: "99.00",
            standard: "/瓶",
            stitle: "韩国进口LG安宝笛 守护爱恋香水美肌沐浴露 500ml 【预售】",
            vipprice: "87.10",
            zkprice: "59.00"
        },

    ],
    '头发护理': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171103172041.jpg",
            gtitle: "诺珊娜绿色溪谷柔炫丝滑去屑系列小套盒（480ml+280ml）",
            id: 1632,
            price: "98.00",
            standard: "/盒",
            stitle: "诺珊娜绿色溪谷柔炫丝滑去屑系列小套盒（480ml+280ml）",
            vipprice: "98.00",
            zkprice: "69.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027100421.jpg",
            gtitle: "吕含光耀护损伤修护洗发水400g",
            id: 303,
            price: "107.80",
            standard: "/瓶",
            stitle: "吕含光耀护损伤修护洗发水400g",
            vipprice: "107.80",
            zkprice: "69.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171101155957.jpg",
            gtitle: "吕舒盈清润舒缓去屑洗发水400g",
            id: 304,
            price: "107.80",
            standard: "/瓶",
            stitle: "吕舒盈清润舒缓去屑洗发水400g",
            vipprice: "107.80",
            zkprice: "69.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171101155517.jpg",
            gtitle: "吕舒盈清润清爽控油洗发水400ml",
            id: 305,
            price: "107.80",
            standard: "/瓶",
            stitle: "吕舒盈清润清爽控油洗发水400ml",
            vipprice: "107.80",
            zkprice: "69.00"

        },

    ],
    '家庭清洁': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171002113111.jpg",
            gtitle: "西班牙原装进口MAYOR DOMO/玛玉厨房清洁浓缩型洗洁精600ml",
            id: 980,
            price: "12.80",
            standard: "/瓶",
            stitle: "西班牙原装进口MAYOR DOMO/玛玉厨房清洁浓缩型洗洁精600ml",
            vipprice: "12.80",
            zkprice: "9.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171002154754.jpg",
            gtitle: "西班牙原装进口玛玉浓缩马赛皂液洗衣液洗衣粉超大量3L",
            id: 978,
            price: "37.80",
            standard: "/瓶",
            stitle: "西班牙原装进口玛玉浓缩马赛皂液洗衣液洗衣粉超大量3L",
            vipprice: "29.00",
            zkprice: "24.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171002121120.jpg",
            gtitle: "西班牙原装进口 玛玉亮采洗衣液",
            id: 976,
            price: "37.80",
            standard: "/瓶",
            stitle: "西班牙原装进口 玛玉亮采洗衣液",
            vipprice: "37.80",
            zkprice: "24.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027103852.jpg",
            gtitle: "米斯克林温和型内衣洗衣液400ml",
            id: 1621,
            price: "36.00",
            standard: "/瓶",
            stitle: "米斯克林温和型内衣洗衣液400ml",
            vipprice: "19.90",
            zkprice: "19.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027110705.jpg",
            gtitle: "日本葆色 宠爱宝贝泡沫洗手液 250ML",
            id: 1496,
            price: "19.00",
            standard: "/瓶",
            stitle: "日本葆色 宠爱宝贝泡沫洗手液 250ML",
            vipprice: "19.00",
            zkprice: "9.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027113314.jpg",
            gtitle: "日本葆色 果园清新泡沫洗手液 250ML",
            id: 1321,
            price: "19.00",
            standard: "/瓶",
            stitle: "日本葆色 果园清新泡沫洗手液 250ML",
            vipprice: "19.00",
            zkprice: "9.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027113043.jpg",
            gtitle: "韩国恩牧思婴幼儿薰衣草香型洗衣液1L瓶装",
            id: 1336,
            price: "38.00",
            standard: "/瓶",
            stitle: "韩国恩牧思婴幼儿薰衣草香型洗衣液1L瓶装",
            vipprice: "38.00",
            zkprice: "19.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171017152145.jpg",
            gtitle: "韩国恩牧思婴幼儿玫瑰香型洗衣液1L瓶装",
            id: 1337,
            price: "38.00",
            standard: "/瓶",
            stitle: "韩国恩牧思婴幼儿玫瑰香型洗衣液1L瓶装",
            vipprice: "38.00",
            zkprice: "19.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171020113631.jpg",
            gtitle: "蔚净污渍清洗剂 花香型 1000ml",
            id: 1306,
            price: "18.90",
            standard: "/瓶",
            stitle: "蔚净污渍清洗剂 花香型 1000ml",
            vipprice: "18.90",
            zkprice: "13.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/170927125040.png",
            gtitle: "蔚净污渍清洗剂 清新型 1000ml",
            id: 1305,
            price: "18.90",
            standard: "/瓶",
            stitle: "蔚净污渍清洗剂 清新型 1000ml",
            vipprice: "18.90",
            zkprice: "13.90"
        },
    ],
    '口腔清洁': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027112330.jpg",
            gtitle: "蔚净植物护龈牙膏75ml",
            id: 1624,
            price: "19.50",
            standard: "/瓶",
            stitle: "蔚净植物护龈牙膏75ml",
            vipprice: "10.90",
            zkprice: "10.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027115436.jpg",
            gtitle: "蔚净清爽护齿牙膏75ml",
            id: 1626,
            price: "19.50",
            standard: "/支",
            stitle: "蔚净清爽护齿牙膏75ml",
            vipprice: "10.90",
            zkprice: "10.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510135775498.jpg",
            gtitle: "土耳其原装进口正品ViKing  蔚净宝宝呵护牙膏75ml【预售】",
            id: 1655,
            price: "19.90",
            standard: "/支",
            stitle: "土耳其原装进口正品ViKing 蔚净宝宝呵护牙膏75ml【预售】",
            vipprice: "17.60",
            zkprice: "10.90"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171027164827.jpg",
            gtitle: "蔚净儿童固齿牙膏75ml",
            id: 1627,
            price: "15.90",
            standard: "/支",
            stitle: "蔚净儿童固齿牙膏75ml",
            vipprice: "10.90",
            zkprice: "10.90"
        },
    ],
    '保健用品': [
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011135840.jpg",
            gtitle: "康力士牌三文鱼油维生素E软胶囊100粒",
            id: 1426,
            price: "158.00",
            standard: "/瓶",
            stitle: "康力士牌三文鱼油维生素E软胶囊100粒",
            vipprice: "158.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011120257.jpg",
            gtitle: "康力士®磷脂胶囊100粒",
            id: 1358,
            price: "158.00",
            standard: "/瓶",
            stitle: "康力士®磷脂胶囊100粒",
            vipprice: "158.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011141527.jpg",
            gtitle: "康力士牌三文鱼油维生素E软胶囊200粒",
            id: 1427,
            price: "288.00",
            standard: "/瓶",
            stitle: "康力士牌三文鱼油维生素E软胶囊200粒",
            vipprice: "288.00",
            zkprice: "144.00",
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011163900.jpg",
            gtitle: "康力士®磷脂胶囊200粒",
            id: 1516,
            price: "288.00",
            standard: "/瓶",
            stitle: "康力士®磷脂胶囊200粒",
            vipprice: "288.00",
            zkprice: "144.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171010144616.jpg",
            gtitle: "康力士牌三文鱼油维生素E软胶囊300粒",
            id: 1415,
            price: "388.00",
            standard: "/瓶",
            stitle: "康力士牌三文鱼油维生素E软胶囊300粒",
            vipprice: "388.00",
            zkprice: "194.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011164235.jpg",
            gtitle: "康力士®磷脂胶囊300粒",
            id: 1518,
            price: "388.00",
            standard: "/瓶",
            stitle: "康力士®磷脂胶囊300粒",
            vipprice: "388.00",
            zkprice: "194.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011172029.jpg",
            gtitle: "康力士牌褪黑素片60片",
            id: 955,
            price: "138.00",
            standard: "/瓶",
            stitle: "康力士牌褪黑素片60片",
            vipprice: "138.00",
            zkprice: "69.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011162758.jpg",
            gtitle: "康力士牌牛初乳片60片",
            id: 953,
            price: "198.00",
            standard: "/瓶",
            stitle: "康力士牌牛初乳片60片",
            vipprice: "198.00",
            zkprice: "99.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011162113.jpg",
            gtitle: "康力士牌纤维康片60片",
            id: 958,
            price: "168.00",
            standard: "/瓶",
            stitle: "康力士牌纤维康片60片",
            vipprice: "168.00",
            zkprice: "84.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171002161321.jpg",
            gtitle: "康力士牌钙维生素D胶囊90粒",
            id: 950,
            price: "188.00",
            standard: "/瓶",
            stitle: "康力士牌钙维生素D胶囊90粒",
            vipprice: "188.00",
            zkprice: "94.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011161605.jpg",
            gtitle: "银发族复合维生素片（营养素补充剂）500mg",
            id: 1023,
            price: "178.00",
            standard: "/瓶",
            stitle: "银发族复合维生素片（营养素补充剂）500mg",
            vipprice: "178.00",
            zkprice: "89.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011151702.jpg",
            gtitle: "全家福复合维生素片（营养素补充剂）100片ｘ500mg",
            id: 218,
            price: "178.00",
            standard: "/瓶",
            stitle: "全家福复合维生素片（营养素补充剂）100片ｘ500mg",
            vipprice: "178.00",
            zkprice: "89.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011154326.jpg",
            gtitle: "立安降脂灵胶囊60粒ｘ500mg",
            id: 1037,
            price: "158.00",
            standard: "/瓶",
            stitle: "立安降脂灵胶囊60粒ｘ500mg",
            vipprice: "158.00",
            zkprice: "50.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011172644.jpg",
            gtitle: "好健牌牛乳钙片60片",
            id: 1050,
            price: "198.00",
            standard: "/瓶",
            stitle: "好健牌牛乳钙片60片",
            vipprice: "198.00",
            zkprice: "99.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011160143.jpg",
            gtitle: "康力士®红太胶囊60粒",
            id: 930,
            price: "298.00",
            standard: "/瓶",
            stitle: "康力士®红太胶囊60粒",
            vipprice: "298.00",
            zkprice: "149.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011173343.jpg",
            gtitle: "康力士®安迪胶囊60粒",
            id: 929,
            price: "298.00",
            standard: "/瓶",
            stitle: "康力士®安迪胶囊60粒",
            vipprice: "298.00",
            zkprice: "149.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011163143.jpg",
            gtitle: "南求牌恒力片60片ｘ675mg",
            id: 223,
            price: "228.00",
            standard: "/瓶",
            stitle: "南求牌恒力片60片ｘ675mg",
            vipprice: "228.00",
            zkprice: "114.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011163426.jpg",
            gtitle: "康力士®鲨鱼软骨粉胶囊100粒",
            id: 944,
            price: "298.00",
            standard: "/瓶",
            stitle: "康力士®鲨鱼软骨粉胶囊100粒",
            vipprice: "298.00",
            zkprice: "149.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011165058.jpg",
            gtitle: "康鹰牌液体钙软胶囊100粒",
            id: 226,
            price: "138.00",
            standard: "/瓶",
            stitle: "康鹰牌液体钙软胶囊100粒",
            vipprice: "138.00",
            zkprice: "69.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011165926.jpg",
            gtitle: "康鹰牌液体钙软胶囊200粒",
            id: 1520,
            price: "258.00",
            standard: "/瓶",
            stitle: "康鹰牌液体钙软胶囊200粒",
            vipprice: "258.00",
            zkprice: "129.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011170623.jpg",
            gtitle: "康鹰牌多种维生素片60片",
            id: 964,
            price: "188.00",
            standard: "/瓶",
            stitle: "康鹰牌多种维生素片60片",
            vipprice: "188.00",
            zkprice: "94.00"
        },
        {
            bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011171721.jpg",
            gtitle: "康鹰牌银杏胶囊60粒",
            id: 966,
            price: "198.00",
            standard: "/瓶",
            stitle: "康鹰牌银杏胶囊60粒",
            vipprice: "198.00",
            zkprice: "99.00"
        }
    ],
    '现场专区': [
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012160322.jpg",
            gtitle: "安达卢特级初榨橄榄油1L",
            id: 751,
            price: "110.00",
            standard: "/瓶",
            stitle: "安达卢特级初榨橄榄油1L",
            vipprice: "96.80",
            zkprice: "59.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171031112516.jpg",
            gtitle: "花印汤村温泉补水套装（水漾洁面150g+99ml水+99ml乳液）（深层清洁滋养保湿温和护肤） 【预售】",
            id: 1605,
            price: "259.00",
            standard: "/盒",
            stitle: "花印汤村温泉补水套装（水漾洁面150g+99ml水+99ml乳液）（深层清洁滋养保湿温和护肤） 【预售】",
            vipprice: "103.80",
            zkprice: "109.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171022140025.jpg",
            gtitle: "斯内普海洋燕窝补水安瓶精华面膜25ml*10",
            id: 876,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普海洋燕窝补水安瓶精华面膜25ml*10",
            vipprice: "139.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171022140912.jpg",
            gtitle: "斯内普黄金胶原蛋白精华面膜25ml*10",
            id: 877,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普黄金胶原蛋白精华面膜25ml*10",
            vipprice: "139.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171022135121.jpg",
            gtitle: "斯内普虎形抗皱面膜(改善皱纹功能性产品)25ml*10",
            id: 878,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普虎形抗皱面膜(改善皱纹功能性产品)25ml*10",
            vipprice: "139.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171022133801.jpg",
            gtitle: "斯内普熊猫形美白面膜(美白功能性产品)25ml*10",
            id: 879,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普熊猫形美白面膜(美白功能性产品)25ml*10",
            vipprice: "139.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171022134633.jpg",
            gtitle: "斯内普龙形舒缓面膜25ml*10",
            id: 1067,
            price: "158.00",
            standard: "/盒",
            stitle: "斯内普龙形舒缓面膜25ml*10",
            vipprice: "139.00",
            zkprice: "79.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171031132811.jpg",
            gtitle: "蜜儿沃克3.5%脂肪 超高温全脂牛奶 200ml",
            id: 1513,
            price: "78.00",
            standard: "/瓶",
            stitle: "蜜儿沃克3.5%脂肪 超高温全脂牛奶 200ml",
            vipprice: "5.70",
            zkprice: "39.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013162613.jpg",
            gtitle: "蜜儿沃克3.5%脂肪 超高温全脂牛奶 1L",
            id: 853,
            price: "16.90",
            standard: "/瓶",
            stitle: "蜜儿沃克3.5%脂肪 超高温全脂牛奶 1L",
            vipprice: "14.90",
            zkprice: "9.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013152751.jpg",
            gtitle: "蜜儿沃克1.5%脂肪 超高温半脱脂牛奶 1L",
            id: 852,
            price: "16.90",
            standard: "/瓶",
            stitle: "蜜儿沃克1.5%脂肪 超高温半脱脂牛奶 1L",
            vipprice: "14.90",
            zkprice: "9.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171016114818.jpg",
            gtitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛橙子汁1",
            id: 837,
            price: "15.90",
            standard: "/瓶",
            stitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛橙子汁1l",
            vipprice: "14.00",
            zkprice: "9.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171016114737.jpg",
            gtitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛苹果汁1l",
            id: 838,
            price: "15.90",
            standard: "/瓶",
            stitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛苹果汁1l",
            vipprice: "14.00",
            zkprice: "9.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171016114717.jpg",
            gtitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛菠萝汁1l",
            id: 839,
            price: "15.90",
            standard: "/瓶",
            stitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛菠萝汁1l",
            vipprice: "14.00",
            zkprice: "9.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171016114637.jpg",
            gtitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛复合果汁1l",
            id: 840,
            price: "15.90",
            standard: "/瓶",
            stitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛复合果汁1l",
            vipprice: "14.00",
            zkprice: "9.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171016114613.jpg",
            gtitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛芒果汁1l",
            id: 841,
            price: "15.90",
            standard: "/瓶",
            stitle: "欧洲塞浦路斯贝利玛原装进口 贝利玛芒果汁1l",
            vipprice: "14.00",
            zkprice: "9.90"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171025111926.jpg",
            gtitle: "日本花王妙而舒婴儿纸尿裤小号(S) 82片",
            id: 919,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿纸尿裤小号(S) 82片",
            vipprice: "139.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171025113910.jpg",
            gtitle: "日本原装花王纸尿裤NB90片",
            id: 1029,
            price: "158.00",
            standard: "/袋",
            stitle: "日本原装花王纸尿裤NB90片",
            vipprice: "139.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171025115528.jpg",
            gtitle: "日本花王妙而舒婴儿纸尿裤M64片",
            id: 435,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿纸尿裤M64片",
            vipprice: "139.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171027170026.jpg",
            gtitle: "日本花王妙而舒婴儿纸尿裤大号(L)54片",
            id: 910,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿纸尿裤大号(L)54片",
            vipprice: "139.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170923134749.png",
            gtitle: "日本花王妙而舒婴儿纸尿裤特大号(XL)44片",
            id: 913,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿纸尿裤特大号(XL)44片",
            vipprice: "139.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171027171400.jpg",
            gtitle: "日本花王妙而舒婴儿学步裤大号(L) 44 片",
            id: 909,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿学步裤大号(L) 44 片",
            vipprice: "139.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171025115135.jpg",
            gtitle: "日本花王妙而舒婴儿学步裤 特大号(XL) 38片",
            id: 440,
            price: "158.00",
            standard: "/袋",
            stitle: "日本花王妙而舒婴儿学步裤 特大号(XL) 38片",
            vipprice: "139.00",
            zkprice: "109.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171026112709.jpg",
            gtitle: "黄色小鸭婴幼儿指甲剪",
            id: 485,
            price: "49.00",
            standard: "/个",
            stitle: "黄色小鸭婴幼儿指甲剪",
            vipprice: "39.60",
            zkprice: "29.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171026113911.jpg",
            gtitle: "德国进口博朗   欧乐B多动向动力儿童牙刷（8岁以上）",
            id: 484,
            price: "59.00",
            standard: "/个",
            stitle: "德国进口博朗  欧乐B多动向动力儿童牙刷（8岁以上）",
            vipprice: "51.90",
            zkprice: "39.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/1510041085929.jpg",
            gtitle: "韩国进口LG安宝笛  梦中诱惑香水美肌沐浴露500ml 【预售】",
            id: 1630,
            price: "99.00",
            standard: "/瓶",
            stitle: "韩国进口LG安宝笛   梦中诱惑香水美肌沐浴露500ml 【预售】",
            vipprice: "87.10",
            zkprice: "59.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171027113043.jpg",
            gtitle: "韩国恩牧思婴幼儿薰衣草香型洗衣液1L瓶装",
            id: 1336,
            price: "38.00",
            standard: "/瓶",
            stitle: "韩国恩牧思婴幼儿薰衣草香型洗衣液1L瓶装",
            vipprice: "33.40",
            zkprice: "19.00"
        },
        {
            bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017152145.jpg",
            gtitle: "韩国恩牧思婴幼儿玫瑰香型洗衣液1L瓶装",
            id: 1337,
            price: "38.00",
            standard: "/瓶",
            stitle: "韩国恩牧思婴幼儿玫瑰香型洗衣液1L瓶装",
            vipprice: "33.40",
            zkprice: "19.00"
        }
    ],
};
const nameList = Object.keys(provinceData);
let arr = Object.keys(provinceData);
let arrList = [];
arr.map((i, index) => {
    arrList.push(provinceData[i].length);
})

let aaa = [];

function genData(ds, province) {
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];
    Object.keys(province).forEach((item, index) => {
        sectionIDs.push(item);
        dataBlob[item] = item;
        rowIDs[index] = [];

        province[item].forEach((jj) => {
            rowIDs[index].push(jj.id);
            dataBlob[jj.id] = jj;
        });
    });
    return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

@connect(
    state => {
        return {...state.active}
    },
    dispatch => bindActionCreators({...active}, dispatch)
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
            dataNum: []


        }
    }


    componentDidMount() {

        const {scrollT} = this.props
        window.scrollTo(0, scrollT);
        // this.refs.listview.refs.listviewscroll.domScroller.scroller.scrollTo(0, scrollT);
        setTimeout(() => {
            this.setState({

                dataSource: genData(this.state.dataSource, provinceData),
                isLoading: false,
            });
        }, 600);
    }

    componentDidUpdate() {

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

        if (this.state.navShow === false && scroll < this.state.topHei) {
            this.setState({navShow: true})
        }
        if (this.state.navShow === true && scroll > this.state.topHei) {

            this.setState({navShow: false})
        }

    }

    render() {

        const {history, getstate} = this.props
        let data = Object.keys(provinceData);
        let tabs = [];
        data.map((i, index) => {
            tabs.push({title: i})
        })
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
                            // state: {scrollNum: window.scrollY}
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
                            <Flex.Item className="item-head center">双十一活动</Flex.Item>
                            <Flex.Item className="item-head right"><span></span></Flex.Item>
                        </Flex>
                    </div>
                }


                <div className='double-box'>
                    <div ref={(el) => this.Top = el}>
                        <div className='banner'><img src={require('static/images/doubleActive/banner.jpg')} alt=""/>
                        </div>
                        <div className='recharge'>
                            <img src={require('static/images/doubleActive/500.png')} alt=""
                                 onClick={()=>this._turnTop()}
                            />
                        </div>

                        <ul className='activeName'>
                            {nameList.map((i, index) => {

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
                            dataSource={this.state.dataSource}
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
                                                lineHeight: '0.86rem',
                                                textAlign: "center",
                                                color: "#fffefe",
                                                fontSize: "0.4rem",
                                                zIndex: 3,
                                                background: 'url(' + require('static/images/doubleActive/title-bg.png') + ') center center no-repeat #f2234e',
                                                backgroundSize: "90%",

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

