import React, {Component} from 'react';
import {Modal, Button, Form, Input, Icon, Table} from 'antd'
import {connect} from 'react-redux'
import {fLASE, TRUE, GETLIST} from '../../action-type/user'
import {create, ArticlesList,AddPv} from '../../axios/articles'
import {List} from '../../axios/categories'
class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: {}
        }
    }

    handleOk = async () => {
        if (!this._id) {
            let obj = this.wrappedComponentRef.props.form.getFieldsValue();
            this.props.Close();
            await create(obj);
            await this.getList()
        }

    };
    onChange = async (current, size) => {
        await this.getList({page: current, num: size})
    };
    getList = async (where) => {
        let res = await ArticlesList(where);
        let data = this._name;
        res.result = res.result.map((item,index) => {
            item.key = item._id;
            item.name = data[index]
            return item;
        });
        let {current, pageSize, total} = res;
        this.setState({
            dataSource: res.result,
            pagination: {
                current, pageSize, total,
                onChange: this.onChange
            }
        });
    };

    async componentDidMount() {
        let data = await List();
       this._name = this.props.getName(data.result);
        await  this.getList();
    }

    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
        },
            {
                title: '评论数',
                dataIndex: 'pv',
                key: 'pv',
            }
            ,
            {
                title: '分类',
                dataIndex: 'name',
                key: 'name',
            }
            , {
                title: '时间',
                key: 'createAt',
                render(value, result) {
                    return value.createAt.toLocaleString();
                }
            },
            {
                title: '操作',
                render:(value, item) =>{
                    return (
                        <Button.Group>
                            <Button onClick={async () => {
                                this.props.Close();

                            }}>查看
                            </Button>
                            <Button style={{margin: '0 10px'}}
                                    onClick={() => {
                                        this.props.Close();
                                    }}
                            >编辑</Button>
                            <Button onClick={async () => {
                                this.props.Close()
                             await AddPv(item._id)
                                await this.getList()
                            }}>评论</Button>
                            <Button style={{margin: '0 10px'}}
                                    onClick={() => {
                                        this.props.Close()
                                    }}
                            >删除</Button>
                        </Button.Group>
                    )
                }
            }
        ];
        return (
            <div>
                <header style={{display: 'flex', justifyContent: 'space-between',padding:'5px 10px'}}>
                    <Button
                        type="primary"
                        style={{margin: '0 10px'}}
                        onClick={() => this.props.show()}
                    >
                        添加文章
                    </Button>
                    <Button type="primary">
                        删除文章
                    </Button>
                    <Input.Search
                        style={{marginLeft:'10px'}}
                        placeholder="input search text"
                        enterButton="Search"
                        onSearch={value => console.log(value)}
                    />
                </header>
                <Modal
                    visible={this.props.flag}
                    onCancel={() => this.props.Close()}
                    onOk={() => this.handleOk()}
                >
                    <WrappedDemo
                        wrappedComponentRef={ref => this.wrappedComponentRef = ref}/>
                    />
                </Modal>
                <Table
                    pagination={this.state.pagination}
                    dataSource={this.state.dataSource} columns={columns}/>
            </div>
        )
    }
}

class ModelForm extends Component {
    handleSubmit = () => {

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="请输入标题"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="请输入内容"/>
                    )}
                </Form.Item>
            </Form>
        );
    }
}

const WrappedDemo = Form.create()(ModelForm);
const dispatch = (dispatch) => ({
    Close: () => dispatch({type: fLASE}),
    show: () => {
        dispatch({type: TRUE})
    },
    getName: (result) => dispatch({type: GETLIST,result})
});
export default connect(state => state.articles, dispatch)(Articles)