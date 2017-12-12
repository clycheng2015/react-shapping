import React from 'react'
import {Toast, SearchBar} from 'antd-mobile'
import {Link} from 'react-router-dom'
import wx from 'weixin-js-sdk';
class Head extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            focused: false,
        }
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

    render() {
        const {type} = this.props
        return (
            <div className={type == 0 ? "search-bar" : "search-bar-active"}>
                <div className="box name">美纶购</div>
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
                    <img src={require('static/images/home/ic_scan.png')} alt="" onClick={() => this.Qrcode()}/>

                </div>
            </div>
        )

    }


}


export  default Head


