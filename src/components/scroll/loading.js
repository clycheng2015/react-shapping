/**
 * Created by bear on 2017/10/18.
 */
import React  from 'react';



class Loading extends React.Component {

    render() {
        return (
            <div className="mf-loading-container">
                <img src={require('static/loading/loading.gif')}/>
            </div>
        )
    }

}
export default Loading