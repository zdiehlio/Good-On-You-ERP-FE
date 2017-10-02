import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoginReducer from "./reducer_login"
import CreateBrandReducer from "./reducer_create_brand"
import SearchUsersReducer from "./reducer_search_users"
import SearchBrandsReducer from "./reducer_search_brands"

const rootReducer = combineReducers({
  login: LoginReducer,
  createBrand: CreateBrandReducer,
  searchUsers: SearchUsersReducer,
  searchBrands: SearchBrandsReducer,
  form: formReducer
});

export default rootReducer;
