import { combineReducers } from 'redux';

import authReducer from './auth_reducer';
import errorReducer from './error_reducer';
import profileReducer from './profile_reducer';
import postReducer from './post_reducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});
