import React from 'react';
import ReactDrawer from './lib/react-drawer';
require('./lib/react-drawer.less')


/**
 * goodsDetail   component
 */


const Main=(props)=>{
    "use strict";

    const {type}=this.props

    return(

        <div></div>
    )

}




export  default  class Drawer extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            position: 'bottom',
            noOverlay: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onDrawerClose = this.onDrawerClose.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.setNoOverlay = this.setNoOverlay.bind(this);
    }
    setPosition(e) {
        this.setState({position: e.target.value});
    }
    setNoOverlay(e) {
        this.setState({noOverlay: e.target.checked});
    }
    toggleDrawer() {
        this.setState({open: !this.state.open});
    }
    closeDrawer() {
        this.setState({open: false});
    }
    onDrawerClose() {
        this.setState({open: false});
    }
    render() {
        return (
            <div>
                <div style={{margin: 1}}>
                    <button
                        style={{margin: 20}}
                        onClick={this.toggleDrawer}
                        disabled={this.state.open && !this.state.noOverlay}
                    >
                        {!this.state.open ? <span>show drawer</span>: <span>close drawer</span>}
                    </button>
                </div>
                <ReactDrawer
                    open={this.state.open}
                    position={this.state.position}
                    onClose={this.onDrawerClose}
                    noOverlay={this.state.noOverlay}>
                    <i onClick={this.closeDrawer} className="icono-cross">x</i>
                    <h2>What a nice drawer !</h2>
                </ReactDrawer>
            </div>
        );
    }
}