import React, {Component} from 'react';
import {connect} from 'react-redux'
import {LOGIN, USERNAME} from '../../action-type/user'
import {
    Form, Icon, Input, Button, message
} from 'antd';
import './index.less'
import {post} from '../../axios'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {isLogin: true}
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();
        let {isLogin} = this.state;
        let userName = this.props.form.getFieldValue('userName');
        let password = this.props.form.getFieldValue('password');
        let data = {userName, password};
        let res;
        if (isLogin) {
            let email = this.props.form.getFieldValue('email');
            data.email = email;
            res = await post('/api/users/register', data);
        } else {
            res = await  post('/api/users/login', data)
        }
        if (res.code !== 0) {
            message.info(res.data);
            this.props.history.replace('/');
        } else {
            this.props.isLogin();
            this.props.userName(userName);
            this.props.history.push('/admin');
        }
    };
    validator = (rule, value, callback) => {
        if (!value) {
            callback('请输入用户名')
        } else if (value.length < 2) {
            callback('你的用户名不合法')
        } else {
            callback()
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='home-container'>
                <div className='login'>
                    <h1>欢迎来到博客乐园</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your username!',
                                    validateMessages: 'error',
                                    validator: this.validator
                                }],
                            })(
                                <Input
                                    prefix={
                                        <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="请输入用户名"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input type="password"
                                       prefix={
                                           <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="请输入密码"
                                />
                            )}
                        </Form.Item>
                        {
                            this.state.isLogin ? <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(
                                    <Input type="password"
                                           prefix={
                                               <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="请输入邮箱"
                                    />
                                )}
                            </Form.Item> : null
                        }
                        <Form.Item>
                            <span
                                 style={
                                     {color: 'pink',
                                         margin: '0 10px',
                                         cursor:'pointer'
                                     }
    }
                                  onClick={() => this.setState({isLogin: !this.state.isLogin})}>
                               选择登陆和注册
                            </span>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {
                                    this.state.isLogin ? '注册' : '登陆'
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(Home);
const mapDispatch = (dispatch) => ({
    isLogin: () => dispatch({type: LOGIN}),
    userName: (userName) => dispatch({type: USERNAME, userName})
});
export default connect(state => state.user,
    mapDispatch
)(WrappedNormalLoginForm)