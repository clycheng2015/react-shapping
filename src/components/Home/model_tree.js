/**
 * Created by bear on 2017/10/26.
 */
import React from 'react'

import {getPath} from '../../utils/tools'

class ModelTree extends React.Component {
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


            <div className="model-tree">
                <ul>
                    <li className="bg-img">
                        <img src={data[0].iconpic} alt="" onClick={()=>this._click(data[0],history)}/>
                    </li>
                    <li>
                        <img src={data[1].iconpic} alt="" onClick={()=>this._click(data[1],history)}/>
                    </li>
                    <li>
                        <img src={data[2].iconpic} alt="" onClick={()=>this._click(data[2],history)}/>
                    </li>
                </ul>
            </div>


        )

    }

}

export  default ModelTree
