import { LOAD_ACTIONS } from './actionTypes';

export const loadData = () => {
  return dispatch => {

    return fetch('https://s3-eu-west-1.amazonaws.com/yoco-testing/tests.json')
    .then(response => response.json()).then(json => {
      if(Array.isArray(json)) {
        dispatch(loadedData(json))
      } else {
        console.log('Error')
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}

export const loadedData = (data) => (
  { type: LOAD_ACTIONS.LOADED, data }
)
