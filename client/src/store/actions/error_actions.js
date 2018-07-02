import { GET_ERRORS, CLEAR_ERRORS } from './actionTypes';

export const getErrors = errors => {
	return {
		type: GET_ERRORS,
		errors
	};
};

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
