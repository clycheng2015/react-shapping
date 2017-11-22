// /**
//  * Created by Administrator on 2016/7/1.
//  */
// import React from 'react'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'
// import {Icon, Flex} from 'antd-mobile'
//
// import * as active from 'actions/active'
// require('./style/index.less')
//
// import ActiveContent from '../../components/active/avtive_20170928'
//
// @connect(
//     state => {
//         return {...state.active}
//     },
//     dispatch => bindActionCreators({...active}, dispatch)
// )
//
//
// export default class Active extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             id: '',
//             modal1: false,
//             modal2: false,
//         }
//     }
//
//     componentDidMount() {
//
//     }
//
//     render() {
//         const {history, list} = this.props
//
//         return (
//             <div className="active-container" ref='wrapper'
//
//                  style={{
//                      // minHeight: document.documentElement.clientHeight,
//                      // background: "#f3f3f1"
//                  }}
//             >
//
//                 <div className="nav-tab" style={{background:'white',zIndex:99999}}>
//                     <Flex justify="center" align="center">
//                         <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
//                             history.goBack()
//                         }}/></Flex.Item>
//                         <Flex.Item className="item-head center">活动中心</Flex.Item>
//                         <Flex.Item className="item-head right"><span></span></Flex.Item>
//                     </Flex>
//                 </div>
//                 <ActiveContent {...this.props}/>
//             </div>
//         )
//     }
// }
