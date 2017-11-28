/**
 * Created by bear on 2017/10/20.
 */

import React from 'react'
import { ListView,Icon } from 'antd-mobile';

export  default  class List extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }

    componentDidMount() {
        const {list}=this.props

        console.log(list)
        const hei = document.documentElement.clientHeight
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(list),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {

        }, 1000);
    }

    render() {

        const {history} =this.props
        const row = (rowData, rowID) => {

            return (

                <div key={rowID} className="goods" onClick={()=>history.push({
                    pathname: `/goodsDetail/${rowData.id}`,

                })}>
                    <div className="img-info">

                        <img src={rowData.bigpic} alt=""/>

                    </div>

                    <div className="txt-info">
                        <p className="title">
                            {rowData.gtitle}
                        </p>
                        <p className="price">￥{rowData.zkprice}</p>
                    </div>


                </div>
            );
        };

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ textAlign: 'center',width:'100%',height:'1rem',float:"left",marginTop:".4rem" }}>
                    {this.state.isLoading ?  '加载完成': <Icon type="loading"/>}
                </div>)}
                renderRow={row}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                    paddingTop:".9rem",
                    border:"none"
                }}
                pageSize={4}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                scrollEventThrottle={200}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}
