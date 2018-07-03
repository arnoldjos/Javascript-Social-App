import {
	INITIAL_ADD_POST,
	ADD_POST,
	INITIAL_GET_POSTS,
	GET_POSTS,
	INITIAL_GET_POST,
	GET_POST,
	INITIAL_DELETE_POST,
	DELETE_POST,
	ADD_LIKE,
	REMOVE_LIKE,
	ADD_COMMENT,
	DELETE_COMMENT,
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

// Get Post
export const getPost = id => {
	return { type: INITIAL_GET_POST, payload: id };
};

export const successGetPost = post => {
	return { type: GET_POST, payload: post };
};

// Delete Post
export const deletePost = id => {
	return {
		type: INITIAL_DELETE_POST,
		payload: id
	};
};

export const successDeletePost = id => {
	return {
		type: DELETE_POST,
		payload: id
	};
};

// Add Like
export const addLike = id => {
	return {
		type: ADD_LIKE,
		payload: id
	};
};

// Remove Like
export const removeLike = id => {
	return {
		type: REMOVE_LIKE,
		payload: id
	};
};

// Add Comment
export const addComment = (postId, commentData) => {
	return { type: ADD_COMMENT, payload: { postId, commentData } };
};

// Delete Comment
export const deleteComment = (postId, commentId) => {
	return { type: DELETE_COMMENT, payload: { postId, commentId } };
};

// Set loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING
	};
};
