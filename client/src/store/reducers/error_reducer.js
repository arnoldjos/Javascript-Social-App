import { GET_ERRORS, CLEAR_ERRORS } from '../actions/actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ERRORS:
			return action.errors;
		case CLEAR_ERRORS:
			return {};
		default:
			return state;
	}
};

export default reducer;
