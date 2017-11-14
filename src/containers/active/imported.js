import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {Tabs, WhiteSpace, PullToRefresh, ListView,} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import {Icon, Flex} from 'antd-mobile'
import './style/imported.less';
const goodsList = [];
export default class Imported extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            modal1: false,
            modal2: false,
            show:true

        }
        this.data = [
            [
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170923170355.jpg",
                    gtitle: "丰灵TIPO面包干（榴莲口味） 300g",
                    id: 568,
                    price: "30.00",
                    standard: "/袋",
                    vipprice: "28.00",
                    zkprice: "28.00"
                },
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013174151.jpg",
                    gtitle: "77醇黑千层（饼干）78g",
                    id: 590,
                    price: "20.00",
                    standard: "/袋",
                    vipprice: "16.00",
                    zkprice: "16.00"
                },
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170924105151.jpg",
                    gtitle: "台宴甜酒豆腐乳380g",
                    id: 1015,
                    price: "31.00",
                    standard: "/瓶",
                    vipprice: "29.00",
                    zkprice: "29.00"
                },
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170924105737.jpg",
                    gtitle: "台宴米酱豆腐乳380g",
                    id: 1016,
                    price: "31.00",
                    standard: "/瓶",
                    vipprice: "29.00",
                    zkprice: "29.00"
                },
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170924105919.jpg",
                    gtitle: "台宴梅子豆腐乳380g",
                    id: 1017,
                    price: "31.00",
                    standard: "/瓶",
                    vipprice: "29.00",
                    zkprice: "29.00"
                },
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/170924110100.jpg",
                    gtitle: "台宴辣豆瓣豆腐乳380g",
                    id: 1018,
                    price: "31.00",
                    standard: "/瓶",
                    vipprice: "29.00",
                    zkprice: "29.00"
                }
            ],
            [
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012095604.jpg",
                    gtitle: "欧立味佳（Olivija ）佳葵花籽油 乌克兰原装进口 高品质健康食用油5L",
                    id: 1392,
                    price: "109.00",
                    standard: "/瓶",
                    vipprice: "99.00",
                    zkprice: "99.00"
                },
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171009164816.jpg",
                    gtitle: "西班牙 BETIS贝蒂斯 特级初榨橄榄油1000ml",
                    id: 1397,
                    price: "188.00",
                    standard: "/罐",
                    vipprice: "168.00",
                    zkprice: "168.00"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171013112905.jpg",
                    gtitle:"意大利原装进口 维拉直身形意大利面500g",
                    id: 1398,
                    price:"15.50",
                    standard:"/袋",
                    vipprice: "13.50",
                    zkprice:"13.50"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171009172238.jpg",
                    gtitle:"意大利原装进口 维拉直身形意大利面 450g 进口粮油调味品 ",
                    id:1399,
                    price:"15.50",
                    standard: "/个",
                    vipprice:"13.50",
                    zkprice:"13.50"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171009172557.jpg",
                    gtitle:"维拉牌意大利面条 单色螺旋形 原装450g螺丝面通心粉意面意粉",
                    id:1400,
                    price: "15.50",
                    standard: "/个",
                    vipprice:"13.50",
                    zkprice:"13.50"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171009173007.jpg",
                    gtitle:"维拉牌意大利面条 维拉牌蝴蝶形面450g",
                    id:1401,
                    price:"17.00",
                    standard:"/袋",
                    vipprice: "15.00",
                    zkprice:"15.00"
                }
            ],
            [
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171016143057.jpg",
                    gtitle:"丽芝士纳宝帝奶酪威化饼干200克",
                    id:1537,
                    price:"17.30",
                    standard:"/盒",
                    vipprice:"15.30",
                    zkprice:"15.30"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012160252.jpg",
                    gtitle:"丽芝士纳宝帝奶酪威化饼干350克",
                    id: 1538,
                    price: "39.20",
                    standard:"/盒",
                    vipprice:"37.20",
                    zkprice:"37.20"
                },
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012163031.jpg",
                    gtitle:"巴卡尔兰水果干可可牛奶味谷物棒240g",
                    id:1540,
                    price:"37.80",
                    standard:"/盒",
                    vipprice:"35.80",
                    zkprice: "35.80"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012163343.jpg",
                    gtitle:"巴卡尔兰热带水果干谷物棒(冷加工糕点）240g ",
                    id: 1541,
                    price:"37.80",
                    standard: "/盒",
                    vipprice:"35.80",
                    zkprice:"35.80"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012163609.jpg",
                    gtitle:"巴卡尔兰混合水果干谷物棒240g",
                    id:1542,
                    price:"37.80",
                    standard:"/盒",
                    vipprice:"35.80",
                    zkprice:"35.80"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012163832.jpg",
                    gtitle:"巴卡尔兰橘皮蔓越梅干谷物棒240g  ",
                    id: 1543,
                    price:"37.80",
                    standard:"/盒",
                    vipprice:"35.80",
                    zkprice:"35.80"
                }
            ],
            [
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012162613.jpg",
                    gtitle:"穆达王子桃子味茶饮料200ml",
                    id:1539,
                    price:"12.30",
                    standard:"/瓶",
                    vipprice: "10.30",
                    zkprice:"10.30"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012165043.jpg",
                    gtitle:"趣味泰国进口特色风味饮品果蔬饮料荔枝味瓶装果汁饮料（含椰果）320ml",
                    id:1545,
                    price:"8.20",
                    standard:"/瓶",
                    vipprice:"6.20",
                    zkprice:"6.20"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012165235.jpg",
                    gtitle:"趣味泰国进口特色风味饮品果蔬饮料草莓味瓶装果汁饮料（含椰果）320ml",
                    id: 1546,
                    price:"8.20",
                    standard:"/瓶",
                    vipprice: "6.20",
                    zkprice:"6.20"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012165443.jpg",
                    gtitle: "趣味泰国进口特色风味饮品果蔬饮料葡萄味瓶装果汁饮料（含椰果）320ml",
                    id:1547,
                    price:"8.20",
                    standard:"/瓶",
                    vipprice:"6.20",
                    zkprice:"6.20"
                },
                {
                    bigpic:"http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171012165631.jpg",
                    gtitle:"趣味泰国进口特色风味饮品果蔬饮料芒果味瓶装果汁饮料（含椰果）320ml",
                    id:1548,
                    price:"8.20",
                    standard:"/瓶",
                    vipprice:"6.20",
                    zkprice:"6.20"
                },
                {
                    bigpic: "http://mlgwxyt-1254277558.picsh.myqcloud.com/upload/img/171017162103.jpg",
                    gtitle:"依云天然矿泉水(玻璃瓶）330ml",
                    id: 536,
                    price:"25.00",
                    standard: "/瓶",
                    vipprice:"23.00",
                    zkprice:"23.00"
                }
            ]
        ]
        this.getData = this.data[0];

    }

    componentDidMount() {

        // this.props.getAllList({pagesize:3,pagenum:3,cid:3,id:2})
        window.addEventListener('scroll', this.handleScroll);

    }
    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll =(e)=> {

        if(window.scrollY >= this.nav.offsetTop){
            this.setState({
                show :false
            })

        }else{
            this.setState({
                show :true
            })
        }
    }

    renderTabBar =(props)=> {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    _change = (tab, index) => {

        // const {tabChange} = this.props
        // tabChange(tab.title, tab.cid, index)
        this.getData = this.data[index];


    }

    render() {
        const {data,history} = this.props

        const tabs = [
            {
                title: '副食制品'
            }, {
                title: '粮油米面'
            }, {
                title: '休闲食品'
            }, {
                title: '饮品'
            }
        ];

        // if(data && data.categories && data.categories.length>0){
        //     data.categories.map(function (i,index) {
        //
        //         tabs.push({'title':i.name})
        //     })
        // }


        return (
            <div className='new-imported'>
                <div className='nav-tab'>
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">进口食品</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>

                </div>

                <div className='banner'>
                    <img src={require('static/image/exclusive_banner.jpg')} alt=""/>
                </div>
                <div className='new-word' ref={(el)=>this.nav=el}>
                    <WhiteSpace/>
                    <StickyContainer>
                            <Tabs
                                tabs={tabs}
                                swipeable={false}
                                initalPage={'t2'}
                                onChange={this._change}
                                renderTabBar={this.renderTabBar}
                                // className={`${this.state.show?'am-tabs-tab-bar-wrap':'am-tabs-tab-bar-wrap new-word1'}`}
                            >
                                <div className='tab'>
                                    <ul>
                                        {this.getData.map((item, index) => {
                                            return (
                                                <li key={index} onClick={()=>history.push(`/goodsDetail/${item.id}`)}>
                                                    <p><img src={item.bigpic} alt=""/></p>
                                                    <div>
                                                        <p className='name'>{item.gtitle} </p>
                                                        <p className='price'>￥{item.zkprice}<span>￥{item.price}</span>
                                                            {/*<button>马上抢</button>*/}
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        })}


                                    </ul>

                                </div>

                            </Tabs>
                    </StickyContainer>
                    <WhiteSpace/>


                </div>
            </div>
        )
    }

}

