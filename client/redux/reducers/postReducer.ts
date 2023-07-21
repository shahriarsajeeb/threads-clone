import {createReducer} from '@reduxjs/toolkit';

const intialState = {
  posts:[],
  post:{},
  error: null,
  isSuccess:false,
  isLoading: true,
};

export const postReducer = createReducer(intialState, {
  postCreateRequest: state => {
    state.isLoading = true;
  },
  postCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.post = action.payload;
    state.isSuccess = true;
  },
  postCreateFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  getAllPostsRequest: state => {
    state.isLoading = true;
  },
  getAllPostsSuccess: (state,action) => {
   state.isLoading = false;
   state.posts = action.payload;
  },
  getAllPostsFailed: (state,action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: state => {
    state.error = null;
  },
});
