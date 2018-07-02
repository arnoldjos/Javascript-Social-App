import {
  INITIAL_ADD_POST,
  ADD_POST,
  INITIAL_GET_POSTS,
  GET_POSTS,
  POST_LOADING
} from '../actions/actionTypes';

// Add Post
export const addPost = postData => {
  return {
    type: INITIAL_ADD_POST,
    payload: postData
  };
};

export const successAddPost = post => {
  return {
    type: ADD_POST,
    payload: post
  };
};

// Get Posts
export const getPosts = () => {
  return {
    type: INITIAL_GET_POSTS
  };
};

export const successGetPosts = posts => {
  return {
    type: GET_POSTS,
    payload: posts
  };
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
