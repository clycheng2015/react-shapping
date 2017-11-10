import React, {ReactDom}from 'react';
import {ListView, Icon} from 'antd-mobile';

class GoodsList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource
        };
    }

    render() {
        const {list, history, isFetching, hasMore,loadMore} = this.props
        const row = (rowData, sectionID, rowID) => {

            return (
                <div key={rowID} className="goods" onClick={() => history.push(`/goodsDetail/${rowData.good_id}`)}>

                    <div className="img-info">

                        <img src={rowData.bigpic + '?imageMogr2/thumbnail/!30p'} alt="" ref={(el) => this.imgH = el}/>


                    </div>

                    <div className="txt-info">
                        <p className="title">
                            {rowData.stitle}
                        </p>
                        <p className="price">￥{Number(rowData.zkprice).toFixed(2)}</p>
                    </div>


                </div>
            );
        };
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRows(list)}
                renderFooter={() => (<div style={{textAlign: 'center', lineHeight: "1rem"}}>
                    { hasMore && isFetching && <span ><Icon type="loading"/></span>}

                    { hasMore && !isFetching && <span><Icon type="loading"/></span>}

                    { !hasMore && !isFetching && <span>已经到底啦</span>}
                </div>)}
                renderRow={row}
                // renderSeparator={separator}
                style={{
                    height: document.documentElement.clientHeight
                }}
                className="am-list"
                initialListSize={list.length}
                pageSize={20}

                scrollRenderAheadDistance={2000}
                scrollEventThrottle={30}
                onEndReached={loadMore}
                 onEndReachedThreshold={1000}
            />
        );
    }
}

export default GoodsList;