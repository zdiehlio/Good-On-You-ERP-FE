import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducer from "./reducer_login"
import CreateBrandReducer from "./reducer_create_brand"

const rootReducer = combineReducers({
  login: LoginReducer,
  createBrand: CreateBrandReducer,
  form: formReducer
});

export default rootReducer;
