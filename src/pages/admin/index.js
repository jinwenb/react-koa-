import React, { Component } from 'react';
import { connect } from 'react-redux'
import { LOGINOUT } from '../../action-type/user'
import Header from "../../component/header/Header";
import { post } from '../../axios'
import NavLeft from "../navLeft";
import {Route,Switch} from 'react-router-dom'
import Categories from "../categories";
import Articles from "../articles";

let Welcome =()=><h1>欢迎来到博客乐园</h1>;
class Admin extends Component {
    // componentDidMount() {
    //     if ( !this.props.login ) {
    //         this.props.history.push('/')
    //     }
    // }

    render() {
        return (
            <div>
                <Header {...this.props}/>
                <div style={{display:'flex'}}>
                  <NavLeft/>
                  <div style={{flex:9}}>
                      <Switch>
                          <Route exact path='/admin'  component={Welcome}/>
                          <Route path='/admin/categories' component={Categories}/>
                          <Route path='/admin/Articles' component={Articles}/>
                      </Switch>

                  </div>
                </div>
            </div>
        )
    }
}

let mapDispatch = (dispatch) => ({
    loginOut: async (callbacks) => {
        let data = await post('/api/users/loginOut');
        if (data.code === 0) {
            dispatch({type: LOGINOUT});
            callbacks && callbacks()
        }
    }
});
export default connect(state => state.user, mapDispatch)(Admin)
