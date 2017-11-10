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
                       <img src={i.icon_url+'?imageMogr2/thumbnail/!99p'} alt="" style={{maxHeight:"2.5rem"}}/>
                        </div>

                        <div className="list-info">
                            <Flex wrap="wrap" className="box">
                                {
                                    i.subcategories && i.subcategories.length > 0 &&
                                    i.subcategories.map((v,i)=>(
                                        <div key={i} className="list-item" onClick={()=>history.push({pathname: `/itemList/${v.id}T${v.name}`, state:{title:v.name}})}>
                                             <div className="img-box"><div className="img-info"><img src={v.icon_url+'?imageMogr2/thumbnail/!99p'} alt=""/></div></div>
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