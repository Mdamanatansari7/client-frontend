import { configureStore } from "@reduxjs/toolkit";

import scheduleReducer from "../../features/scheduleSlice"
import registerReducer from "../../features/userRegisterSlice"
import userReducer from "../../features/ParticipantsSlice"
const store = configureStore({
  reducer: {
    schedule:scheduleReducer,  
    register: registerReducer,
    users:userReducer
  },
});

export default store;
