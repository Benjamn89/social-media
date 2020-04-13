const initialState = {
  signOut: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "signOut") {
    return {
      ...state,
      signOut: !state.signOut,
    };
  }
  return state;
};

export default reducer;
