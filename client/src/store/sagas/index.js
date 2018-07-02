import { takeEvery, all } from 'redux-saga/effects';

import * as authSagas from './auth_saga';
import * as profileSagas from './profile_saga';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.INITIAL_REGISTER_USER, authSagas.registerUserSaga),
		takeEvery(actionTypes.INITIAL_LOGIN_USER, authSagas.loginUserSaga),
		takeEvery(actionTypes.LOGOUT_USER, authSagas.logoutUserSaga)
	]);
}

export function* watchProfile() {
	yield all([
		takeEvery(
			actionTypes.INITIAL_GET_PROFILE,
			profileSagas.getCurrentProfileSaga
		),
		takeEvery(
			actionTypes.GET_PROFILE_BY_HANDLE,
			profileSagas.getProfileByHandleSaga
		),
		takeEvery(actionTypes.INITIAL_GET_PROFILES, profileSagas.getProfilesSaga),
		takeEvery(
			actionTypes.INITIAL_CREATE_PROFILE,
			profileSagas.createProfileSaga
		),
		takeEvery(actionTypes.ADD_EXPERIENCE, profileSagas.addExperienceSaga),
		takeEvery(actionTypes.DELETE_EXPERIENCE, profileSagas.deleteExperienceSaga),
		takeEvery(actionTypes.ADD_EDUCATION, profileSagas.addEducationSaga),
		takeEvery(actionTypes.DELETE_EDUCATION, profileSagas.deleteEducationSaga),
		takeEvery(actionTypes.DELETE_ACCOUNT, profileSagas.deleteAccountSaga)
	]);
}
