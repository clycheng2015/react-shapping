import React from 'react'
import {Toast, SearchBar,Badge} from 'antd-mobile'
import {Link} from 'react-router-dom'

import {AppLocalStorage} from '../../utils/cookie'
import wx from 'weixin-js-sdk';
class Head extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            focused: false,
        }

        this.user=AppLocalStorage.Cache.get('user')
    }

    Qrcode = () => {
        const {history} = this.props

        wx.scanQRCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: function (res) {
                if (res.resultStr) {
                    if (res.resultStr.indexOf(',') > 0) {
                        history.push(`/QRCodeList/${ res.resultStr.split(',')[1]}`)
                    } else {
                        history.push(`/QRCodeList/${res.resultStr}`)
                    }
                }
            }
        });
    }

    _click=()=>{
        const { history} = this.props
        history.push('/searchList')
    }

    _msgClick=()=>{

        const {history} = this.props
        if(! this.user){return false}

        history.push('/message')

    }

    render() {
        const {type,history,msgCount} = this.props
        return (
            <div className={type == 0 ? "search-bar" : "search-bar-active"}>
                <div className="box msg">
                    <img src={require('static/images/home/ic_scan.png')} alt="" onClick={() => this.Qrcode()}/>

                </div>
                <div className="box s-btn"  onClick={()=>this._click()}>
                        <SearchBar
                            placeholder="上新1200商品"
                            focused={this.state.focused}
                            showCancelButton={false}
                            style={{

                                width: "100%",
                                background: "transparent"

                            }}
                            disabled
                        />
                </div>
                <div className="box msg">

                    <span style={{position:'relative'}}>
                            <img src={require('static/images/home/mesicon.png')} alt="" onClick={() =>this._msgClick()}/>
                        {msgCount>0&& <span className="icon-bag" style={{position:'absolute',top:"-.3rem",right:0}}><Badge dot/></span>}

                    </span>
                </div>

            </div>
        )

    }


}


export  default Head


