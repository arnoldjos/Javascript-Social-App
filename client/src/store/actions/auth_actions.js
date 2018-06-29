import * as actionTypes from './actionTypes';

// Register User
export const registerUser = userData => {
	return {
		type: actionTypes.INITIAL_REGISTER_USER,
		payload: userData
	};
};

export const successRegisterUser = path => {
	return { type: actionTypes.SUCESS_REGISTER_USER, path };
};

export const getErrors = errors => {
	return {
		type: actionTypes.GET_ERRORS,
		errors
	};
};

export const loginUser = userData => {
	return { type: actionTypes.INITIAL_LOGIN_USER, payload: userData };
};

export const setCurrentUser = decoded => {
	return {
		type: actionTypes.SET_CURRENT_USER,
		payload: decoded
	};
};

export const initAuthPath = path => {
	return { type: actionTypes.INIT_AUTH_PATH, path };
};
