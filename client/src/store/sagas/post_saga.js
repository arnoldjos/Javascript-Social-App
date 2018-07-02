import axios from 'axios';
import { put } from 'redux-saga/effects';

import {
  successAddPost,
  getErrors,
  successGetPosts,
  setPostLoading
} from '../actions';

export function* addPostSaga(action) {
  try {
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
