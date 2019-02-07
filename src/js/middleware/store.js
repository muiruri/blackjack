export const storeMiddleWare = store => next => action => {
  //return next({ ...action, getState: store.getState })
  return next(Object.assign({}, action, { getState: store.getState }))
}
