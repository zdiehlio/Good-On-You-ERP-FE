import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import LoginReducer from './reducer_login'
import CreateBrandReducer from './reducer_create_brand'
import SearchReducer from './reducer_search'
import QAReducer from './reducer_qa'
import PreQAReducer from './reducer_pre_qa'
import UploadReducer from './reducer_upload'


const rootReducer = combineReducers({
  login: LoginReducer,
  createBrand: CreateBrandReducer,
  search: SearchReducer,
  qa: QAReducer,
  preQa: PreQAReducer,
  form: formReducer,
  upload: UploadReducer,
})

export default rootReducer
