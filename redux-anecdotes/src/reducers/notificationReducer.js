import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const startNotification = "";
const slice = createSlice({
  name: "notification",
  initialState: startNotification,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    deleteNotification() {
      return "";
    },
  },
});

export const timedNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, seconds * 1000);
  };
};

export const { setNotification, deleteNotification } = slice.actions;

export default slice.reducer;
