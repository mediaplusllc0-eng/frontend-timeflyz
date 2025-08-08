// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { api } from "@/utils/api2"; // your RTK Query API slice
import authReducer from "@/components/layout/auth/authSlice"; // your auth slice
import hotelsReducer from "@/components/page-components/home/Services/hotelsSlice";
import slotsReducer from "@/app/slots/Services/slotsSlice";
import hotelDetailsReducer from "@/app/hoteldetail/[hotelid]/services/hotelDetailsSlice";
import bookingReducer from "@/app/booking/services/bookingSlice";
import profileReducer from "@/app/profile/services/userSlice";
import favoritesReducer from "@/app/favorites/services/favoritesSlice";
import loaderReducer from "./loaderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [api.reducerPath], // do not persist API cache
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  loader: loaderReducer,
  auth: authReducer,
  hotels: hotelsReducer,
  slotsList: slotsReducer,
  hotelDetails: hotelDetailsReducer,
  booking: bookingReducer,
  profile: profileReducer,
  favorites: favoritesReducer,
  // add other slices here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
