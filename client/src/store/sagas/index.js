import { takeEvery, all } from 'redux-saga/effects';

import * as authSagas from './auth_saga';
import * as actionTypes from '../actions/actionTypes';

export function* watch() {
	yield all([
		takeEvery(actionTypes.INITIAL_REGISTER_USER, authSagas.registerUserSaga),
		takeEvery(actionTypes.INITIAL_LOGIN_USER, authSagas.loginUserSaga)
	]);
}
