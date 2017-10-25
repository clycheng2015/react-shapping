/**
 * Created by bear on 2017/9/11.
 */
import React from 'react'

import {Link} from 'react-router-dom'

import {PullToRefresh, Icon, Flex} from 'antd-mobile'


class IndexList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            isLoading: true,
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
            headState: 1
        };
    }


    componentDidMount() {


    }

    render() {

        const {list,history} = this.props

        console.log(list)
        // let  arr= Array.from(new Array(20),(v,i)=>{return({name:i})})
        return (

            <div>
                {/*<PullToRefresh*/}
                {/*ref={el => this.ptr = el}*/}
                {/*distanceToRefresh={ window.devicePixelRatio * 25}*/}
                {/*indicator={ {*/}
                {/*activate: <Icon type="loading"/>,*/}
                {/*deactivate: <Icon type="loading"/>,*/}
                {/*release: <Icon type="loading"/>,*/}
                {/*finish: <Icon type="loading"/>,*/}
                {/*}}*/}
                {/*refreshing={this.state.refreshing}*/}
                {/*style={{*/}
                {/*height: this.state.height,*/}
                {/*overflow: 'auto',*/}
                {/*paddingBottom:"1rem"*/}
                {/*}}*/}
                {/*onRefresh={() => {*/}
                {/*this.setState({*/}
                {/*refreshing: true,*/}
                {/*});*/}
                {/*setTimeout(() => {*/}

                {/*this.setState({refreshing: false});*/}


                {/*}, 600);*/}
                {/*}}*/}
                {/*>*/}
                {list.map((i, index) => (
                    <div key={index} className="new-item">
                        <div className="head">



                            {
                                i.name==='美妆个护' && <img src={require('static/images/user/meizhuang.png')} alt=""/>
                            }
                            {
                                i.name==='食品酒水' && <img src={require('static/images/user/ship.png')} alt=""/>
                            }
                            {
                                i.name==='母婴用品' && <img src={require('static/images/user/muyin.png')} alt=""/>
                            }
                            {
                                i.name==="家居家纺" && <img src={require('static/images/user/jiaju.png')} alt=""/>
                            }
                            {
                                i.name==="保健养生" && <img src={require('static/images/user/baojian.png')} alt=""/>
                            }
                        </div>

                        <div className="list-info">
                            <Flex wrap="wrap" className="box">

                                {
                                    i.subcategories && i.subcategories.length > 0 &&
                                    i.subcategories.map((v,i)=>(
                                        <div key={i} className="list-item"

                                        onClick={()=>history.push({
                                            pathname: `/itemList/${v.id}`,
                                            state:{title:v.name}

                                        })}
                                        >

                                           <div className="img-box">
                                               <div className="img-info">

                                                   <img src={v.icon_url} alt=""/>
                                               </div>
                                           </div>

                                            <div className="title">
                                                {
                                                    v.name
                                                }
                                            </div>


                                        </div>
                                    ))
                                }

                            </Flex>
                        </div>


                    </div>
                ))}
                {/*</PullToRefresh>*/}
            </div>

        );
    }
}
export default IndexList