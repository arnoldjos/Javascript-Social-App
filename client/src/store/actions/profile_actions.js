import * as actionTypes from './actionTypes';

// Get current profile
export const getCurrentProfile = () => {
	return {
		type: actionTypes.INITIAL_GET_PROFILE
	};
};

export const successGetCurrentProfile = profile => {
	return {
		type: actionTypes.GET_PROFILE,
		payload: profile
	};
};

// Get profile by handle
export const getProfileByHandle = handle => {
	return { type: actionTypes.GET_PROFILE_BY_HANDLE, payload: handle };
};

// Create Profile
export const createProfile = (profileData, history) => {
	return {
		type: actionTypes.INITIAL_CREATE_PROFILE,
		payload: {
			profileData,
			history
		}
	};
};

export const successCreateProfile = () => {
	return {
		type: actionTypes.ADD_EXPERIENCE
	};
};

// Add experience
export const addExperience = (expData, history) => {
	return { type: actionTypes.ADD_EXPERIENCE, payload: { expData, history } };
};

// Delete experience
export const deleteExperience = expId => {
	return { type: actionTypes.DELETE_EXPERIENCE, payload: expId };
};

// Add education
export const addEducation = (eduData, history) => {
	return { type: actionTypes.ADD_EDUCATION, payload: { eduData, history } };
};

// Delete education
export const deleteEducation = eduId => {
	return { type: actionTypes.DELETE_EDUCATION, payload: eduId };
};

// Get all profiles
export const getProfiles = () => {
	return { type: actionTypes.INITIAL_GET_PROFILES };
};

export const successGetProfiles = profiles => {
	return {
		type: actionTypes.GET_PROFILES,
		payload: profiles
	};
};

// Delete account & profile
export const deleteAccount = () => {
	return { type: actionTypes.DELETE_ACCOUNT };
};

// Profile loading
export const setProfileLoading = () => {
	return {
		type: actionTypes.PROFILE_LOADING
	};
};

// Clear profile
export const clearCurrentProfile = () => {
	return {
		type: actionTypes.CLEAR_CURRENT_PROFILE
	};
};

export const getErrors = errors => {
	return {
		type: actionTypes.GET_ERRORS,
		errors
	};
};
