/**
 * Created by bear on 2017/9/11.
 */
import React from 'react'

import {Link} from 'react-router-dom'

import {ListView, List, SearchBar, Icon} from 'antd-mobile'


class IndexList extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            isLoading: true,
        };
    }
    genData = (ds, province) => {
        const dataBlob = {};
        const sectionIDs = [];
        const rowIDs = [];
        Object.keys(province).forEach((item, index) => {

            sectionIDs.push(item);
            dataBlob[item] = item;
            rowIDs[index] = [];

            province[item].forEach((jj) => {

                rowIDs[index].push(jj.value);
                dataBlob[jj.value] = {
                    img: jj.icon_url,
                    title: jj.name,
                    id: jj.id,
                    cid: jj.cid,
                    cname:jj.cname
                };


            });
        });
        return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
    }

    componentDidMount() {
        const {list} = this.props
        let mall = []


        list.forEach((item, i) => {
            mall[item.name] = item.subcategories
            item.subcategories.forEach((n, j) => {
                n.value = i + "0" + j;
                n.cid = item.id;
                n.cname = item.name;
            })
        })
        this.setState({
            dataSource: this.genData(this.state.dataSource, mall),
            isLoading: false,
        });


    }

    render() {

        const row = (row, sectionId, rowId) => {
            return (


                <div key={rowId} className="list-row">
                    <Link
                        to={{
                            pathname: `/itemList/${row.id}`,

                            state:{title:row.title}

                        }}
                    >
                        <div className="img-info">
                            <img src={row.img} alt=""/>
                        </div>

                        <p>{row.title}</p>

                    </Link>
                </div>
            )


        }


        return (
            <ListView.IndexedList
                dataSource={this.state.dataSource}
                // renderHeader={() => <span>custom header</span>}
                renderFooter={() => <div style={{height: "2rem"}}></div>}
                renderSectionHeader={sectionData => (<div className="ih">{sectionData}</div>)}
                renderRow={row}
                className="fortest"
                style={{
                    height: document.documentElement.clientHeight * 9 / 10,
                    overflow: 'auto',
                    width: "74%",
                    float: 'right',

                }}
                quickSearchBarStyle={{
                    position: 'absolute',
                    top: 47,
                    left: 0,
                    width: "25%",
                    // height: document.documentElement.clientHeight * 9/ 10,
                    // background:"white"

                }}
                delayTime={10}
                delayActivityIndicator={<div style={{padding: 25, textAlign: 'center'}}><Icon type="loading"/></div>}
                distanceToRefresh={window.devicePixelRatio * 25}


            />
        );
    }
}
export default IndexList