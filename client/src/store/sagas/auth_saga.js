import { put } from 'redux-saga/effects';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import * as actions from '../actions';
import setAuthToken from '../../utils/setAuthToken';

export function* registerUserSaga(action) {
	try {
		yield axios.post('api/users/register', action.payload);

		yield put(actions.successRegisterUser('/login'));
	} catch (err) {
		yield put(actions.getErrors(err.response.data));
	}
}

export function* loginUserSaga(action) {
	try {
		// Get user
		const response = yield axios.post('api/users/login', action.payload);
		const { token } = response.data;
		// Set token to localstorage
		yield localStorage.setItem('jwtToken', token);
		// Set token to Auth header
		yield setAuthToken(token);
		// Decode token to get user data
		const decoded = jwt_decode(token);
		// Set current user
		yield put(actions.setCurrentUser(decoded));
	} catch (err) {
		yield put(actions.getErrors(err.response.data));
	}
}
