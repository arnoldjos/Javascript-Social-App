import { TEST_DISPATCH } from './actionTypes';

// Register User
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
