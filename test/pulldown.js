
import React from 'react'
import { PullToRefresh, Button } from 'antd-mobile';
import List from './useBody'

export  default  class ListIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
        };
    }

    componentDidMount() {

    }

    render() {
        return (<div>
            <PullToRefresh

                ref={el => this.ptr = el}
                // style={{
                //     height: this.state.height,
                //     overflow: 'auto',
                // }}
                indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                direction={this.state.down ? 'down' : 'up'}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({ refreshing: true });
                    setTimeout(() => {
                        this.setState({ refreshing: false });
                    }, 1000);
                }}
            >
           <div>


              adasdasds

           </div>

               <List/>
            </PullToRefresh>
        </div>);
    }
}
