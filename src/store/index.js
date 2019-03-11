import {combineReducers ,createStore} from 'redux';
import {user,articles} from '../reduces/user';
export default createStore(combineReducers({
    user,
    articles
})
    )