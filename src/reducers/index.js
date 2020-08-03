import cartReducer from './cartReducer';
import authenticationReducer from './authenticationReducer';
import ordersReducer from './ordersReducer';
import {combineReducers} from 'redux';

export default combineReducers({
	cart: cartReducer,
	auth: authenticationReducer,
	orders: ordersReducer
});