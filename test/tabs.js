
import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import ListIndex from './pulldown'
import './test.less'


export  default class Demo extends React.Component {
    renderContent = tab =>
        (<div style={{paddingTop:"40px"}}>
            <ListIndex/>

        </div>);

    render() {
        const tabs = [
            {title: '1st Tab'},
            {title: '2nd Tab'},
            {title: '3rd Tab'},
            {title: '4th Tab'},
            {title: '5th Tab'},
            {title: '6th Tab'},
            {title: '7th Tab'},
            {title: '8th Tab'},
            {title: '9th Tab'},
        ];

        return (
            <div>

                {/*<div>*/}
                    {/*<WhiteSpace />*/}
                    {/*<Tabs tabs={tabs}*/}
                          {/*swipeable={false}*/}
                    {/*>*/}
                        {/*{this.renderContent}*/}
                    {/*</Tabs>*/}
                    {/*<WhiteSpace />*/}

                {/*</div>*/}
                <ListIndex/>
            </div>
        );
    }
}
