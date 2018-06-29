import * as actionTypes from '../actions/actionTypes';
import isEmpty from '../../validation/is-empty';

const initialState = {
	isAuthenticated: false,
	user: {},
	path: '/'
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SUCESS_REGISTER_USER:
			return {
				...state,
				path: action.path
			};
		case actionTypes.SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case actionTypes.INIT_AUTH_PATH:
			return {
				...state,
				path: action.path
			};
		default:
			return state;
	}
};

export default reducer;
