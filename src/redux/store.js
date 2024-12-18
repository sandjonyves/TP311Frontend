// # +====================================================================================+ #
// # |===============================     Powerk-soft     ================================| #
// # |==============================    e-commerce app     ===============================| #
// # |======================= Programmer: Sandjon Yves =======================| #
// # +====================================================================================+ #

// REDUX IMPORTS
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// REDUCERS
// import authReducer from "../redux/slices/authSlice";
import UserReducer from './slices/userSlice';
import schoolReducer from './slices/schoolSlice';
import classReducer from './slices/classSlice';
import studentReducer from './slices/studentSlice';
import prototypeReducer from './slices/prototyprSlice';
import cardReducer from './slices/CardSlice';

// import assignmentReducer  from '../redux/slices/assigmentSlice';
// PERSIST THE STORE
import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist'

const reducer = combineReducers({
  User : UserReducer,
  school:schoolReducer,
  class:classReducer,
  student: studentReducer,
  Prototype:prototypeReducer,
  card:cardReducer,
  // auth: authReducer,
  // assignment :assignmentReducer
 
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer)


export const store = configureStore({
  reducer: persistedReducer,
});