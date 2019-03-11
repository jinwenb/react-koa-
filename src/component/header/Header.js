import React, {Component} from 'react';
import './header.less'
import {Icon} from 'antd';
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='header'>
                <span>博客乐园</span>
                <span>
                   <span>
                         欢迎
                    <Icon type="user"/>
                      <span>
                           {this.props.userName}
                      </span>
                   </span>
                  <span onClick={()=>this.props.loginOut(()=>{
                      this.props.history.push('/')
                  })}>
                       <span style={{cursor:'pointer'}}> 退出</span>
                      <Icon type="frown"/>
                  </span>
                 </span>
            </div>
        )
    }
}