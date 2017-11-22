
import React from 'react'
import {Flex} from 'antd-mobile'

import {getPath} from '../../utils/tools'

class ModelTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    _click=(i,history)=>{

        switch(i.type){
            case 1:
                history.push(getPath(i.linked_txt))
                break;
            case 2:

                history.push(`/goodsDetail/${i.linked_txt}`)

                break;
            case 3:

                history.push(`/itemList/${i.linked_txt}T${i.remark}`)

                break;
            default :
                break
        }
    }
    render() {

        const {history,data}=this.props
        return (


            <Flex className="model-two">
                {
                    data.map((i,k)=>(

                        <Flex.Item key={k}>
                            <img src={i.iconpic} alt="" onClick={()=>this._click(i,history)}/>
                        </Flex.Item>
                    ))
                }
            </Flex>



        )

    }

}
export  default ModelTwo
