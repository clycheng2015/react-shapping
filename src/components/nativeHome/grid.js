/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'
import {Grid,Toast} from 'antd-mobile'
const pathArr=['/special','/vipActive','/hotGoods','/joinUs']
import {nativeClick} from '../../utils/native-sdk'
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
    _native = (i) => {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let data = {

        }

        Toast.info("inini",1)
        if (isAndroid) {
            Toast.info("我是安卓",1)
            window.android.H5Click(JSON.stringify(data))

        }
        if (isiOS) {
            Toast.info("我是IOS",1)
            window.webkit.messageHandlers.AppModel.postMessage(data);
        }
    }

    render() {
        const {data} = this.props
        let newData = data.map((key,index)=>(
                {
                    icon:key.iconpic,
                    text:key.name,
                    path:pathArr[index],
                    url:key.linked_txt
                }
            )
        )
        return (
            <Grid
                data={newData}
                hasLine={false}
                activeStyle={false}
                onClick={(el) => nativeClick({
                    type:1,
                    url:el.url,
                    id:'',
                    name:el.text,
                    activeType:''
                })}
            />


        )

    }

}

export  default HomeGrid
