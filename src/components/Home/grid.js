/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'
import {Grid} from 'antd-mobile'
const pathArr=['/special','/vipActive','/hotGoods','/joinUs']

import {getPath} from '../../utils/tools'
class HomeGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    _gridClick=(el)=>{
        const {history}=this.props
        history.push(el.path)

    }
    _getGrid=()=>{
        const {data} = this.props
        let newData = data.map((key,index)=>(
                {
                    icon:key.iconpic,
                    text:key.name,
                    path:getPath(key.linked_txt)
                }
            )
        )
        return newData
    }
    render() {
        return (
            <Grid
                data={this._getGrid()}
                hasLine={false}
                activeStyle='false'
                onClick={(el) => this._gridClick(el)}
            />
        )
    }
}
export  default HomeGrid
