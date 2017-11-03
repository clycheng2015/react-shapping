/**
 * Created by bear on 2017/9/11.
 */
import React from 'react'
import { Flex} from 'antd-mobile'
class IndexList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        const {list,history} = this.props
        return (

            <div>
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
                                        <div key={i} className="list-item" onClick={()=>history.push({pathname: `/itemList/${v.id}T${v.name}`, state:{title:v.name}})}>
                                             <div className="img-box"><div className="img-info"><img src={v.icon_url} alt=""/></div></div>
                                             <div className="title">{v.name}</div>
                                        </div>
                                    ))
                                }
                            </Flex>
                        </div>
                    </div>
                ))}
            </div>

        );
    }
}
export default IndexList