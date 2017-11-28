/**
 * Created by bear on 2017/9/11.
 */
import React from 'react'
import {Flex} from 'antd-mobile'

import {getSize} from '../../utils/getSize'
class IndexList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {

        const {list, scrollTabH, tabIndex, tabChange} = this.props

        // console.log(tabChange)

        let HArr = []
        list.map(i => {
            i.subcategories.map(j => {
                HArr.push({
                    name: i.name,
                    H: (this.box.offsetHeight * Math.ceil(j.subcategories.length / 3)) + 40 + this.title.offsetHeight
                })
            })
        })
        let res = [];
        let tmp = {};
        HArr.forEach((v) => {
            if (!tmp.hasOwnProperty(v.name)) {
                tmp[v.name] = res.length;
                return res.push(Object.assign({}, v));
            }
            res[tmp[v.name]].H += v.H;
        });

        let newRes = []
        let scrollNum = 0

        res.map((i, k) => {
            if (k === 0) {
                newRes.push({[i.name]: 0})
            } else {
                scrollNum = scrollNum + res[k - 1].H + this.bigImg.offsetHeight;
                newRes.push({[res[k].name]: scrollNum})

                if (k === res.length - 1) {
                    newRes.push({LAST: scrollNum + res[k].H + this.bigImg.offsetHeight})

                }
            }


        })
        scrollTabH(newRes)

        window.onscroll = () => {
            const {scrollT} = getSize()
            for (let i = 0; i <= newRes.length; i++) {
                if (i + 1 > newRes.length) {
                    break;
                }
                if ((newRes[i][Object.keys(newRes[i])[0]] < scrollT) && (scrollT < newRes[i + 1][Object.keys(newRes[i + 1])[0]])) {

                    if (i === 0) {
                        tabChange(Object.keys(newRes[i])[0], i);
                        break
                    }
                    if (tabIndex === i) {
                        break;
                    }
                    tabChange(Object.keys(newRes[i])[0], i)

                }
            }

        }


    }

    componentWillUnmount() {
        const {recordScroll} = this.props
        const {scrollT} = getSize()
        recordScroll(scrollT)
        window.onscroll = null
    }

    render() {
        const {list, history} = this.props

        return (

            <div>
                {list.map((i, index) => (
                    <div key={index} className="new-item">
                        <div className="head" ref={el => this.bigImg = el}>
                            <img src={i.icon_url + '?imageMogr2/thumbnail/!99p'} alt="" style={{maxHeight: "2.5rem"}}/>
                        </div>
                        <div className="list-info">
                            {
                                i.subcategories.map((i, k1) => (
                                    <div key={k1} className="t-item-info">
                                        <div className="t-title" ref={el => this.title = el}>{i.name}</div>
                                        <div>
                                            <Flex wrap="wrap" className="box">
                                                {i.subcategories.map((j, k2) => (
                                                    <div key={k2} className="list-item" onClick={() => history.push({
                                                        pathname: `/itemList/${j.id}T${j.name}`,
                                                        state: {title: j.name}
                                                    })} ref={el => this.box = el}>
                                                        <div className="img-box">
                                                            <div className="img-info"><img
                                                                src={j.icon_url + '?imageMogr2/thumbnail/!99p'} alt=""/>
                                                            </div>
                                                        </div>
                                                        <div className="title">{j.name}</div>
                                                    </div>
                                                ))
                                                }
                                            </Flex>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>

        );
    }
}
export default IndexList