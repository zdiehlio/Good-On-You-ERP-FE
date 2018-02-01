import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import { AUTH_USER, BRAND_INFO } from './actions'


import 'semantic-ui-css/semantic.min.css'

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = sessionStorage.getItem('jwt')
const name = sessionStorage.getItem('name')
const website = sessionStorage.getItem('website')

if(token) {
  console.log('index w token', store.getState())
  store.dispatch({type: AUTH_USER, payload: token})
}

setTimeout(() => {sessionStorage.clear()}, 1000 * 60 * 60)

if(name && website) {
  store.dispatch({type: BRAND_INFO, payload: {name, website}})
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
)
registerServiceWorker()
