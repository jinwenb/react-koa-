import React,{Component} from 'react';
import {Form,Modal,Icon,Input} from 'antd'
export default  class Find extends  Component{
    constructor(props){
        super(props);
        this.state =  {}
    }
    render(){
        return (
            <Modal>
                <WrapFind
                    wrappedComponentRef={ref => this.wrappedComponentRef = ref}/>
                />
            </Modal>

        )
    }
}
class Item extends Component{

}
const WrapFind = Form.create()(Item);