/**
 * Created by bear on 2017/9/11.
 */
import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
const tabs = [
    { title: '1 Tab' },
    { title: '2 Tab' },
    { title: '3 Tab' },
    { title: '4 Tab' },
    { title: '5 Tab' },
    { title: '6 Tab' },
    { title: '7 Tab' },
    { title: '8 Tab' },
    { title: '9 Tab' },
    { title: '10 Tab' },
    { title: '11 Tab' },
    { title: '12Tab' },
    { title: '13 Tab' },
    { title: '14 Tab' },
    { title: '15 Tab' },
    { title: '16 Tab' },
    { title: '17 Tab' },
    { title: '18 Tab' },
    { title: '19 Tab' },
    { title: '20 Tab' },
    { title: '21 Tab' },
    { title: '22 Tab' },
    { title: '23 Tab' },
];

class IndexList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        const {list,history} = this.props
        return (

            <div style={{ height: document.documentElement.clientHeight-100}}>
                <WhiteSpace />
                <Tabs tabs={tabs}
                      initalPage={'t2'}
                      tabBarPosition="left"
                      tabDirection="vertical"
                      usePaged={false}
                      swipeable={true}
                      useOnPan={true}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                        Content of first tab
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                        Content of second tab
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                        Content of third tab
                    </div>
                </Tabs>
                <WhiteSpace />
            </div>

        );
    }
}
export default IndexList