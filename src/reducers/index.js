import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import LoginReducer from './reducer_login'
import CreateBrandReducer from './reducer_create_brand'
import SearchReducer from './reducer_search'
import QAReducer from './reducer_qa'
import PreQAReducer from './reducer_pre_qa'
import general from './reducer_general'
import contact from './reducer_contact'
import brandInfo from './reducer_brand_info'
import causes from './reducer_causes'
import summary from './reducer_summary'
import sentence from './reducer_sentence'
import image from './reducer_image'
import logo from './reducer_logo'
import categories from './reducer_categories'
import styles from './reducer_styles'
import types from './reducer_types'
import retailer from './reducer_retailer'
import alias from './reducer_alias'


const rootReducer = combineReducers({
  login: LoginReducer,
  createBrand: CreateBrandReducer,
  search: SearchReducer,
  qa: QAReducer,
  preQa: PreQAReducer,
  form: formReducer,
  general,
  contact,
  brandInfo,
  causes,
  summary,
  sentence,
  image,
  logo,
  categories,
  styles,
  types,
  retailer,
  alias,
})

export default rootReducer
