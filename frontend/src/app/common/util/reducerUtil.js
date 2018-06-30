export const createReducer = (initalState, fnMap) => {
  return (state = initalState, {
    type,
    payload
  }) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state
  }
}
