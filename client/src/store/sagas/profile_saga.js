import { put } from 'redux-saga/effects';
import axios from 'axios';

import {
	successGetCurrentProfile,
	successGetProfiles,
	setProfileLoading,
	getErrors,
	setCurrentUser
} from '../actions';

export function* getCurrentProfileSaga(action) {
	try {
		yield put(setProfileLoading());
		const currentProfile = yield axios.get('/api/profile');
		if (!currentProfile) throw new Error();
		yield put(successGetCurrentProfile(currentProfile.data));
	} catch (err) {
		yield put(successGetCurrentProfile({}));
	}
}

export function* getProfileByHandleSaga(action) {
	try {
		yield put(setProfileLoading());
		const profile = yield axios.get(`/api/profile/handle/${action.payload}`);
		if (!profile) throw new Error();
		yield put(successGetCurrentProfile(profile.data));
	} catch (err) {
		yield put(successGetCurrentProfile(null));
	}
}

export function* getProfilesSaga(action) {
	try {
		yield put(setProfileLoading());
		const profiles = yield axios.get('/api/profile/all');
		yield put(successGetProfiles(profiles.data));
	} catch (err) {
		yield put(successGetProfiles(null));
	}
}

export function* createProfileSaga(action) {
	try {
		yield axios.post('/api/profile', action.payload.profileData);

		action.payload.history.push('/dashboard');
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* addExperienceSaga(action) {
	try {
		const exp = yield axios.post(
			'/api/profile/experience',
			action.payload.expData
		);
		if (!exp) throw new Error();
		action.payload.history.push('/dashboard');
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* deleteExperienceSaga(action) {
	try {
		const exp = yield axios.delete(`/api/profile/experience/${action.payload}`);
		if (!exp) throw new Error();
		yield put(successGetCurrentProfile(exp.data));
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* addEducationSaga(action) {
	try {
		const edu = yield axios.post(
			'/api/profile/education',
			action.payload.eduData
		);
		if (!edu) throw new Error();
		action.payload.history.push('/dashboard');
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* deleteEducationSaga(action) {
	try {
		const edu = yield axios.delete(`/api/profile/education/${action.payload}`);
		if (!edu) throw new Error();
		yield put(successGetCurrentProfile(edu.data));
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* deleteAccountSaga(action) {
	try {
		if (window.confirm('Are you sure? This can NOT be undone!')) {
			const response = yield axios.delete('/api/profile');

			if (!response) throw new Error();

			yield put(setCurrentUser({}));
		}
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}
