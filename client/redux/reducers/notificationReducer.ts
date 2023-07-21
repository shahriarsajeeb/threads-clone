import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  error: null,
  notifications: [],
};

export const notificationReducer = createReducer(initialState, {
  getNotificationRequest: state => {
    state.isLoading = true;
  },
  getNotificationSuccess: (state, action) => {
    state.isLoading = false;
    state.notifications = action.payload;
  },
  getNotificationFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: state => {
    state.error = null;
  },
});
