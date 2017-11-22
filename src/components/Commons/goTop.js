/**
 * Created by bear on 2017/10/18.
 */
import React  from 'react';

require('./styles/gotop.less')

class GoTop extends React.Component {

    render() {
        return (
            <div className="top-info" onClick={()=>window.scrollTo(0,0)}>
                <img src={require('static/images/home/top_icon.png')} alt="" />
            </div>
        );
    }

}
export default GoTop