import axios from 'axios';
import { put } from 'redux-saga/effects';

import {
	successAddPost,
	getErrors,
	getPosts,
	successGetPosts,
	successGetPost,
	successDeletePost,
	setPostLoading,
	clearErrors
} from '../actions';

export function* addPostSaga(action) {
	try {
		yield put(clearErrors());
		const post = yield axios.post('/api/posts', action.payload);
		if (!post) throw new Error();
		yield put(successAddPost(post.data));
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* getPostsSaga(action) {
	try {
		yield put(setPostLoading());
		const posts = yield axios.get('/api/posts');
		if (!posts) throw new Error();
		yield put(successGetPosts(posts.data));
	} catch (err) {
		yield put(successGetPosts(null));
	}
}

export function* getPostSaga(action) {
	try {
		yield put(setPostLoading());
		const post = yield axios.get(`/api/posts/${action.payload}`);
		if (!post) throw new Error();
		yield put(successGetPost(post.data));
	} catch (err) {
		yield put(successGetPost(null));
	}
}

export function* deletePostSaga(action) {
	try {
		const post = axios.delete(`/api/posts/${action.payload}`);
		if (!post) throw new Error();
		yield put(successDeletePost(action.payload));
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* addLikeSaga(action) {
	try {
		const post = yield axios.post(`/api/posts/like/${action.payload}`);
		if (!post) throw new Error();
		yield put(getPosts());
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* removeLikeSaga(action) {
	try {
		const post = yield axios.post(`/api/posts/unlike/${action.payload}`);
		if (!post) throw new Error();
		yield put(getPosts());
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* addCommentSaga(action) {
	try {
		yield put(clearErrors());
		const comment = yield axios.post(
			`/api/posts/comment/${action.payload.postId}`,
			action.payload.commentData
		);
		if (!comment) throw new Error();
		yield put(successGetPost(comment.data));
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}

export function* deleteCommentSaga(action) {
	try {
		const comment = yield axios.delete(
			`/api/posts/comment/${action.payload.postId}/${action.payload.commentId}`
		);
		if (!comment) throw new Error();
		yield put(successGetPost(comment.data));
	} catch (err) {
		yield put(getErrors(err.response.data));
	}
}
