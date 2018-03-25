import { FETCH_SKU, UPDATE_SKU } from '../actions/sku'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_SKU:
    if (!action.error) {
      return action.payload.data
    }
    return {error: action.error}
  default:
    return state
  }
}
