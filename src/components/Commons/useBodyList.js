import React from 'react';
import {ListView ,Icon} from 'antd-mobile';

const data = [
    {
        img: require("static/images/d1.png"),
        title: ' 澳洲可瑞康(Karicare)婴幼儿羊奶粉1段900gasdasdasdsadasdasdsadasd',
        price: 199,
    },
    {
        img: require("static/images/d2.png"),
        title: ' 澳洲可瑞康(Karicare)婴幼儿羊奶粉1段900g',
        price: 199,
    },
    {
        img: require("static/images/d3.png"),
        title: ' 澳洲可瑞康(Karicare)婴幼儿羊奶粉1段900g',
        price: 199,
    },
    {
        img: require("static/images/d4.png"),
        title: ' 澳洲可瑞康(Karicare)婴幼儿羊奶粉1段900g',
        price: 199,
    },
];
let index = data.length - 1;

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        if (pageIndex == 1) {

            return;
        }
        this.setState({isLoading: true});
        setTimeout(() => {
            this.setState({
                isLoading: false,
            });
        }, 1000);
    }

    render() {
        const {list,history} =this.props
        const row = (rowData, sectionID, rowID) => {

            return (
                <div key={rowID} className="goods" onClick={()=>history.push(`/goodsDetail/${rowData.id}`)}>

                    <div className="img-info">

                        <img src={rowData.bigpic} alt=""/>

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
                // renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{padding: 30, textAlign: 'center',lineHeight:"1rem"}}>
                    {this.state.isLoading ? <span><Icon type="loading"/></span> : '加载完成'}
                </div>)}
                renderRow={row}
                // renderSeparator={separator}

                className="am-list"
                pageSize={4}
                 useBodyScroll
                onScroll={() => {
                    this.props.getScroll(window.scrollY)
                }}
                scrollRenderAheadDistance={500}
                scrollEventThrottle={200}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default Demo;