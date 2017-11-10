


import React from 'react';


import {Icon, Flex} from 'antd-mobile'

import './style/seckill.less';




export default class Seckill extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,

        }
        this.data = [
            [
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171019141111.jpg",
                    flashpic:null,
                    id:1575,
                    price:"95.50",
                    standard:"/瓶",
                    stitle:" 德国爱姬玛琳经典香水沐浴露/Perfume Shower Gel   ",
                    title:" 德国爱姬玛琳经典香水沐浴露/Perfume Shower Gel   ",
                    vipprice:"93.50",
                    zkprice:"93.50"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171019154610.jpg",
                    flashpic:null,
                    id:1592,
                    price:"158.00",
                    standard:"/瓶",
                    stitle:" 日本Nursery娜诗丽卸妆洁面啫喱-香橙 180ml",
                    title:" 日本Nursery娜诗丽卸妆洁面啫喱-香橙 180ml",
                    vipprice:"138.00",
                    zkprice:"138.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171013153109.jpg",
                    flashpic:null,
                    id:1381,
                    price:"27.00",
                    standard:"/个",
                    stitle:"Eventan日本进口瑷微丹净爽洗面奶120g 平衡油脂祛痘去黑头洁面乳 ",
                    title:"Eventan日本进口瑷微丹净爽洗面奶120g 平衡油脂祛痘去黑头洁面乳 ",
                    vipprice:"25.00",
                    zkprice:"25.00"
                },
                {
                    bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171011161231.jpg",
                    flashpic:null,
                    id:1383,
                    price:"56.90",
                    standard:"/瓶",
                    stitle:"Eventan日本进口瑷微丹 舒妍润肤卸妆水 300ml ",
                    title: "Eventan日本进口瑷微丹 舒妍润肤卸妆水 300ml ",
                    vipprice:"54.90",
                    zkprice:"54.90"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171011185245.jpg",
                    flashpic: null,
                    id:1429,
                    price:"149.00",
                    standard:"/支",
                    stitle:"谜尚魅力 润颜靓白柔护霜 SPF30+ PA+++ 23# 50ml",
                    title: "谜尚魅力 润颜靓白柔护霜 SPF30+ PA+++ 23# 50ml",
                    vipprice:"129.00",
                    zkprice:"129.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171011151426.png",
                    flashpic: null,
                    id:1430,
                    price:"149.00",
                    standard:"/支",
                    stitle:"谜尚魅力 润颜嫩白柔护霜 SPF30+ PA+++ 21#  50ml",
                    title:"谜尚魅力 润颜嫩白柔护霜 SPF30+ PA+++ 21#  50ml",
                    vipprice:"129.00",
                    zkprice:"129.00"
                }
            ],
            [
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171010144616.jpg",
                    flashpic:null,
                    id:1415,
                    price:"398.00",
                    standard: "/瓶",
                    stitle:"康力士牌三文鱼油维生素E软胶囊300粒",
                    title:"康力士牌三文鱼油维生素E软胶囊300粒",
                    vipprice:"388.00",
                    zkprice:"388.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171011173705.jpg",
                    flashpic: null,
                    id:1425,
                    price:"218.00",
                    standard:"/瓶",
                    stitle:"天美健牌维生素Ｅ软胶囊60粒",
                    title:"天美健牌维生素Ｅ软胶囊60粒",
                    vipprice:"188.00",
                    zkprice:"188.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171011154326.jpg",
                    flashpic: null,
                    id:1037,
                    price: "178.00",
                    standard:"/瓶",
                    stitle:"立安降脂灵胶囊60粒ｘ500mg",
                    title:"立安降脂灵胶囊60粒ｘ500mg",
                    vipprice:"158.00",
                    zkprice:"158.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171011172644.jpg",
                    flashpic: null,
                    id:1050,
                    price:"208.00",
                    standard:"/瓶",
                    stitle:"好健牌牛乳钙片",
                    title: "好健牌牛乳钙片",
                    vipprice:"198.00",
                    zkprice: "198.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171011120257.jpg",
                    flashpic: null,
                    id:1358,
                    price:"168.00",
                    standard:"/瓶",
                    stitle: "康力士®磷脂胶囊100粒",
                    title:"康力士®磷脂胶囊100粒",
                    vipprice:"158.00",
                    zkprice: "158.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/170924151606.jpg",
                    flashpic:null,
                    id:1103,
                    price:"65.00",
                    standard:"/盒",
                    stitle:"冈本0.03白金超薄3只0.03Platinum",
                    title:"冈本0.03白金超薄3只0.03Platinum",
                    vipprice:"60.00",
                    zkprice:"60.00"
                }
            ],
            [
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171019141351.jpg",
                    flashpic: null,
                    id: 1536,
                    price:"41.50",
                    standard:"/瓶",
                    stitle:"全罗道蜂蜜花梨茶510g",
                    title:"全罗道蜂蜜花梨茶510g",
                    vipprice:"39.50",
                    zkprice:"39.50"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171016143100.jpg",
                    flashpic:null,
                    id: 1537,
                    price:"17.30",
                    standard: "/盒",
                    stitle:"丽芝士纳宝帝奶酪威化饼干200克",
                    title:"丽芝士纳宝帝奶酪威化饼干200克",
                    vipprice:"15.30",
                    zkprice:"15.30"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171012160255.jpg",
                    flashpic:null,
                    id:1538,
                    price:"39.20",
                    standard:"/盒",
                    stitle:"丽芝士纳宝帝奶酪威化饼干350克",
                    title:"丽芝士纳宝帝奶酪威化饼干350克",
                    vipprice:"37.20",
                    zkprice:"37.20"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171012162615.jpg",
                    flashpic: null,
                    id:1539,
                    price:"12.30",
                    standard: "/瓶",
                    stitle:"穆达王子桃子味茶饮料200ml",
                    title: "穆达王子桃子味茶饮料200ml",
                    vipprice:"10.30",
                    zkprice:"10.30"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171012163033.jpg",
                    flashpic: null,
                    id:1540,
                    price:"37.80",
                    standard:"/盒",
                    stitle: "巴卡尔兰水果干可可牛奶味谷物棒240g",
                    title:"巴卡尔兰水果干可可牛奶味谷物棒240g",
                    vipprice:"35.80",
                    zkprice: "35.80"
                },
                {
                    bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171012163345.jpg",
                    flashpic: null,
                    id:1541,
                    price:"37.80",
                    standard:"/盒",
                    stitle:"巴卡尔兰热带水果干谷物棒(冷加工糕点）240g ",
                    title:"巴卡尔兰热带水果干谷物棒(冷加工糕点）240g ",
                    vipprice: "35.80",
                    zkprice:"35.80"
                }
            ],
            [
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171019164336.jpg",
                    flashpic: null,
                    id:1479,
                    price:"35.00",
                    standard:"/瓶",
                    stitle:"德露宝 洗发沐浴二合一（缤纷水果味）300ml",
                    title:"德露宝 洗发沐浴二合一（缤纷水果味）300ml",
                    vipprice:"33.00",
                    zkprice:"33.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171013184032.jpg",
                    flashpic:null,
                    id:1024,
                    price:"37.00",
                    standard:"/支",
                    stitle:"LION狮王牙膏牙刷 婴儿儿童防龋齿预防蛀牙天然木糖醇牙膏 龋克菲防蛀 葡萄味60G ",
                    title:"LION狮王牙膏牙刷 婴儿儿童防龋齿预防蛀牙天然木糖醇牙膏 龋克菲防蛀 葡萄味60G ",
                    vipprice:"35.00",
                    zkprice:"35.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/170924111743.jpg",
                    flashpic:null,
                    id: 1026,
                    price:"209.00",
                    standard: "/袋",
                    stitle:"日本原装进口MOONY尤妮佳纸尿裤/S84片小号",
                    title:"日本原装进口MOONY尤妮佳纸尿裤/S84片小号",
                    vipprice:"189.00",
                    zkprice:"189.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/170924113522.png",
                    flashpic: null,
                    id: 1029,
                    price:"178.00",
                    standard:"/袋",
                    stitle:"日本原装花王纸尿裤NB90片",
                    title:"日本原装花王纸尿裤NB90片",
                    vipprice:"109.00",
                    zkprice:"109.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171017113517.jpg",
                    flashpic:null,
                    id:1030,
                    price:"178.00",
                    standard:"/袋",
                    stitle:"日本花王妙而舒婴儿学步裤 特大号(XL) 38片",
                    title: "日本花王妙而舒婴儿学步裤 特大号(XL) 38片",
                    vipprice:"158.00",
                    zkprice: "158.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/170926163614.png",
                    flashpic:null,
                    id:1295,
                    price:"159.00",
                    standard: "/个",
                    stitle: "迪士尼维尼PP喝水杯300ml",
                    title: "迪士尼维尼PP喝水杯300ml",
                    vipprice:"149.00",
                    zkprice:"149.00"
                }
            ],
            [
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171002155201.jpg",
                    flashpic: null,
                    id:369,
                    price:"37.80",
                    standard:"/瓶",
                    stitle:"西班牙进口MAYOR DOMO 玛玉2合1洗衣液",
                    title:"西班牙进口MAYOR DOMO 玛玉2合1洗衣液",
                    vipprice:"29.00",
                    zkprice:"29.00"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171002154754.jpg",
                    flashpic:"http://worldwideapp.chinazjtc.com/upload/img/170923174805.png",
                    id: 978,
                    price:"37.80",
                    standard:"/瓶",
                    stitle:"西班牙原装进口玛玉浓缩马赛皂液洗衣液洗衣粉超大量3L",
                    title:"西班牙原装进口玛玉浓缩马赛皂液洗衣液洗衣粉超大量3L",
                    vipprice:"24.90",
                    zkprice:"24.90"
                },
                {
                    bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171002113111.jpg",
                    flashpic: null,
                    id:980,
                    price:"15.80",
                    standard:"/瓶",
                    stitle: "西班牙原装进口MAYOR DOMO/玛玉厨房清洁浓缩型洗洁精600ml",
                    title:"西班牙原装进口MAYOR DOMO/玛玉厨房清洁浓缩型洗洁精600ml",
                    vipprice:"12.80",
                    zkprice: "12.80"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171020110651.jpg",
                    flashpic:null,
                    id:1299,
                    price:"51.90",
                    standard:"/瓶",
                    stitle:"御衣坊生態濃縮橘油洗衣精100%天然橘2000ml",
                    title:"御衣坊生態濃縮橘油洗衣精100%天然橘2000ml",
                    vipprice:"49.90",
                    zkprice: "49.90"
                },
                {
                    bigpic: "http://worldwideapp.chinazjtc.com/upload/img/171012172058.jpg",
                    flashpic: null,
                    id:1555,
                    price:"15.50",
                    standard:"/瓶",
                    stitle:"蔚净玻璃清洗剂 500ml",
                    title:"蔚净玻璃清洗剂 500ml",
                    vipprice:"12.30",
                    zkprice:"12.30"
                },
                {
                    bigpic:"http://worldwideapp.chinazjtc.com/upload/img/171017150008.jpg",
                    flashpic:null,
                    id: 1300,
                    price:"189.00",
                    standard:"/个",
                    stitle:"Kitchen-art 钻石涂层不粘炒锅28cm",
                    title:"Kitchen-art 钻石涂层不粘炒锅28cm",
                    vipprice:"169.00",
                    zkprice:"169.00"
                }
            ],
            
        ]
        this.getData = this.data[0];

    }
    componentDidMount(){


    }

    _change = (tab, index) => {

        this.getData =this.data[index];

    }

    renderContent = tab =>

        (<div className='tab'>
            <ul>
                {this.getData.map(function (item,index) {
                    return(
                        <li key={index} onClick={()=>history.push(`/goodsDetail/${item.id}`)}>
                            <div className='image'><img src={item.bigpic} alt=""/></div>
                            <div className='right'>
                                <p className='name'>{item.title}</p>
                                <div className='price'>
                                    <p className='newPrice'>￥{item.price}</p>
                                    <p className='oldPrice'>原价：￥{item.zkprice}</p>
                                </div>
                                <div className='todo'>
                                    <div style={{overflow:"hidden"}}><button>马上抢</button></div>
                                    <div className='num'>
                                        仅剩100件
                                        <p><span style={{width:"30%"}}></span></p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}

            </ul>


        </div>);
    render(){
        
        const{data,history}=this.props
        const nameList = [];
        if(data && data.length>0 ){
            this.props.data[1].dataList.forEach(function (i,index) {
                nameList.push(i)
            })
        }

        const tabs = [{
            'title':'美妆个护'
        },{
            'title':'保健养生'
        },{
            'title':'食品酒水'
        },{
            'title':'母婴用品'
        },{
            'title':'家居家纺'
        }];
        // nameList.map(function (i,index) {
        //     tabs .push ({'title':<div><p><img src={require('static/image/ranking.png')} alt=""/></p><p>{i.name}</p></div>})
        // })

        
        return( 
            
            <div className='new-seckill'>
                <div className='nav-tab'>

                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">秒杀</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div style={{overflow:'hidden'}}><img src={require('static/image/scekill.png')} style={{width:"7.5rem",marginTop:'0.9rem',float:'left'}} alt=""/></div>
                <div className='ranking'>
                    <div className='tab'>

                        {this.data.map(function (item,index) {
                            return(
                                <ul key={index}>
                                    {item.map((item,key)=>{

                                        return(
                                            <li key={key} onClick={()=>history.push(`/goodsDetail/${item.id}`)}>
                                                <div className='image'><img src={item.bigpic} alt=""/></div>
                                                <div className='right'>
                                                    <p className='name'>{item.title}</p>
                                                    <div className='price'>
                                                        <p className='newPrice'>￥{item.zkprice}</p>
                                                        <p className='oldPrice'>原价：￥{item.price}</p>
                                                    </div>
                                                    <div className='todo'>
                                                        <div style={{overflow:"hidden"}}><button>马上抢</button></div>
                                                        {/*<div className='num'>*/}
                                                            {/*仅剩100件*/}
                                                            {/*<p><span style={{width:"30%"}}></span></p>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )


                        })}
                    </div>
                    {/*<WhiteSpace />*/}
                    {/*<StickyContainer>*/}
                    {/*<Tabs*/}
                        {/*tabs={tabs}*/}
                        {/*swipeable={false}*/}
                        {/*initalPage={'t2'}*/}
                        {/*onChange={this._change}*/}
                        {/*renderTabBar={this.renderTabBar}*/}
                    {/*>*/}

                        {/*{this.renderContent}*/}

                    {/*</Tabs>*/}
                    {/*</StickyContainer>*/}
                    {/*<WhiteSpace />*/}
                </div>


            </div>
        )
    }

}

