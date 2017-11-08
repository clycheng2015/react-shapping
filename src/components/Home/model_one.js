/**
 * Created by bear on 2017/9/9.
 */
import React from 'react'

import {getPath} from '../../utils/tools'
import {AppLocalStorage} from '../../utils/cookie'

class ModelOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    _click=(i,history)=>{

        let user=AppLocalStorage.Cache.get("user")

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
            case 100:
                if(user){
                    history.push(`/topUp`)
                }
                else {
                    let url=window.location.href
                    url= url.match(/#(\S*)/)[1];
                    url=url.replace('/','')
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://app.meilungo.com/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                }

                break;
            case 200:
                if(user){
                    history.push(`/jinfu`)
                }
                else {
                    let url=window.location.href
                    url= url.match(/#(\S*)/)[1];
                    url=url.replace('/','')
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://app.meilungo.com/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                }

                break;
            default :
                break
        }
    }
    render() {
        const {history,data}=this.props
        return (
            <div className="model-one">
                <img src={data[0].iconpic} alt="" onClick={()=>this._click(data[0],history)}/>
            </div>

        )

    }

}

export  default ModelOne
