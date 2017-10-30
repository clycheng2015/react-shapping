/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'
import {Grid} from 'antd-mobile'
 const pathArr=['/special','/vipActive','/hotGoods','/joinUs']
class HomeGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }
    _gridClick=(el)=>{
        const {history} = this.props

        history.push(el.path)


    }
    render() {
        const {data} = this.props
        let newData = data.map((key,index)=>(
                {
                    icon:key.iconpic,
                    text:key.name,
                    path:pathArr[index]
                }
            )
        )
        return (
            <Grid
                data={newData}
                hasLine={false}
                activeStyle={false}
                onClick={(el) => this._gridClick(el)}
            />


        )

    }

}

export  default HomeGrid
