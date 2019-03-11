import React, {Component} from 'react';
import {
    Input,
    Button,
    Table,
    Popconfirm,
    Form,
    Modal
} from 'antd'
import {List, create, update, destruction} from '../../axios/categories'


 export default  class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            visible: false,
            pagination: {},
            id: ''
        }
    }

    async getList(where) {
        let list = await  List(where);
        list.result = list.result.map(item => {
            item.key = item._id;
            return item
        });
        let {current, pageSize, total} = list;
        if (where) {
            current = 1
        }
        this.setState({
            list: list.result,
            pagination: {
                current,
                pageSize,
                total,
                onChange: this.onChange,
                showQuickJumper:true
            }
        })
    }

    async componentWillMount() {
        await this.getList();
    }

    onChange = async (page, pageSize) => {
        await this.getList({page, pageSize})
    };
    handleOk = async () => {
        let userName = this.wrappedComponentRef.props.form.getFieldValue('userName');
        let {id} = this.state;
        if (!id) {
            await create(userName);
            this.setState({visible: false}, async () => {
                await   this.getList()
            });
        } else {
            await update(id, userName);
            this.setState({visible: false}, async () => {
                await   this.getList()
            });
        }

    };
    del = async (id) => {
        try {
            await destruction(id);
            await this.getList()
        } catch (e) {

        }
    };
    handleClick = () => {
        this.setState({visible: true})
    };
    handleChangeClick = async (id) => {
        this.handleClick();
        this.setState({
            id
        })
    };
    handleSearch =async  (keyWords)=>{
        await this.getList({keyWords})
    }
    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '操作',
            width: 500,
            render: (value, result) => {
                return <Button.Group
                >
                    <Button type="primary" style={{marginRight: '10px'}}
                            onClick={(id) => this.handleChangeClick(value._id)}
                    >修改</Button>
                    <Popconfirm onConfirm={() => this.del(value._id)}>
                        <Button type="danger">删除</Button>
                    </Popconfirm>

                </Button.Group>
            }
        }];
        return (

            <div>
                <div style={{
                    flex: 8,
                    marginLeft: '20px',
                    marginTop: '20px',
                    marginBottom: '20px',
                }}>
                    <Button.Group>
                        <Button type="primary"
                                style={{marginRight: '10px'}}
                                onClick={this.handleClick}
                        >添加分类</Button>
                        <Button type="danger">删除所有分类</Button>
                        <Input.Search
                            style={{width: '500px', marginLeft: '30px'}}
                            placeholder="input search text"
                            onSearch={value => this.handleSearch(value)}
                            enterButton
                        />

                    </Button.Group>
                </div>
                <Table
                    style={{marginLeft: '20px'}}
                    dataSource={this.state.list}
                    bordered
                    pagination={this.state.pagination}

                    columns={columns}/>
                <Modal
                    visible={this.state.visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}

                    onOk={() => this.handleOk()}
                >
                    <WrappedNormalLoginForm
                        wrappedComponentRef={ref => this.wrappedComponentRef = ref}/>
                </Modal>
            </div>
        )
    }
}

class ModelInput extends Component {
    handleSubmit = (ev) => {
        ev.preventDefault()
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input placeholder="Username"/>
                    )}
                </Form.Item>
            </Form>
        )
    }
}

//page num
const WrappedNormalLoginForm = Form.create()(ModelInput);
