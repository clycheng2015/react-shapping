/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'


import {Button, NavBar, Modal, Icon, Card, WingBlank, WhiteSpace, Flex, List} from 'antd-mobile'

import * as user from 'actions/user'
import * as global from 'actions/global'
// require('./styles/about.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user, ...global}, dispatch)
)

export default class Ceshi extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
        }

    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    componentDidMount() {
        // const {getUserInfo} = this.props
        //
        // let userInfo = localItem('userInfo')
        //
        // if (typeof userInfo == 'string') {
        //     // console.log(JSON.parse(userInfo))
        //     getUserInfo({uid: JSON.parse(userInfo).id})
        // }
    }


    render() {
        const {userInfo, history} = this.props
        // console.log(userInfo)


        return (
            <div className="about-container"

                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f3f3f1"
                 }}
            >

                <Zong/>
            </div>
        )
    }
}
var Ck = React.createClass({
    //处理搜索事件的函数
    handleKey:function(e){
        //alert('test');
        //判断回车enter键才处理,keyCode13==回车键
        if(e.keyCode == 13){
            //alert('test');
            //如果搜索内容是空的让他不走了
            if(!e.target.value) return;
            //否则添加任务了
            var ckcon = {
                text : e.target.value,
                isDown: false
            }
            //利用属性完成
            this.props.addCkcon(ckcon);
            //清空搜索框的内容
            e.target.value = '';
        }

    },
    render:function(){
        return(
            <div>
                <input type="text" placeholder="你要干嘛？" onKeyUp={this.handleKey} />
            </div>
        );
    }
});
//列表项区域
var Lists = React.createClass({
    handleClick:function(){
        //alert('test');
        this.props.deleteCkcon(this.props.index);
    },
    //处理单选框的变化事件
    handleChange:function(e){
        //修改那个任务，修改的值是什么
        this.props.changeStatus(this.props.index,e.target.checked);
    },
    render:function(){
        return(
            <li>
                <label>
                    <input type="checkbox" checked={this.props.todo.isDown} onChange={this.handleChange} />
                    {this.props.todo.text}
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={this.handleClick}>删除</button>
            </li>
        );
    }
});
//列表框区域
var Ul = React.createClass({
    render:function(){
        //保存this指针
        var _this = this;
        return(
            <ul>
                {
                    this.props.todos.map(function(item,index){
                        return <Lists todo={item} key={index} index={index} deleteCkcon={_this.props.deleteCkcon} changeStatus={_this.props.changeStatus} />
                    })
                }
            </ul>
        );
    }
});
//状态组建
var Status = React.createClass({
    render:function(){
        return(
            <div>
                <input type="checkbox" />
                3 已完成  /  3 总数
                &nbsp;&nbsp;&nbsp;
                <button>清除已完成</button>
            </div>
        );
    }
});
//总组建
var Zong = React.createClass({
    getInitialState:function(){
        return {
            todos :[
                {text:'6点起床',isDown:true},
                {text:'7点出门',isDown:true},
                {text:'8点吃早饭',isDown:false},
                {text:'9点上班',isDown:true},
                {text:'12点下班',isDown:false}
            ],
            isAllChecked: false
        }
    },
    addCkcon:function(todo){
        //接收到用户的添加的内容然后铺push过去即可
        this.state.todos.push(todo);
        //然后更新state
        this.setState({
            todos : this.state.todos
        });
    },
    //处理删除任务
    deleteCkcon:function(index){
        //用函数splice来删除掉指定的数组元素
        this.state.todos.splice(index,1);
        //删除完成后来更新下页面的内容
        this.setState({
            todos : this.state.todos
        });
    },
    //任务单选框的属性
    changeStatus:function(index,isDown){
        this.state.todos[index].isDown = isDown
        this.setState({
            todos : this.state.todos
        })
    },
    render:function(){
        return(
            <div>
                <Ck addCkcon={this.addCkcon} />
                <Ul todos={this.state.todos} deleteCkcon={this.deleteCkcon} changeStatus={this.changeStatus} />
                <Status />
            </div>
        );
    }
});