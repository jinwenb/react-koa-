import React, {Component} from 'react';
import {Menu} from 'antd'
import {Link} from 'react-router-dom'

export default class NavLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Menu
                style={{flex: '2',marginLeft:'30px'}}
                defaultSelectedKeys={[window.location.hash.slice(1)]}
                theme="seashell"
            >
                <Menu.Item key="/admin">
                    <Link to='/admin'>首页</Link>
                </Menu.Item>
                <Menu.Item key="/admin/categories">
                    <Link to='/admin/categories'>分页管理</Link>
                </Menu.Item>
                <Menu.Item key="/admin/articles">
                    <Link to='/admin/articles'>文章管理</Link>
                </Menu.Item>
            </Menu>
        )
    }
}